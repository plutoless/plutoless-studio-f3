var commonFunc = {
    
    dom : {
        mainContent : 0,
        screenIndex : 0
    },
    
    initCommonDoms : function(){
        commonFunc.dom.screenIndex = $('#index-wrap .screen-index');
        commonFunc.dom.keyboardElements = $('#index-wrap .key-board .key-element-content');
    },
    
    initScreen : function(){
        commonFunc.dom.mainContent = $('#content');
        commonFunc.getKeyboardPos();
    },
    
    getKeyboardPos : function(){
      var boardH = commonFunc.dom.mainContent.height();
      var winH = $(window).height();
      commonFunc.dom.mainContent.css("margin-top", (winH-boardH)/2);
    },
    commonKeyboardBindings : function(){
         commonFunc.dom.keyboardElements.hover(
            function()
            {
                $(this).addClass("hover");
            },
            function()
            {
                $(this).removeClass("hover");
            }

        ).css("cursor","pointer");
        
        commonFunc.dom.keyboardElements.mousedown(
            function()
            {
                $(this).addClass("selected");
            }
        );
        commonFunc.dom.keyboardElements.mouseup(
            function()
            {
                commonFunc.dom.keyboardElements.removeClass("selected");
            }
        );    
        
//        $(document).keydown(function(e){index.bindKeyboardActions(e,false);});
//        $(document).keyup(function(e){index.bindKeyboardActions(e,true)});
    }
};