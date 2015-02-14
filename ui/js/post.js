/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var post = {
    dom : {
        postContent : 0,
        posts : 0,
        postList : 0
    },
    
    data : {
        api : new Array(),
        scrollBy : 1
    },
    
    init : function(){
        post.dom.postContent = index.dom.contentWrapper.find(".post-seg-wrap");
        post.dom.postList = post.dom.postContent.find('.post-list-wrap');
        post.dom.posts = post.dom.postList.find('.post');
        for(var i=0; i<post.dom.posts.length; i++)
        {
            
            post.dom.posts.eq(i).attr('sindex', i);
            var element = post.dom.posts.eq(i)
                .jScrollPane({animateScroll: true});
            post.data.api[i] = element.data('jsp');
        }
        post.dom.currentPost = post.dom.posts.filter(':first');
        post.dom.currentPostSlider = post.data.api[0];

        post.dom.postContent.stop().transition({opacity: 1}, 400, "in-out");
        post.postKeyboardBindings();
        // debugger;
    },

    postKeyboardBindings : function(){
        commonFunc.delegate.keydownDelegate = post.keydownHandler;
        commonFunc.delegate.keyupDelegate = post.keyupHandler;
    },

    keydownHandler : function(args) {
        if(args.event){
            args.event.preventDefault();
        }

        if(args.type === "char"){
            switch(args.keycode){
                case 87:
                    post.scrollPostUp(post.dom.currentPostSlider);
                    post.data.scrollBy++;
                    break;
                case 83:
                    post.scrollPostDown(post.dom.currentPostSlider);
                    post.data.scrollBy++;
                break;
            }
        }
    },

    keyupHandler : function(args) {
        if(args.event){
            args.event.preventDefault();
        }
        post.data.scrollBy = 1;
    },

    scrollPostDown : function(currentAPI)
    {
        if(currentAPI!=null)
        {
            currentAPI.scrollByY(50*post.data.scrollBy);
        }
    },
    
    scrollPostUp : function(currentAPI)
    {
        if(currentAPI!=null)
        {
            currentAPI.scrollByY(-50*post.data.scrollBy);
        }
    }

};


$(function(){
    post.init();
});


