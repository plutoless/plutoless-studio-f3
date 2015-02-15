<!--<div class="menu-column">
    <div class="menu-block">
        <ul>
            <?php foreach($this->postTypes as $type): ?>
            <li>
                <?php echo $type->ptype; ?>
            </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>-->
<html>
    <head>
        <base href="{{ @SCHEME.'://'.@HOST.@BASE.'/'.@UI }}" />
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/post.css" type="text/css" />
        <script src="js/post.js" type="text/javascript"></script>
    </head>
    <body>
        <ul class="post-seg-wrap">
            <li class="post-list-wrap">
                    <ul class="post-list">
                        <repeat group="{{ @posts }}" value="{{ @post }}">
                            <li class="post">
                                <div class="cover">
                                    <img src="images/post/2-24-03-2013.png">
                                    <br>
                                </div>
                                <div class="post-left">
                                    <div class="place-holder"></div>
                                    <span class="type">{{@post['type']}}</span>
                                </div>
                                <div class="post-right">
                                    <div class="titleBar">
                                        <div class="title inline">
                                            {{@post['title']}}
                                        </div>
                                    </div>
                                    <div class="content">
                                        <span>{{date("M d, Y", strtotime(@$post['ts']))." at ".date("h:i", strtotime(@$post['ts']))}}</span><br><br>
                                        {{nl2br(@post['content'])}}
                            </div>
                                </div>
                            </li>
                        </repeat>
                    </ul>
            </li>
        </ul>
    </body>

<!--
<div class="menu-column">
    <div class="menu-block">
    <div class="return menu-content">
    </div>
    </div>
    <div class="menu-block">
    <div class="refresh menu-content">
    </div>
    </div>
</div>-->