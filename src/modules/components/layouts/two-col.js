define(function(require) {

  'use strict';

  var BaseView = require('core/base-view');
  var PhotoGalleryView = require('components/photo/gallery-view');
  var ToolsStandardView = require('components/tools/standard-view');
  var ToolsCaptureView = require('components/tools/capture-view');
  var template = require('tmpl!src/modules/components/layouts/two-col');
  var $ = require('jquery');

  return BaseView.extend({

    template: template,

    initialize: function(options) {
      this.page = options.page;
    },

    postPlace: function() {

      // Make the sidebar sticky when scrolling!
      var doc = $(document);
      var sidebar = this.$el.find('.side-bar');

      // For some reason, PhantomJS dies if we don't do this.
      if (sidebar.length === 0) { return; }

      var sidebarTop = sidebar.offset().top;

      function bound(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }

      $(window).off('scroll').on('scroll', function() {
        sidebar.css('top', bound(sidebarTop - doc.scrollTop(), 0, sidebarTop));
      });

    },

    postRender: function() {

      var self = this;

      if (this.page === 'index') {

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
      } else if (this.page === 'webcam') {

        self.addSubView({
          name: 'ToolsCaptureView',
          viewType: ToolsCaptureView,
          container: '.side-bar'
        });
      }

    }

  });

});
