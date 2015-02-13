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
    </head>
    <body>
        <ul class="post-seg-wrap">
            <li class="post-list-wrap">
                    <ul class="post-list">
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