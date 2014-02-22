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
        index.initTipKeyboard();
    },
    
    initTipKeyboard : function(){
        $(window).on("keyup", index.skipTipScreen);
        commonFunc.dom.keyboardElements.on("mouseup", index.skipTipScreen);
    },
    
    skipTipScreen : function(){
        index.dom.tipCover.addClass("zoom-out");
        index.dom.tipAvatar.addClass("fade-out-2");
        index.dom.logo.addClass("logo-fade-in");
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
        index.dom.logo.removeClass("logo-fade-out").addClass("logo-fade-out");
        index.dom.tipCover.removeClass("zoom-out-to-0").addClass("zoom-out-to-0");
        index.dom.menuBgCanvas.removeClass("canvas-slide-in").addClass("canvas-slide-in");
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