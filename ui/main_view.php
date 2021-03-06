<!DOCTYPE html>
<html>
    <head>
        <base href="{{ @SCHEME.'://'.@HOST.@BASE.'/'.@UI }}" />
        <meta charset="UTF-8">
        <title>Plutoless Studio</title>
        <link rel="shortcut icon" href="images/favicon.ico">
        <link rel="stylesheet" href="css/index.css" type="text/css" />
        <link rel="stylesheet" href="css/common.css" type="text/css" />
        <link rel="stylesheet" href="css/jquery.jscrollpane.css" type="text/css" />
        <script src="js/jquery-1.11.0.min.js" type="text/javascript"></script>
        <script src="js/jquery.transit.min.js" type="text/javascript"></script>
        <script src="js/tram.min.js" type="text/javascript"></script>
        <script src="js/jquery.easing.1.3.js" type="text/javascript"></script>
        <script src="js/jquery.transit.min.js" type="text/javascript"></script>
        <script src="js/common.js" type="text/javascript"></script>
        <script src="js/index.js" type="text/javascript"></script>
        <script src="js/jquery.jscrollpane.min.js" type="text/javascript"></script>
    </head>
    <script>
        var title, initial, url, thumbnail, src;
        <repeat group="{{ @menus }}" value="{{ @menu }}">
            title = "{{@menu['title']}}";
            url = "{{@menu['addr']}}";
            thumbnail = "{{@menu['thumbnail']}}";
            src = "{{@menu['src']}}";
            initial = title.substring(0,1).toUpperCase();
            var menuItem = {title : title, url : url, thumbnail : thumbnail, src : src};
            if(!index.data.menus[initial]){
                index.data.menus[initial] = [];
            }
            index.data.menus[initial].push(menuItem);
        </repeat>
    </script>
    <body>
        <div id="content">
            <div id="index-wrap">

                <div class="screen">

                    <div class="screen-index">
                        <div class="screen-index-inner">
                        </div>
                        <div class="screen-index-tips transparent">
                            <div class="avatar-wrap">
                                <img src="images/tips/tips_{{@rand}}.jpg">
                                <div class="msg-box-wrap">
                                    <div class="msg-box rounded">
                                        <span class="text">test message</span>
                                    </div>
                                    <div class="msg-box-tri"></div>
                                </div>
                            </div>
                            <div style="margin-top:-10px;">
                                Press Any Key<br>
                                <ul class="news">
                                    <li class="news-area">
                                      <?php //echo $news[0];?>
                                    </li>
                                    <li class="news-buf">
                                      <?php //echo $news[1];?>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="screen-logo">
                            <img src="images/logo.png" />
                        </div>
                    </div>
                    <div class="screen-index-back">
                        <ul class="screen-back-widgets">

                            <li class="calendar-wrap">
                                <div class="time">
                                    {{@date['time']}}
                                </div>
                                <div class="weekday">
                                    {{@date['weekday']}}
                                </div>
                                <div class="month">
                                    {{@date['month']}}
                                </div>
                            </li>
                            <!-- Everything beyond this layer goes after -->
                            <li class="bg-wrap a">
                            </li>
                            <li class="battery-wrap">
                                <div class="battery">
                                    <div class="b-body">
                                        <div class="b-life"></div>
                                    </div>
                                    <div class="b-head">
                                    </div>
                                </div>
                            </li>
                            <li class="input-wrap">
                                <ul>
                                </ul>
                            </li>
                            <li class="subpage-wrap">

                            </li>
                        </ul>
                    </div>
                    <div class="screen-index-float">
                        <ul class="screen-front-widgets">
                            <li class="menu-wrap transparent">
                            </li>
                            <li class="subpage-wrap">

                            </li>
                        </ul>
                    </div>
                    <div class="screen-index-edge">
                    </div>
                </div>
                <div class="key-board">       
                    <ul>
                        <repeat group="{{ @keys }}" value="{{ @key }}">
                            <li id="key-{{@key['id']}}"
                                class="key-element-wrapper key-size-{{isset(@key['keysize'])?@key['keysize']:'normal'}}">
                                <div class="key-element">
                                    <div class="key-element-content {{isset(@key['keyclass'])?@key['keyclass']:''}}"
                                        name="{{@key['id']}}"
                                        data-keycode="{{@key['keycode']}}">
                                        {{isset(@key['alias'])?@key['alias']:@key['id']}}
                                    </div>
                                </div>
                            </li>
                        </repeat>
                    </ul>
                </div>
            </div>
        </div>
        <div id="key-hint-wrap">

        </div>

        <div id="dialogs-wrap">

        </div>
        
        <div id="bottom">Powered by fat free framework</div>
        <div id="bottom">© 2013 plutoless-studio</div>
    </body>
</html>
