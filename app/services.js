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

.factory('GenericService', function($resource) {
    var data = $resource(parameters.api_url + '/api/:route/:action/:token/:id/:filter/:page/:pageLimit/:date/:scope/:op/:reply/:cache', { },{ 
        all: {
            method:'GET',
            params:{action: 'all'},
            isArray:true
        },
        get: {
            method:'GET',
            headers:{'cache-control': 'private, max-age=0, no-cache'},
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
})

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
            
            image = parameters.file_path + '/' + post.files[i].image_path_preview;
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