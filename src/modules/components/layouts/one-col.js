define(function(require) {

  var BaseView = require("core/base-view");
  var template = require("tmpl!src/modules/components/layouts/one-col");

  var PhotoDetailView = require('components/photo/detail-view');

  var OneColView = BaseView.extend({

    template: template,

    initialize: function(options) {

      this.modelId = options.modelId;

    },

    postRender: function() {

      var self = this;

      // Listen for the pageChange event, which will tell us which page this is
      // We load different subViews, depending on which page this layout
      // represents
      self.collection.fetch().then(function() {

        self.addSubView({
          viewType: PhotoDetailView,
          container: '.content',
          options: {
            model: self.collection.get(self.modelId)
          }
        });
      });

    }

  });

  return OneColView;

});