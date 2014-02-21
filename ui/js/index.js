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
        index.dom.tipCover = commonFunc.dom.screenIndex.find(".screen-index-inner");
        index.dom.tipAvatar = commonFunc.dom.screenIndex.find('.screen-index-tips');
        index.initTipKeyboard();
    },
    
    initTipKeyboard : function(){
        $(window).on("keydown", index.skipTipScreen);
    },
    
    skipTipScreen : function(){
        index.dom.tipCover.addClass("zoom-out");
        index.dom.tipAvatar.addClass("fade-out");
    }
};