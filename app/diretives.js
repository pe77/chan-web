
app.directive('dateui', function($timeout, dateFilter) {
	$.datepicker.setDefaults($.datepicker.regional['pt-BR']);

    var directiveDefinitionObject = {
    require : 'ngModel',
    restrict: 'A',
    link : function (scope, element, attrs, ngModelCtrl) {
        var valueInput = attrs.value;

        ngModelCtrl.$setViewValue(valueInput);

    	$(function(){
            $(element).datetimepicker({
				dateFormat: 'yy-mm-dd',
				stepMinute: 15,
				onClose:function(date)
				{
					ngModelCtrl.$setViewValue(date);
					scope.$apply();
				}
			});

        });
    }
  };
  return directiveDefinitionObject;
});

app.directive('datebr', function($timeout, dateFilter) {
    $.datepicker.setDefaults($.datepicker.regional['pt-BR']);

    var directiveDefinitionObject = {
    require : 'ngModel',
    restrict: 'A',
    link : function (scope, element, attrs, ngModelCtrl) {
        $(function(){
            $(element).datepicker({
                dateFormat: 'dd/mm/yy',
                stepMinute: 15,
                timeFormat: '',
                onClose:function(date)
                {
                    ngModelCtrl.$setViewValue(date);
                    scope.$apply();
                }
            });

        });
    }
  };
  return directiveDefinitionObject;
});


app.directive('multiselect', function($timeout, dateFilter) {
    var directiveDefinitionObject = {
    restrict: 'A',
    link : 
    {
    	post:function (scope, element) {
	    	$(function(){
	            element.multiselect();
    			
	            scope.$watch(function () {
	                return element[0].length;
	            }, function () {
	                element.multiselect('refresh');
	            });

	        });



	    }
    }
  };
  return directiveDefinitionObject;
});

// coloca o timestamp depois do src da imagem
app.directive('freecache', function($timeout, dateFilter) {
    var directiveDefinitionObject = {
    restrict: 'A',
    link : 
    {
      post:function (scope, element) {
        $(function(){
              scope.$watch(function () {
                  return element[0].length;
              }, function () {
                  // previne cache dos thumbs
                  var imgSource = element.attr('src');
                  var time = (new Date()).getTime();
                  element.attr('src', imgSource + '?c=' + time);
              });
          });
      }
    }
  };
  return directiveDefinitionObject;
});

// Modal
app.directive('modal', ['$rootScope', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).colorbox({
                inline:  true,
                width:   '75%',
                opacity: '0.65',
                onOpen:   function () {
                    // Altera o estado do botão
                    $rootScope.btnAdd       = !$rootScope.btnAdd;
                    $rootScope.btnCancelAdd = !$rootScope.btnCancelAdd;

                    scope.$apply();
                },
                onClosed: function () {
                    // Altera o estado do botão
                    $rootScope.btnAdd       = !$rootScope.btnAdd;
                    $rootScope.btnCancelAdd = !$rootScope.btnCancelAdd;

                    scope.$apply();
                }
            });
        }
    };
}]);


app.directive('repeatDone', function() {
  return function(scope, element, attrs) {
    if (scope.$last) { // all are rendered
      scope.$eval(attrs.repeatDone);
    }
  }
});

app.directive('mask', ['$interval', 'dateFilter', function($interval, dateFilter) {

    function link(scope, element, attrs, ngModel) {

      $(function(){
          $(element).mask(attrs.mask, {placeholder: attrs.mask});
      });
    }

    return {
      require:"ngModel",
      link: link
    };
}]);
