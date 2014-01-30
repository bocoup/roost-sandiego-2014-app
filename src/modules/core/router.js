define(function(require) {

  "use strict";

  var Backbone = require('backbone');

  var OneColLayout = require('layouts/one-col');
  var TwoColLayout = require('layouts/two-col');

  // Create and instantiate our photocollection - we're going to pass this to
  // every view, but we don't want to create it every single time - just
  // when we start our application
  var PhotoCollection = require('components/photo/collection');
  var photos = new PhotoCollection();

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    routes: {
      "": "index",
      "photo/:id": "singlePhoto",
      "upload": "upload",
      "webcam": "webcam"
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
        collection: photos,
        page: "index"
      }));
    },

    singlePhoto: function(id) {
      this.insertView(new OneColLayout({
        collection: photos,
        modelId: id,
        page: "photo"
      }));

    },

    upload: function() {

      var self = this;

      var uploadView = new OneColLayout({
        collection: photos,
        page: "upload"
      });

      this.insertView(uploadView);

      // when the upload is done, navigate back to our
      // gallery view
      uploadView.on("uploaded", function(ev) {
        self.navigate("", { trigger: true });
      });

    },

    webcam: function() {
      this.insertView(new TwoColLayout({
        page: "webcam"
      }));
    }

  });

  return new Router();

});
