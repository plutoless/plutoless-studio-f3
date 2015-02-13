var commonFunc = {
    
    dom : {
        mainContent : 0,
        screenIndex : 0,
        screenCanvas : 0,
        screenContent : 0,
        downKey : 0
    },
    
    delegate : {
        keydownDelegate : null,
        keyupDelegate : null
    },
    
    initCommonDoms : function(){
        commonFunc.dom.screenIndex = $('#index-wrap .screen-index');
        commonFunc.dom.screenCanvas = $('#index-wrap .screen-index-back');
        commonFunc.dom.screenContent = $('#index-wrap .screen-index-float');
        commonFunc.dom.keyboardElements = $('#index-wrap .key-board .key-element-content');
    },
    
    initScreen : function(){
        commonFunc.dom.mainContent = $('#content');
        commonFunc.getKeyboardPos();
    },
    
    deactivatePage : function(){
        commonFunc.delegate.keydownDelegate = null;
        commonFunc.delegate.keyupDelegate = null;
    },
    
    showLoading: function(area)
    {
        var h = area.height();
        var w = area.width();
        var loadingHtml = $('<div>').css('width', w).css('height',h).addClass('loading');
        area.html(loadingHtml);
    },
    
    getKeyboardPos : function(){
        var boardH = commonFunc.dom.mainContent.height();
        var winH = $(window).height();
        commonFunc.dom.mainContent.css("margin-top", (winH-boardH)/2);
    },
    commonKeyboardBindings : function(){
         commonFunc.dom.keyboardElements.hover(function(){
                $(this).addClass("hover");
            },function(){
                $(this).removeClass("hover");
            }
        ).css("cursor","pointer");
        
        commonFunc.dom.keyboardElements.on("mousedown",function(e){
            var that = $(this);
            var thatKeycode = parseInt(that.data('keycode'));
            $(this).addClass("selected");
            if(!isNaN(thatKeycode))
            {
                var key = commonFunc.getKeyByKeycode(thatKeycode);
                key.event = e;
                commonFunc.dom.downKey = key;
                commonFunc.runKeydownActionDelegate(key);
            }
        });
        commonFunc.dom.keyboardElements.on("mouseup",function(e){
            commonFunc.dom.keyboardElements.removeClass("selected");
            //note the event passed here is down event.
            //replace event if operation needed for it
            commonFunc.runKeyupActionDelegate(commonFunc.dom.downKey);
        });    
        
        $(document).on("keydown", function(e){
            var key = commonFunc.getKeyByKeycode(e.keyCode);
            var keyDom = key.domElement;
            keyDom.addClass("selected");
            key.event = e;
            commonFunc.dom.downKey = key;
            commonFunc.runKeydownActionDelegate(key);
        });
        
        $(document).on("keyup", function(e){
            commonFunc.dom.keyboardElements.removeClass("selected");
            commonFunc.runKeyupActionDelegate(commonFunc.dom.downKey);
        });
    },
    
    runKeydownActionDelegate : function(args){
        if(commonFunc.delegate.keydownDelegate){
            commonFunc.delegate.keydownDelegate(args);
        }
    },
    
    runKeyupActionDelegate : function(args){
        if(commonFunc.delegate.keyupDelegate){
            commonFunc.delegate.keyupDelegate(args);
        }
    },
    
    getKeyByKeycode : function(keycode){
        var key = 0, type="";
        if(keycode >=65 && keycode <=90)
        {
          /* IT'S CHAR CODE */
          var c = String.fromCharCode(keycode).toUpperCase();
          key = $('#key-'+c+' .key-element-content');
          type = "char";
        }
        
        if(keycode === 8)
        {
          /* BACKSPACE */
          key = $('#key-backspace .key-element-content');
          type = "backspace";
        }
        
        if(keycode === 13)
        {
          /* ENTER */
          key = $('#key-enter .key-element-content');
          type = "enter";
        }
        
        return {domElement: key, type: type, event:null};
    }
};