define(function(require) {

  "use strict";

  var Backbone = require('backbone');

  var GalleryView = require('components/photo/gallery-view');

  // Create and instantiate our photocollection - we're going to pass this to
  // every view, but we don't want to create it every single time - just
  // when we start our application
  var PhotoCollection = require('components/photo/collection');

  var photos = new PhotoCollection();

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    routes: {
      "": "index",
      "photo/:id": "singlePhoto"
    },

    index: function() {

      photos.fetch().then(function(){

        new GalleryView({
          collection: photos,
          el: '#photos'
        }).render().place();

      });

    }

  });

  return new Router();

});
