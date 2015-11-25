angular.module('chan.services', ['ngResource'])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, value) {
      value = value || '{}';
      return JSON.parse($window.localStorage[key] || value);
    },
    del: function(key) {
      localStorage.removeItem(key);
    }
  }
}])

.factory('ResourceFactory', ['$q', '$resource',
    function($q, $resource) {

        function abortablePromiseWrap(promise, deferred, outstanding) {
            promise.then(function() {
                deferred.resolve.apply(deferred, arguments);
            });

            promise.catch(function() {
                deferred.reject.apply(deferred, arguments);
            });

            /**
             * Remove from the outstanding array
             * on abort when deferred is rejected
             * and/or promise is resolved/rejected.
             */
            deferred.promise.finally(function() {
                array.remove(outstanding, deferred);
            });
            outstanding.push(deferred);
        }

        function createResource(url, options, actions) {
            var resource;
            var outstanding = [];
            actions = actions || {};

            Object.keys(actions).forEach(function(action) {
                var canceller = $q.defer();
                actions[action].timeout = canceller.promise;
                actions[action].Canceller = canceller;
            });

            resource = $resource(url, options, actions);

            Object.keys(actions).forEach(function(action) {
                var method = resource[action];

                resource[action] = function() {
                    var deferred = $q.defer(),


                    promise = method.apply(null, arguments).$promise;

                    abortablePromiseWrap(promise, deferred, outstanding);


                    var data = {
                        $promise: deferred.promise,

                        url:url,
                        deferred:deferred,
                        promise:promise,
                        actions:actions,
                        action:action,
                        options:options,
                        resource:resource,
                        outstanding:outstanding,
                        method:method,
                        arguments:arguments,
                        

                        abort: function() {
                            deferred.reject('Aborted');
                        },
                        cancel: function() {
                            actions[action].Canceller.resolve('Call cancelled');

                            // Recreate canceler so that request can be executed again
                            var canceller = $q.defer();
                            actions[action].timeout = canceller.promise;
                            actions[action].Canceller = canceller;
                        }
                    };


                    // console.log('AQUI', data);

                    return data;
                };
            });

            /**
             * Abort all the outstanding requests on
             * this $resource. Calls promise.reject() on outstanding [].
             */
            resource.abortAll = function() {
                for (var i = 0; i < outstanding.length; i++) {
                    outstanding[i].reject('Aborted all');
                }
                outstanding = [];
            };

            return resource;
        }

        return {
            createResource: function (url, options, actions) {
                return createResource(url, options, actions);
            }
        };
    }
])


.factory('BoardService', ['ResourceFactory', '$resource', 'CacheFactory', function(ResourceFactory, $resource, CacheFactory) {

    // guarda o cache na memoria
    var cache = CacheFactory('BoardCache', { storageMode: parameters.cache_mode });

    var interceptor = {
      response: function (response) {
        cache.remove(response.config.url);
        console.log('cache removed', response.config.url);
        return response;
      }
    };


    var data = ResourceFactory.createResource(parameters.api_url + '/api/:route/:action/:token/:id/:filter/:page/:pageLimit/:date/:scope/:op/:reply', 
    {
    },{ 
        all: {
            method:'GET',
            params:{action: 'all'},
            cache:cache,
            isArray:true
        },
        get: {
            method:'GET',
            cache:cache,
            params:{action: 'get'}
        }
    });

    return data;
}])

.factory('GenericService', ['ResourceFactory', '$resource', '$cacheFactory', function(ResourceFactory, $resource, $cacheFactory) {

    var data = ResourceFactory.createResource(parameters.api_url + '/api/:route/:action/:token/:id/:filter/:page/:pageLimit/:date/:scope/:op/:reply', 
    {
    },{ 
        all: {
            method:'GET',
            params:{action: 'all'},
            isArray:true
        },
        get: {
            method:'GET',
            params:{action: 'get'}
        },
        save: {
            method:'POST',
            params:{action: 'save'}
        },
        delete: {
            method:'DELETE',
            params:{action: 'delete'}
        }
    });

    return data;
}])

.factory('$createPopover', ['$popover', function($popover) {
  return {
    create: function(post, elem, trigger, placement) {

      trigger = trigger || 'hover'; // ativador
      placement = placement || 'auto'; // onde vai abrir

      // conteudo do post
      var content = post.content;
      var image = false;

      // verifica se tem image, se houver, mostra o preview da primeira
      if(post.files.length)
      {
        // procura uma imagem entre os arquivos
        for (var i = 0; i < post.files.length; i++) {

          if(post.files[i].is_image)
          {
            
            image = parameters.file_path + '/' + post.files[i].path_preview;
            break;
          }
        };
      }

      if(image)
        content = '<img src="' + image + '">' + content;
      // 

      var popOver = $popover(elem, {
          content: content, 
          html:true,
          trigger: trigger, 
          animation:'am-flip-x',
          placement:placement
      });

    }
  }
}])

;
