var app = angular.module('chan', 
	[
		'chan.controllers',
		'chan.services',
		'ui.router',
		"ui.bootstrap.tpls",
		'ui.bootstrap.carousel',
		'directive.g+signin', // sign
		'ngSanitize',
		'localize',
		// 'ngAnimate',
		'mgcrea.ngStrap', 
		'facebook', // sign
		'angularAudioRecorder', // voice rec
		'angular-cache', // cache control
		'ngAudio' // audio player
	]
);

app.config(['$provide', '$httpProvider', 'FacebookProvider', 'recorderServiceProvider', 'CacheFactoryProvider', function($provide, $httpProvider, FacebookProvider, recorderServiceProvider, CacheFactoryProvider) {
	
	// $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	// https://github.com/Ciul/angular-facebook
	FacebookProvider.init(parameters.facebook_api_key);


	recorderServiceProvider
        .setSwfUrl('lib/angular-recorder/recorder.swf')
        .withMp3Conversion(false, {
        	lameJsUrl:'lib/angular-recorder/lame.min.js'
        })
      ;


    angular.extend(CacheFactoryProvider.defaults, { 
	    maxAge: parameters.cache_time, // tempo de cache default
	    deleteOnExpire: 'aggressive', 
	    storageMode: 'localStorage'
	}); 

}]);

angular.module('chan.controllers', []);