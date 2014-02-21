<!DOCTYPE html>

<html>
    <head>
        <base href="<?php echo $SCHEME.'://'.$HOST.$BASE.'/'.$UI; ?>" />
        <meta charset="UTF-8">
        <title>Test</title>
        <link rel="stylesheet" href="css/index.css" type="text/css" />
    </head>
    <body>
        <div id="content">
            <div id="index-wrap">

                <div class="screen">

                    <div class="screen-index">
                        <div class="screen-index-inner">
                        </div>
                        <div class="screen-index-tips">
                            <div class="avatar-wrap">
                                <img src="<?php /*echo $this->baseUrl()
                                        .'/public/images/tips/tips_'
                                        .$this->rand.'.jpg';*/ ?>">
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

                                    </li>
                                    <li class="news-buf">

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="screen-logo">
                            <img src="<?php //echo $this->baseUrl().'/public/images/logo.png'; ?>" />
                        </div>
                    </div>
                    <div class="screen-index-back">
                        <ul class="screen-back-widgets">

                            <li class="calendar-wrap">
                                <div class="time">

                                </div>
                                <div class="weekday">

                                </div>
                                <div class="month">

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
                            <li class="menu-wrap">
                            </li>
                            <li class="subpage-wrap">

                            </li>
                        </ul>
                    </div>
                </div>
                <div class="key-board">       
                    <ul>
                        <?php foreach (($keys?:array()) as $key): ?>
                            <li id="key-<?php echo $key['id']; ?>"
                                class="key-element-wrapper key-size-<?php echo isset($key['keysize'])?$key['keysize']:'normal'; ?>">
                                <div class="key-element">
                                    <div class="key-element-content <?php echo isset($key['keyclass'])?$key['keyclass']:''; ?>"
                                        name="<?php echo $key['id']; ?>"
                                        data-keycode="<?php echo $key['keycode']; ?>">
                                        <?php echo isset($key['alias'])?$key['alias']:$key['id']; ?>
                                    </div>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </div>
        <div id="key-hint-wrap">

        </div>

        <div id="dialogs-wrap">

        </div>
        
    </body>
</html>
