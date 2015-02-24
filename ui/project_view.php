<html>
    <head>
        <base href="{{ @SCHEME.'://'.@HOST.@BASE.'/'.@UI }}" />
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/project.css" type="text/css" />
        <script src="js/project.js" type="text/javascript"></script>
    </head>
    <ul class="project-seg-wrap">
        <li class="project-list-wrap">
            <ul class="project-list">
                <repeat group="{{ @projects }}" value="{{ @project }}">
                <li class="project-wrap">
                    <div style="width: {{@project['width']}}px; height: {{@project['height']}}px;" class="project"
                         id="{{@project['prid']}}">
                        <p class="photo">
                            <img src="images/project/{{@project['photo']}}.png"/>
                        </p>
                        <p class="title">
                            <span class="caption">{{@project['caption']}}</span>
                            <br>
                            {{@project['title']}}
                        </p>
                        <p class="data">{{@project['data']}}</p>
                    </div>
                </li>
                </repeat>
                <li class="place-holder"></li>
            </ul>
        </li>
    </ul>
</html>