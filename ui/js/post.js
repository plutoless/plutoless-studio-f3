/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var post = {
    dom : {
        postContent : 0,
        posts : 0,
        postList : 0,
        currentPost : 0,
        currentPostSlider : 0
    },
    
    data : {
        api : new Array(),
        scrollBy : 1,
        hints : {
            W : 'Scroll Up',
            S : 'Scroll Down',
            A : 'Prev',
            D : 'Next',
            backspace : 'Home'
        }
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

        commonFunc.generateHints(post.data.hints);
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
                case 65:
                    post.prevPost(post.dom.currentPost);
                    break;
                case 68:
                    post.nextPost(post.dom.currentPost);
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
        post.data.scrollBy = 1;
    },

    prevPost : function(currentObject)
    {
        var animTime = 600;
        var object = currentObject.prev('.post');
        if(object.length)
        {
            var left = object.position().left;
            var scrollLeft = post.dom.postList.scrollLeft();
            /*
            object.css("opacity", 0);
            currentObject.stop(true,true).animate({opacity: 0},animTime);
            object.stop(true,true).animate({opacity: 1},animTime);*/
            post.dom.currentPost = object;
            var index = parseInt(object.attr('sindex'));
            post.dom.currentPostSlider = post.data.api[index];
            tram(post.dom.postList).stop(true,true).add('scale 600ms ease-in-out').start({scrollLeft : scrollLeft + left});
        }
    },

    nextPost : function(currentObject)
    {
        var animTime = 600;
        var object = currentObject.next('.post');
        if(object.length)
        {
            var left = object.position().left;
            var scrollLeft = post.dom.postList.scrollLeft();
            /*object.css("opacity", 0);
            currentObject.stop(true,true).animate({opacity: 0},animTime);
            object.stop(true,true).animate({opacity: 1},animTime);*/
            post.dom.currentPost = object;
            var index = parseInt(object.attr('sindex'));
            post.dom.currentPostSlider = post.data.api[index];
            tram(post.dom.postList).stop(true,true).add('scale 600ms ease-in-out').start({scrollLeft : scrollLeft + left});
        }
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


