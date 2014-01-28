define(function(require) {

  var BaseView = require("core/base-view");
  var template = require("tmpl!src/modules/components/layouts/one-col");

  var PhotoDetailView = require('components/photo/detail-view');
  var UploadView = require('components/photo/upload-view');

  var OneColView = BaseView.extend({

    template: template,

    initialize: function(options) {

      this.modelId = options.modelId;
      this.page = options.page;

    },

    postRender: function() {

      var self = this;

      // single photo detail
      if (self.page === 'photo') {
        self.collection.fetch().then(function() {

          self.addSubView({
            viewType: PhotoDetailView,
            container: '.content',
            options: {
              model: self.collection.get(self.modelId)
            }
          });
        });

      // upload a photo view
      } else if (self.page === 'upload') {

        var uploadView = self.addSubView({
          viewType: UploadView,
          container: '.content',
          options: {
            collection: self.collection
          }
        });

        // when a done event is recieved, just pass it back
        // up to the router.
        uploadView.on('uploaded', function(ev, model) {
          self.trigger('uploaded');
        });
      }
    }

  });

  return OneColView;

});