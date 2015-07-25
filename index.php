<?php

	function url(){
	    if(isset($_SERVER['HTTPS'])){
	        $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
	    }
	    else{
	        $protocol = 'http';
	    }
	    return $protocol . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	}

	$baseUrl = url();
	$timestamp = time();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>77chan</title>

	<style type="text/css">
	  .nav, .pagination, .carousel, .panel-title a { cursor: pointer; }
	</style>

	<!-- Bibliotecas -->
	<script type="text/javascript" src="<?php echo $baseUrl?>/lib/vendor/angular/angular.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/lib/vendor/angular/angular-resource.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/lib/vendor/angular/angular-ui-router.js"></script>
	
	<script type="text/javascript">
    	var base_url = '<?php echo $baseUrl?>';
    </script>

    <!-- Aplicação -->
	<script type="text/javascript" src="<?php echo $baseUrl?>/app/config.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/app/app.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/app/routes.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/app/helpers.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/app/diretives.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/app/filters.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/app/services.js"></script>

	<!-- Controles -->
	<script src="<?php echo $baseUrl?>/app/controllers/global.js"></script>
	<script src="<?php echo $baseUrl?>/app/controllers/post.js?<?php echo $timestamp?>"></script>
</head>

<body ng-app="chan" ng-controller="SignInController">

	<!-- Define controller for body. In this example we use only one controller for the scope of entire body. --><!-- Place a span that is going to act as a container for button rendering through script code. -->
    <span ng-if="!signedIn" id="googleSignIn">
        <span id="signInButton">
        </span>
    </span>

    <!-- Don't forget to place the script that does the asynchronous loading of Google+ JavaScript API.
         Because it is loaded asynchronously, it might take some time to load. 
         Place some loading notification, so user won't get confused. 
         You can use ng-show and ng-hide to show or hide your notification and accomplish best user experience. --><script>// <![CDATA[
        (function() {
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/client:plusone.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
        })();
        // ]]></script>
        <!-- Second script needed for accessing Google API (gapi.*) . It's usage will be described in controller. -->
    <script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>

	-<div ui-view></div>-
</body>
</html>