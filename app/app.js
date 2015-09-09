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
		'facebook'
	]
);

app.config(['$httpProvider', 'FacebookProvider', function($httpProvider, FacebookProvider) {
	
	// $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	// https://github.com/Ciul/angular-facebook
	FacebookProvider.init(parameters.facebook_api_key);
}]);

angular.module('chan.controllers', []);