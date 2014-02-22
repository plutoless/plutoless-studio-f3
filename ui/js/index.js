/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    index.init();
});


var index = {
    dom : {
        tipCover : 0,
        tipAvatar: 0
    },
    
    init : function(){
        commonFunc.initScreen();
        commonFunc.initCommonDoms();
        commonFunc.commonKeyboardBindings();
        index.dom.tipCover = commonFunc.dom.screenIndex.find(".screen-index-inner");
        index.dom.tipAvatar = commonFunc.dom.screenIndex.find('.screen-index-tips');
        index.dom.logo = commonFunc.dom.screenIndex.find('.screen-logo');
        index.initTipKeyboard();
    },
    
    initTipKeyboard : function(){
        $(window).on("keydown", index.skipTipScreen);
        commonFunc.dom.keyboardElements.on("mouseup", index.skipTipScreen);
    },
    
    skipTipScreen : function(){
        index.dom.tipCover.addClass("zoom-out");
        index.dom.tipAvatar.addClass("fade-out-2");
        index.dom.logo.addClass("logo-fade-in");
        $(window).off("keydown", index.skipTipScreen);
        commonFunc.dom.keyboardElements.off("mouseup", index.skipTipScreen);
        
    }
};