var commonFunc = {
    
    dom : {
        mainContent : 0,
        screenIndex : 0
    },
    
    initCommonDoms : function(){
        commonFunc.dom.screenIndex = $('#index-wrap .screen-index');
    },
    
    initScreen : function(){
        commonFunc.dom.mainContent = $('#content');
        commonFunc.getKeyboardPos();
    },
    
    getKeyboardPos : function()
    {
      var boardH = commonFunc.dom.mainContent.height();
      var winH = $(window).height();
      commonFunc.dom.mainContent.css("margin-top", (winH-boardH)/2);
    },
};