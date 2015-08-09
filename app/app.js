var app = angular.module('chan', 
	[
		'chan.controllers',
		'chan.services',
		'ui.router',
		'ui.bootstrap',
		'directive.g+signin',
		'ngSanitize',
		'ngCkeditor'
	]
);

app.config(['$httpProvider', function($httpProvider) {
	// $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

angular.module('chan.controllers', []);