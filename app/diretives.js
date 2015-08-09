
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


app.directive('expandable', ['$timeout',function($timeout, $sce) {
  return {
    restrict: 'E',
    terminal : true,
    scope: {
      post: '=post'
    },
    link: function(scope, element)
    {
      $timeout(function () {
          // console.log($(element).find('.post-direct-content > div').height() + ' :: ' + scope.post.id);
          var h = $(element).find('.post-direct-content > div').height();
      
          if(h > 300)
          {
            $(element).find('.post-direct-content').addClass('expandable expandable-trigger');
            $(element).find('.post-direct-content > div').addClass('expandable-content expandable-content-large');
            $(element).find('.post-direct-content > div').append('<div class="expandable-indicator"><i></i></div>');
          }




      }, 10);

    },
    templateUrl: base_url + '/app/views/post/content.html'
  };
}]);


app.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});



app.directive('timeago', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {

            // foda-se a tradução, sem tempo pra essa merda agora
            moment.locale('en', {
                relativeTime : {
                    future: "em %s",
                    past:   "%s atras",
                    s:  "um segundo",
                    m:  "um minuto",
                    mm: "%d minutos",
                    h:  "uma hora",
                    hh: "%d horas",
                    d:  "um dia",
                    dd: "%d dias",
                    M:  "um mês",
                    MM: "%d mêses",
                    y:  "um ano",
                    yy: "%d anos"
                }
            });
            // */
            elem.html(moment(attrs.date*1000).from());
        }
   };
});

app.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});