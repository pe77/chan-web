var app = angular.module('chan', 
	[
		'genericService',
		'ui.router'
	]
);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);