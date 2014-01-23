define(function(require) {

  'use strict';

  var BaseView = require('core/base-view');
  var PhotoGalleryView = require('components/photo/gallery-view');
  var ToolsStandardView = require('components/tools/standard-view');
  var template = require('tmpl!src/modules/components/layouts/two-col');

  return BaseView.extend({

    template: template,

    postRender: function() {

      var self = this;

      self.collection.fetch().then(function() {
        self.addSubView({
          name: 'PhotoGalleryView',
          viewType: PhotoGalleryView,
          container: '.content',
          options: {
            collection: self.collection
          }
        });

        self.addSubView({
          name: 'ToolsStandardView',
          viewType: ToolsStandardView,
          container: '.side-bar'
        });
      });

    }

  });

});
