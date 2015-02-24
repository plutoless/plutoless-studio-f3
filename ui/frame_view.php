<html>
    <head>
        <base href="{{ @SCHEME.'://'.@HOST.@BASE.'/'.@UI }}" />
        <meta charset="UTF-8">
        <link rel="stylesheet" href="css/frame.css" type="text/css" />
        <script src="js/frame.js" type="text/javascript"></script>
    </head>
    <script>
        frameSrc = "http://" + "{{str_replace("-", "/", @src)}}";
    </script>
	<iframe frameborder=”no” border=”0″ class="frame-seg-wrap" src="http://{{str_replace("-", "/", @src)}}">
        
    </iframe>
    <div class="loading iframe-loading"></div>
</html>