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
        textArea: 0,
        menuWrapper : 0
    },
    
    data : {
        command : "",
        menus : {}
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
        index.dom.menuWrapper = commonFunc.dom.screenContent.find('.menu-wrap');
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
        index.dom.tipCover.transition({scale: 1}, 600, 'easeOutExpo');
        index.dom.tipAvatar.stop().transition({opacity: 0});
        index.dom.logo.transition({opacity:1, top: '412px'}, 500);
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
            var name  = args.domElement.attr("name");
            if(index.data.command.length === 0){
                index.dom.menuWrapper.html($(index.generateMenuItems(name)));
                index.enterInputMode();
            }
            index.appendNavStr(name);
        }
        
        if(args.type==="backspace")
        {
            if(index.data.command.length>0)
            {
                index.removeNavStr();
                if(index.data.command.length==0)
                {
                    index.quitInputMode();
                }
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
    
    generateMenuItems : function(initial){
        var items = index.data.menus[initial];
        var resultHtml = "";
        
        if(!items){
            return '<div class="menu-message">No element for key '+initial+'</div>';
        }
        
        for(var i = 0; i < items.length; i++){
            resultHtml = resultHtml + '<div class="menu-element-wrap">'+
               '<div class="menu-element-pic"><img src="images/menu/'+items[i].title+'.png"/></div>'+
               '<div class="menu-element-text">'+items[i].title+'</div></div>';
        }
        return resultHtml;
    },
    
    enterInputMode : function(){
        index.dom.logo.stop().transition({opacity:0, top:'380px'}, 300, 'easeInBack');
        index.dom.tipCover.stop().transition({scale:0}, 400, 'easeInBack');
        index.dom.menuBgCanvas.stop().transition({top: 0},600);
        index.dom.menuWrapper.stop().transition({opacity: 1, top: "70px"}, 600);
    },
    
    quitInputMode : function(){
        index.dom.logo.stop().transition({opacity:1, top:'412px'});
        index.dom.tipCover.stop().transition({scale:1});
        index.dom.menuBgCanvas.stop().transition({top: '100%'}, 600);
        index.dom.menuWrapper.stop().transition({opacity: 0, top: "110px"}, 600);
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