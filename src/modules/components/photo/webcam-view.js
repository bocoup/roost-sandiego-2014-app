define(function(require) {
  'use strict';

  var BaseView = require('core/base-view');
  var template = require('tmpl!src/modules/components/photo/webcam-view');
  var gum = require('services/gum-compat');
  var process = require('services/vintage');
  var _ = require('underscore');

  return BaseView.extend({
    template: template,

    initialize: function(options) {
      this.collection = options.collection;
    },

    destroy: function() {
      var video = this.$('video')[0];

      // This fixes a known bug in Chrome that keeps the camera running even
      // after destroying the video element.
      if (video) {
        video.src = undefined;
      }

      // Call destroy on all of the subViews we may have added
      this.destroySubViews();

      // Release event listeners
      this.stopListening();

      // Empty our element - do not remove it, because we will use it again
      this.$el.empty();

      return this;
    },

    filterAndSave: function() {
      var video = this.$('video')[0];
      var canvas = this.$('canvas')[0];
      var ctx = canvas.getContext('2d');
      var collection = this.collection;
      var uploadComplete = _.bind(this.uploadComplete, this);

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Perform the filter operation on the "plain" image copied from the
      // canvas.
      process(canvas.toDataURL(), function(dataUri) {

        collection.create({
          dataUri: dataUri
        }, {
          wait: true,
          success: uploadComplete
        });
      });
    },

    uploadComplete: function() {
      this.trigger('uploaded');
    },

    postPlace: function() {
      var video = this.$('video')[0];

      gum.getUserMedia({ video: true }, function(stream) {
        gum.playStream(video, stream);
      }, _.bind(this.videoNotAvailable, this));
    },

    videoNotAvailable: function() {
      this.$('video').replaceWith('<h3>Video unavailable</h3>');
    }
  });
});
