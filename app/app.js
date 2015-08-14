var app = angular.module('chan', 
	[
		'chan.controllers',
		'chan.services',
		'ui.router',
		"ui.bootstrap.tpls",
		'ui.bootstrap.carousel',
		'angular-carousel',
		'directive.g+signin',
		'ngSanitize',
		'ngAnimate',
		'mgcrea.ngStrap'
	]
);

app.config(['$httpProvider', function($httpProvider) {
	// $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

angular.module('chan.controllers', []);