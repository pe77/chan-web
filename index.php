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

<html class="ls-top-navbar show-sidebar sidebar-l1 sidebar-r1" lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>77chan</title>


  <link href="css/vendor/all.css" rel="stylesheet">
  <link href="css/app/app.css" rel="stylesheet">
  <!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->


<!-- Bibliotecas -->
	<script type="text/javascript" src="<?php echo $baseUrl?>/lib/vendor/angular/angular.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/lib/vendor/angular/angular-resource.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/lib/vendor/angular/angular-ui-router.js"></script>
	<script type="text/javascript" src="<?php echo $baseUrl?>/lib/vendor/angular/google-plus-signin.js"></script>
	
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
  	<script src="<?php echo $baseUrl?>/app/controllers/board.js?<?php echo $timestamp?>"></script>
	<script src="<?php echo $baseUrl?>/app/controllers/menu.js?<?php echo $timestamp?>"></script>


</head>

<body id="bbodyy" ng-app="chan" ng-controller="GlobalController">



  <!-- Fluid navbar -->
  <div class="navbar navbar-main navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <a href="#" data-toggle="sidebar-menu" class="toggle pull-left visible-xs">
          <i class="fa fa-bars"></i>
        </a>
        <a class="navbar-brand" href="index.html">77Chan</a>
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="navbar-collapse collapse" id="collapse">


        <ul class="nav navbar-nav">
          <li>
            <form class="navbar-form margin-none navbar-left">
              <div class="search-1">
                <div class="input-group">
                  <span class="input-group-addon"><i class="icon-search"></i></span>
                  <input type="text" class="form-control form-control-w-150" placeholder="Procurar ..">
                </div>
              </div>
            </form>
          </li>
        </ul>


        <ul class="nav navbar-nav navbar-right">

            <li class="dropdown notifications updates">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                        <i class="fa fa-bell-o"></i>
                        <span class="badge badge-primary">4</span>
                      </a>
                      
                      <ul class="dropdown-menu" role="notification">
                        <li class="dropdown-header">Notifications</li>
                        <li class="media">
                          <div class="pull-right">
                            <span class="label label-success">New</span>
                          </div>
                          <div class="media-left">
                            <img src="images/people/50/guy-2.jpg" alt="people" class="img-circle" width="30" style="width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto;">
                          </div>
                          <div class="media-body">
                            <a href="#">Adrian D.</a> posted <a href="#">a photo</a> on his timeline.
                            <br>
                            <span class="text-caption text-muted">5 mins ago</span>
                          </div>
                        </li>
                        <li class="media">
                          <div class="pull-right">
                            <span class="label label-success">New</span>
                          </div>
                          <div class="media-left">
                            <img src="images/people/50/guy-6.jpg" alt="people" class="img-circle" width="30" style="width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto;">
                          </div>
                          <div class="media-body">
                            <a href="#">Bill</a> posted <a href="#">a comment</a> on Adrian's recent <a href="#">post</a>.
                            <br>
                            <span class="text-caption text-muted">3 hrs ago</span>
                          </div>
                        </li>
                        <li class="media">
                          <div class="media-left">
                            <span class="icon-block s30 bg-grey-200"><i class="fa fa-plus"></i></span>
                          </div>
                          <div class="media-body">
                            <a href="#">Mary D.</a> and <a href="#">Michelle</a> are now friends.
                            <p>
                              <span class="text-caption text-muted">1 day ago</span>
                            </p>
                            <a href="">
                              <img class="width-30 img-circle" src="images/people/50/woman-6.jpg" alt="people" style="width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto;">
                            </a>
                            <a href="">
                              <img class="width-30 img-circle" src="images/people/50/woman-3.jpg" alt="people" style="width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto;">
                            </a>
                          </div>
                        </li>
                      </ul>
            </li>

            <li class="dropdown user" ng-if="user.name">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img ng-src="{{user.picture_link}}?sz=50" alt="" class="img-circle" style="width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto;"> {{user.first_name}}<span class="caret"></span>
              </a>
              <ul class="dropdown-menu" role="menu">
                <li><a href="#"><i class="fa fa-user"></i>Profile</a></li>
                <li><a href="#"><i class="fa fa-wrench"></i>Settings</a></li>
                <li><a href="#" ng-click="Logout()"><i class="fa fa-sign-out"></i>Logout</a></li>
              </ul>
            </li>

            
          </ul>
      </div>
    </div>
  </div>


  <!-- MENU LATERAL -->
  <div ng-controller="MenuController" class="sidebar left sidebar-size-1 sidebar-mini-reveal sidebar-offset-0 sidebar-skin-dark sidebar-visible-desktop sidebar-visible-mobile" id=sidebar-menu data-type=dropdown>
    <div data-scrollable>

      <ul class="sidebar-menu sm-icons-block sm-icons-right">
        <li class="active"><a href=""><i class="fa fa-home"></i> <span>Sample Menu</span></a></li>
        <li class="hasSubmenu">
          <a href="#submenu"><i class="fa fa-bar-chart-o"></i> <span>Submenu</span></a>
          <ul id="submenu">
            <li><a href=""><span>Sample Menu</span></a></li>
            <li><a href=""><span>Sample Menu</span></a></li>
          </ul>
        </li>
        <li><a href=""><i class="fa fa-star"></i> <span>Sample Menu</span></a></li>
        <li><a href=""><i class="fa fa-sliders"></i> <span>Sample Menu</span></a></li>
      </ul>
      <h4 class="category">Sample Heading</h4>
      <div class="sidebar-block">
        <p>To see all the various sidebar content elements, including submenu types</p>
        <p><a href="../sidebar/index.html" class="btn btn-default btn-block">see the Sidebar Kit</a></p>
        <p>Also, check out these awesome</p>
        <a href="../sidebar/transitions.html" class="btn btn-default btn-block">Sidebar Transitions</a>
      </div>
      <h4 class="category">Scrollable</h4>
      <div class="sidebar-block">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus facilis quia voluptates! Iure, quibusdam ratione sunt unde ut vero voluptatibus.</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>Bottom of scrollable content</p>
      </div>
    </div>
  </div>

  <div id="content">
    <div class="container-fluid">
		<div ui-view></div>
    </div>
  </div>

  <!-- Inline Script for colors and config objects; used by various external scripts; -->
  <script>
    var colors = {
      "danger-color": "#e74c3c",
      "success-color": "#81b53e",
      "warning-color": "#f0ad4e",
      "inverse-color": "#2c3e50",
      "info-color": "#2d7cb5",
      "default-color": "#6e7882",
      "default-light-color": "#cfd9db",
      "purple-color": "#9D8AC7",
      "mustard-color": "#d4d171",
      "lightred-color": "#e15258",
      "body-bg": "#f6f6f6"
    };
    var config = {
      theme: "layout",
      skins: {
        "default": {
          "primary-color": "#16ae9f"
        }
      }
    };
  </script>

  <script src="js/vendor/all.js"></script>
  <script src="js/app/app.js"></script>

</body>

</html>