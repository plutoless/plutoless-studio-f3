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
        menuWrapper : 0,
        contentWrapper : 0
    },
    
    data : {
        command : "",
        menus : {},
        loadLock : false,
        hints : {all : true}
    },
    
    init : function(){
        commonFunc.initjQuery();
        commonFunc.initScreen();
        commonFunc.initCommonDoms();
        commonFunc.commonKeyboardBindings();
        commonFunc.generateHints(index.data.hints);
        index.dom.tipCover = commonFunc.dom.screenIndex.find(".screen-index-inner");
        index.dom.tipAvatar = commonFunc.dom.screenIndex.find('.screen-index-tips');
        index.dom.logo = commonFunc.dom.screenIndex.find('.screen-logo');
        index.dom.menuBgCanvas = commonFunc.dom.screenCanvas.find(".bg-wrap");
        index.dom.textArea = commonFunc.dom.screenCanvas.find('.input-wrap ul');
        index.dom.menuWrapper = commonFunc.dom.screenContent.find('.menu-wrap');
        index.dom.contentWrapper = commonFunc.dom.screenCanvas.find('.subpage-wrap');
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
        tram(index.dom.tipCover).stop().add('scale 600ms ease-out-expo').start({scale: 1});
        // index.dom.tipCover.stop().transition({scale: 1}, 600, 'easeOutExpo');
        index.dom.tipAvatar.stop().transition({opacity: 0});
        index.dom.logo.stop().transition({opacity:1, top: '412px'}, 500);
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
                if(index.data.command.length===0)
                {
                    index.quitInputMode();
                }
            }
        }
        
        if(args.type === "enter"){
            if(index.data.command.length>0)
            {
                var initial = index.data.command.substring(0,1).toUpperCase();
                var menuItems = index.data.menus[initial];
                var command = index.data.command ? index.data.command : "";
                command = command.toUpperCase();
                for(var i = 0; i < menuItems.length && menuItems; i++){
                    var title = menuItems[i].title.toUpperCase();
                    if(command === title) {
                        if(command === "fightclub") {
                            index.navigatePage(menuItems[i].url);
                        } else {
                            index.navigatePage("../" + menuItems[i].url);
                        }
                    }
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
    
    navigatePage : function(link){
        if(index.data.loadLock)
            return;
        
        index.data.loadLock = true;
        commonFunc.deactivatePage();
        
        index.dom.menuWrapper.transition({opacity:0});
        index.dom.contentWrapper.transition({height: "265px"},function(){
            commonFunc.showLoading($(this));
            $.ajaxSetup({cache: false});
            $(this).load(link, function(){
                index.data.loadLock = false;
            });
        });
    },
    
    generateMenuItems : function(initial){
        var items = index.data.menus[initial];
        var resultHtml = "";
        
        if(!items){
            return '<div class="menu-message">No element for key '+initial+'</div>';
        }
        
        for(var i = 0; i < items.length; i++){
            resultHtml = resultHtml + '<div class="menu-element-wrap">'+
               '<div class="menu-element-pic"><img src="images/menu/'+items[i].thumbnail+'.png"/></div>'+
               '<div class="menu-element-text">'+items[i].title+'</div></div>';
        }
        return resultHtml;
    },
    
    enterInputMode : function(){
        index.dom.logo.stop().transition({opacity:0, top:'380px'}, 300, 'easeInBack');
        index.dom.tipCover.stop().transition({scale:0}, 400, 'easeInBack');
        tram(index.dom.menuBgCanvas).stop().add('top 600ms ease-in-out').start({top: 0});
        tram(index.dom.menuWrapper).stop().add('opacity 600ms ease-in-out').add('top 600ms ease-in-out').start({opacity: 1, top: "70px"});
    },
    
    quitInputMode : function(){
        tram(index.dom.logo).stop().add('opacity 300ms ease-in-out').add('top 300ms ease-in-out').start({opacity:1, top:'412px'});
        tram(index.dom.tipCover).stop().add('scale 400ms ease-in-out').start({scale: 1});
        tram(index.dom.menuBgCanvas).stop().add('top 600ms ease-in-out').start({top: '100%'});
        tram(index.dom.menuWrapper).stop().add('opacity 600ms ease-in-out').add('top 600ms ease-in-out').start({opacity: 0, top: "110px"});
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
    },

    clearNavStr : function()
    {
        index.data.command = "";
        index.dom.textArea.find('li.in-use').remove();
    },
};