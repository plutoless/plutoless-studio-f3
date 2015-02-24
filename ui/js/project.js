var project = {

    dom : {
        contentWrap : 0,
        contentBody : 0,
        projectList : 0,
        projects : 0,
        currentProject : 0
    },
    
    data :{
        hints : {
            A : "Prev",
            D : "Next",
            backspace : "Home"
        }
    },
    
    init : function()
    {
        project.dom.contentWrap = index.dom.contentWrapper;
        project.dom.contentBody = 
            project.dom.contentWrap.find('.project-seg-wrap');
        project.dom.projectList = 
            project.dom.contentBody.find('.project-list');
        project.dom.projects = project.dom.projectList.find('.project-wrap');
        var screenWidth = project.dom.contentWrap.width();
        var screenHeight = project.dom.contentWrap.height();
        var projectWidth, projectHeight;
        for(var i=0; i<project.dom.projects.length; i++)
        {
            var projectElement = project.dom.projects.eq(i).find('.project');
            projectWidth = projectElement.width();
            projectHeight = projectElement.height();
            projectElement.css('left', (screenWidth-projectWidth)/2);
            projectElement.css('top', (screenHeight-projectHeight)/2);
        }
        
        project.dom.currentProject = project.dom.projects.filter(':first');
        project.dom.currentProject.find('.project').addClass('selected');
        
        project.dom.contentBody.animate({'opacity': 1});

        project.keyboardBindings();
        commonFunc.generateHints(project.data.hints);
    },

    keyboardBindings : function(){
        commonFunc.delegate.keydownDelegate = project.keydownHandler;
        commonFunc.delegate.keyupDelegate = project.keyupHandler;
    },

    keydownHandler : function(args) {
        if(args.event){
            args.event.preventDefault();
        }

        if(args.type === "char"){
            switch(args.keycode){
                case 65:
                    project.prevProject(project.dom.currentProject);
                    break;
                case 68:
                    project.nextProject(project.dom.currentProject);
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

    nextProject : function(currentObject)
    {
        var animTime = 600;
        var object = currentObject.next('.project-wrap');
        if(object.length)
        {
            var left = object.position().left;
            var scrollLeft = project.dom.projectList.scrollLeft();
            /*object.css("opacity", 0);
            currentObject.stop(true,true).animate({opacity: 0},animTime);
            object.stop(true,true).animate({opacity: 1},animTime);*/
            
            project.dom.currentProject.find('.project').removeClass('selected');
            project.dom.currentProject = object;
            project.dom.projectList.stop().animate(
                {"scrollLeft": scrollLeft+left},
                {
                    duration: animTime,
                    complete: function()
                    {
                        project.dom.currentProject.find('.project').addClass('selected');
                    }
                }
            );
        }
    },
    
    prevProject : function(currentObject)
    {
        var animTime = 600;
        var object = currentObject.prev('.project-wrap');
        if(object.length)
        {
            var left = object.position().left;
            var scrollLeft = project.dom.projectList.scrollLeft();
            /*object.css("opacity", 0);
            currentObject.stop(true,true).animate({opacity: 0},animTime);
            object.stop(true,true).animate({opacity: 1},animTime);*/
            project.dom.currentProject.find('.project').removeClass('selected');
            project.dom.currentProject = object;
            project.dom.projectList.stop().animate(
                {"scrollLeft": scrollLeft+left},
                {
                    duration: animTime,
                    complete: function()
                    {
                        project.dom.currentProject.find('.project').addClass('selected');
                    }
                }
            );
        }
    }
}

$(function(){
    project.init();
});