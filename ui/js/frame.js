/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var frame = {
    dom : {
        frameContent : 0,


    },
    
    data : {
        hints : {
            O : 'Open New Tab',
            backspace : 'Home'
        },
        src : frameSrc
    },
    
    init : function(){
        delete frameSrc;
        commonFunc.generateHints(frame.data.hints);

        frame.keyboardBindings();
    },

    keyboardBindings : function(){
        commonFunc.delegate.keydownDelegate = frame.keydownHandler;
        commonFunc.delegate.keyupDelegate = frame.keyupHandler;
    },

    keydownHandler : function(args) {
        if(args.event){
            args.event.preventDefault();
        }

        if(args.type === "char"){
            switch(args.keycode){
                case 79:
                    frame.openNewTab(frame.data.src);
                    break;
                break;
            }
        }

        if(args.type === "backspace") {
            commonFunc.backToIndex();
        }
    },

    keyupHandler : function(args) {
        if(args.event){
            args.event.preventDefault();
        }
    },

    openNewTab : function(url){
        var win = window.open(url, '_blank');
        win.focus();
    }
};


$(function(){
    index.dom.contentWrapper.find(".frame-seg-wrap").load(function(){
        index.dom.contentWrapper.find(".iframe-loading").remove();
        frame.init();
    });
});


