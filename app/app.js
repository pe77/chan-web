var app = angular.module('chan', 
	[
		'chan.controllers',
		'chan.services',
		'ui.router',
		"ui.bootstrap.tpls",
		'ui.bootstrap.carousel',
		'directive.g+signin',
		'ngSanitize',
		// 'ngAnimate',
		'mgcrea.ngStrap',
		'facebook',
		'angularAudioRecorder'
	]
);

app.config(['$httpProvider', 'FacebookProvider', 'recorderServiceProvider', function($httpProvider, FacebookProvider, recorderServiceProvider) {
	
	// $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	// https://github.com/Ciul/angular-facebook
	FacebookProvider.init(parameters.facebook_api_key);


	recorderServiceProvider
        .setSwfUrl('lib/angular-recorder/recorder.swf')
        .withMp3Conversion(false, {
        	lameJsUrl:'lib/angular-recorder/lame.min.js'
        })
      ;
}]);

angular.module('chan.controllers', []);