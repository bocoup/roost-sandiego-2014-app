define(function(require) {

  "use strict";

  var Backbone = require('backbone');

  var TwoColLayout = require('layouts/two-col');

  // Create and instantiate our photocollection - we're going to pass this to
  // every view, but we don't want to create it every single time - just
  // when we start our application
  var PhotoCollection = require('components/photo/collection');
  var photos = new PhotoCollection();

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    routes: {
      "": "index"
    },

    insertView: function(pageView) {
      if (this.currentView) {
        this.currentView.destroy();
      }
      this.currentView = pageView;
      pageView.$el.appendTo("#photos");
      pageView.render().place();
    },

    index: function() {
      this.insertView(new TwoColLayout({
        collection: photos
      }));
    }

  });

  return new Router();

});
