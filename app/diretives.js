
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


app.directive('postcontent', ['$timeout', '$createPopover', '$rootScope', '$http',function($timeout, $createPopover, $rootScope, $http) {
  return {
    restrict: 'E',
    terminal : true,
    scope: { 
      post: '=',
      searchPost: '&',
      onBackQuote: '&',
      quoteClick: '&'
    },
    link: {
      pre:function(scope, element, isolatedScope)
      {
        var tagRegex        = /(.?|^|\s)#([A-Za-z_]+)([A-Za-z_0-9]*)/mg;
        var linkRegex       = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:;%_\+.~#?&//=]*)?/gi;
        var commentRegex    = /(^|\s)\/\/.+/img;
        var greenTextRegex  = /(^|\s)&gt;.+/img;

        // modulos
        var crRegex  = /(^|\s)#cr.+\?$/img;


        // paradinha de recolher textos grandes
        $timeout(function () {
            var h = $(element).find('.post-direct-content > div').height();
        
            if(h > 300)
            {
              $(element).find('.post-direct-content').addClass('expandable expandable-trigger');
              $(element).find('.post-direct-content > div').addClass('expandable-content expandable-content-large');
              $(element).find('.post-direct-content > div').append('<div class="expandable-indicator"><i></i></div>');
            }
        }, 10); // so idh  -9as8 as98d

        // add os backquotes
        scope.$watch('post', function(post){


          // cr
          if(post.content && parameters.modules.cr.active)
          {
            var matches = post.content.match(crRegex);
            if(matches)
            {
              
              for (var i = matches.length - 1; i >= 0; i--) 
              {

                var m       = matches[i];
                
                var content = 
                  post.content.replace(
                    new RegExp(escapeRegExp(m),"g"), 
                    '<span class="post-m-cr">' + m + '</span>'
                  );
                
                post.content = content;
              }
            }
          }


          // g text
          if(post.content)
          {
            var matches = post.content.match(greenTextRegex);
            if(matches)
            {
              
              for (var i = matches.length - 1; i >= 0; i--) 
              {

                var m       = matches[i];
                
                var content = 
                  post.content.replace(
                    new RegExp(escapeRegExp(m),"g"), 
                    '<span class="post-g-text">' + m + '</span>'
                  );
                
                post.content = content;
              }
            }
          }



          // comentarios
          if(post.content)
          {
            var matches = post.content.match(commentRegex);
            if(matches)
            {
              
              for (var i = matches.length - 1; i >= 0; i--) 
              {
                var m       = matches[i];

                var content = 
                  post.content.replace(
                    new RegExp(escapeRegExp(m),"g"), 
                    '<span class="post-comment">' + m + '</span>'
                  );
                
                  post.content = content;
              }
            }
          }


          // links
          if(post.content)
          {
            var matches = post.content.match(linkRegex);
            if(matches)
            {
              for (var i = matches.length - 1; i >= 0; i--) 
              {
                var link    = matches[i];
                var content = 
                  post.content.replace(
                    new RegExp(escapeRegExp(link),"g"), 
                    '<a href="' + link + '" target="_blank" class="post-link"><i class="fa fa-fw fa-link"></i>' + link + '</a>'
                  );

                  post.content = content;
              }
            }
          }

          if(post.content && post.content.indexOf('#') > -1)
          {


            // quotes
            var matches = post.content.match(/(.?|^|\s)#(\d+)/mg);
            if(matches)
            {
              for (var i = matches.length - 1; i >= 0; i--) 
              {
                var postId = matches[i].replace(/#/g, "");
                postId = matches[i].replace(/\D/g,'');

                var content = 
                  post.content.replace(
                    new RegExp('#'+postId,"g"), 
                    '<span class="post-content-quote quote-post-' + postId + '" data-id="' + postId + '"><i class="fa fa-fw fa-slack"></i>' + postId + '</span>'
                  );

                  scope.onBackQuote({from:post.id, to:postId});
                
                  post.content = content;

              };
            }

            // tags
            var matches = post.content.match(tagRegex);
            if(matches)
            {
              for (var i = matches.length - 1; i >= 0; i--) 
              {
                var tag = matches[i].replace(/#/g, "");
                tag     = tag.replace(/[^\w_]/gi, ''); // remove tudo que não for alphanumerico e underline

                var content = 
                  post.content.replace(
                    new RegExp('#'+tag,"g"), 
                    '<span class="post-content-tag"><i class="fa fa-fw fa-slack"></i>' + tag + '</span>'
                  );
                
                  post.content = content;

              };

            }

          }
        });

        $timeout(function () {

          // popver dos quotes dentro do post
          $('.post-content-quote').each(function(){

              /*
              if($(this).data('hasquote')) // bugfix | multiplos popovers
                return
              // 
              */



              // remove os não numericos e extrai o ID
              var postId = $(this).html().replace(/\D/g, "");

              var elem = angular.element(this);
              var postQuote = scope.searchPost({id:postId});

              if(postQuote)
                $createPopover.create(postQuote, elem, false, 'right');
              //

              $(this).data('hasquote', true);
          });


          // vai buscar a resposta do cenouro
          if(parameters.modules.cr.active)
          {
            $('.post-m-cr').each(function(){

              if($(this).data('send-cr')) // só pra garantir que não vai chamar varias vezes
                return
              // 

              var elem      = angular.element(this);
              var question  = $(this).text();
              var url_cr    = parameters.modules.cr.url + $rootScope.lang.toLowerCase() + '/get/seed/' + question;

              
              $http({
                method: 'GET',
                cache:true,
                url: url_cr
              }).then(function successCallback(httpResponse) {
                
                if(httpResponse.status == 200)
                {

                  var responseJson = httpResponse.data;
                  if(responseJson.status == 1)
                  {
                    var template = $('<div class="module-cr"></div>');
                    template.append($('<img class="module-cr-image" src="' + responseJson.data.image + '"/>'));
                    template.append($('<span class="module-cr-response">' + responseJson.data.message + '</span>'));

                    elem.append(template);
                  }
                }
              }, function errorCallback(response) {
                // blablabla foda-se
              });

              


              $(this).data('send-cr', true);
            });
          }
          

          // quando clica no quote
          $('.post-content-quote').unbind().click(function(){

              var postId = $(this).html().replace(/\D/g, "");

              scope.quoteClick({id:postId});
          });

          // popver dos quotes dentro do post
          $('.post-content-tag').unbind().click(function(){


              // remove os não numericos e extrai o ID
              var tag = $(this).text();
              
              $rootScope.$emit('onSearchTag', tag, true); // true == dispara procura
          });


        }, 100); // so idh  -21d6q daq66fj


      }
    },
    templateUrl: base_url + '/app/views/post/content.html'
  };
}]);



app.directive('quotepreview', ['$createPopover',function($createPopover) {
  
  return {
    restrict: 'A',
    scope: {
      searchPost: '&',
      quote:'='
    },
    link: function(scope, elem, attrs){

      // procura os posts quotados
      var post = scope.searchPost({id:scope.quote});
      
      // se o post existir, cria o popover
      if(post)
        $createPopover.create(post, elem, false, 'left')
      // 
    }
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