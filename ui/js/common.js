var commonFunc = {
    
    dom : {
        mainContent : 0,
        screenIndex : 0,
        screenCanvas : 0,
        screenContent : 0,
        downKey : 0,
        keyboardElements : 0
    },
    
    delegate : {
        keydownDelegate : null,
        keyupDelegate : null
    },
    
    initjQuery : function(){
        $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
            options.async = true;
        });
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
        commonFunc.clearHints();
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
                var that = $(this);
                if(!that.hasClass('disabled')) {
                    that.addClass("hover");
                }
            },function(){
                $(this).removeClass("hover");
            }
        );
        
        commonFunc.dom.keyboardElements.on("mousedown",function(e){
            var that = $(this);
            if(!that.hasClass('disabled')) {
                var thatKeycode = parseInt(that.data('keycode'));
                $(this).addClass("selected");
                if(!isNaN(thatKeycode))
                {
                    var key = commonFunc.getKeyByKeycode(thatKeycode);
                    key.event = e;
                    commonFunc.dom.downKey = key;
                    commonFunc.runKeydownActionDelegate(key);
                }
            }
        });
        commonFunc.dom.keyboardElements.on("mouseup",function(e){
            var that = $(this);
            commonFunc.dom.keyboardElements.removeClass("selected");
            //note the event passed here is down event.
            //replace event if operation needed for it
            if(!that.hasClass('disabled')) {
                commonFunc.runKeyupActionDelegate(commonFunc.dom.downKey);
            }
        });    
        
        $(document).on("keydown", function(e){
            var key = commonFunc.getKeyByKeycode(e.keyCode);
            var keyDom = key.domElement;
            if(keyDom && !keyDom.hasClass("disabled")) {
                keyDom.addClass("selected");

                key.event = e;
                commonFunc.dom.downKey = key;
                commonFunc.runKeydownActionDelegate(key);
            }
        });
        
        $(document).on("keyup", function(e){
            commonFunc.dom.keyboardElements.removeClass("selected");
            var key = commonFunc.dom.downKey;
            var keyDom = key.domElement;
            if(keyDom && !keyDom.hasClass("disabled")) {
                commonFunc.runKeyupActionDelegate(commonFunc.dom.downKey);
            }
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
        
        return {domElement: key, type: type, event:null, keycode: keycode};
    },

    clearHints:function(){
        $('#key-hint-wrap').html('');
        commonFunc.dom.keyboardElements.addClass("disabled");
    },

    generateHints:function(hints)
    {
        commonFunc.clearHints();
        if(hints.all) {
            commonFunc.dom.keyboardElements.removeClass("disabled");
        } else {
            $.each(hints, function(key, text){
                var key = $('#key-'+key);
                if(key){
                    var element = key.find('.key-element-content');
                    var keyLeft = key.offset().left;
                    var keyTop = key.offset().top;
                    var keyWidth = key.width();
                    if(element) {
                        element.removeClass("disabled");
                    }
                    $('<div>').addClass('key-hint').css('left',keyLeft)
                        .css('width',keyWidth).css('top', keyTop-6)
                        .html(text).appendTo($('#key-hint-wrap'));
                }
            });
        }
    },

    backToIndex : function()
    {
        
        commonFunc.deactivatePage();
        index.dom.contentWrapper.animate(
           {height: 0},
           {
               duration: 600,
               easing: "easeOutExpo",
               complete: function(){
                   $(this).html("");
               }
           }
        );
        index.clearNavStr();
        index.quitInputMode();
        commonFunc.generateHints(index.data.hints);
        index.indexKeyboardBindings();
    },
};