var app = angular.module('chan', 
	[
		'chan.controllers',
		'chan.services',
		'ui.router',
		'directive.g+signin'
	]
);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

angular.module('chan.controllers', []);