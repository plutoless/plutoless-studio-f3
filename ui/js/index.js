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
        tipAvatar: 0,
        menuBgCanvas : 0,
        logo: 0,
        textArea: 0
    },
    
    data : {
        command : ""
    },
    
    init : function(){
        commonFunc.initScreen();
        commonFunc.initCommonDoms();
        commonFunc.commonKeyboardBindings();
        index.dom.tipCover = commonFunc.dom.screenIndex.find(".screen-index-inner");
        index.dom.tipAvatar = commonFunc.dom.screenIndex.find('.screen-index-tips');
        index.dom.logo = commonFunc.dom.screenIndex.find('.screen-logo');
        index.dom.menuBgCanvas = commonFunc.dom.screenCanvas.find(".bg-wrap");
        index.dom.textArea = commonFunc.dom.screenCanvas.find('.input-wrap ul');
        index.initTipScreen();
        index.initTipKeyboard();
    },
    
    initTipScreen : function(){
        index.dom.tipAvatar.transition({opacity:1}, 1000, 'ease-in');
    },
    
    initTipKeyboard : function(){
        $(window).on("keyup", index.skipTipScreen);
        commonFunc.dom.keyboardElements.on("mouseup", index.skipTipScreen);
    },
    
    skipTipScreen : function(){
        index.dom.tipCover.transition({scale:1}, 600, 'cubic-bezier(0.190, 1.000, 0.220, 1.000)');
        index.dom.tipAvatar.stop().transition({opacity:0}, 400, 'ease-out');
        index.dom.logo.transition({opacity:1, top:'412px'},800, 'cubic-bezier(0.190, 1.000, 0.220, 1.000)');
        $(window).off("keyup", index.skipTipScreen);
        commonFunc.dom.keyboardElements.off("mouseup", index.skipTipScreen);
        index.indexKeyboardBindings();
    },
    
    indexKeyboardBindings : function(){
        commonFunc.delegate.keydownDelegate = index.indexKeydownHandler;
        commonFunc.delegate.keyupDelegate = index.indexKeyupHandler;
    },
    
    indexKeydownHandler : function(args){
        if(args.event){
            args.event.preventDefault();
        }
        if(args.type === "char"){
            if(index.data.command.length === 0){
                index.enterInputMode();
            }
            var name  = args.domElement.attr("name");
            index.appendNavStr(name);
        }
        
        if(args.type==="backspace")
        {
            if(index.data.command.length>0)
            {
                index.removeNavStr();
//                if(index.data.navStr.length==0)
//                {
//                    index.MenuOutIndexIn();
//                }
            }
        }
    },
    
    indexKeyupHandler : function(args){
        if(args.type==="char")
        {
            index.dom.textArea.find('li').
                animate({'vertical-align':0},{duration:800,easing:"easeOutBounce"});
        }
    },
    
    enterInputMode : function(){
        index.dom.logo.stop().transition({opacity:0, top:'380px'},300, 'cubic-bezier(0.600, 0, 0.735, 0.045)');
        index.dom.tipCover.stop().transition({scale:0}, 600, 'cubic-bezier(0.950, 0.050, 0.795, 0.035)');
        index.dom.menuBgCanvas.stop().transition({top:0}, 800, 'cubic-bezier(0.190, 1.000, 0.220, 1.000)');
    },
    
    appendNavStr : function(name){
        if(name){
            var c = name.toLowerCase();
            if(index.data.command.length <=15)
            {
                index.data.command = index.data.command + c;
                $('<li>').html(c).css('vertical-align',15).addClass('in-use').
                    appendTo(index.dom.textArea);
            }
        }
    },
    
    removeNavStr : function()
    {
        if(index.data.command.length > 0)
            index.data.command = index.data.command.substring(0, index.data.command.length-1);
        var toDelete = index.dom.textArea.find('li.in-use').last();
        toDelete.remove();
    }
};