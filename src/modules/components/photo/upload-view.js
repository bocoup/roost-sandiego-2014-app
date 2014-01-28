define(function(require) {

  'use strict';

  var BaseView = require('core/base-view');
  var template = require('tmpl!src/modules/components/photo/upload-view');

  var process = require('services/vintage');

  return BaseView.extend({
    template: template,

    events: {
      'change input': 'upload'
    },

    upload: function(e) {
      var self = this;
      var collection = this.collection;

      // get the uploaded file
      var file = e.originalEvent.target.files[0];
      var reader = new FileReader();

      // when file is loaded, process photo with our vintage service
      reader.onload = function(ev) {

        process(ev.target.result, function(data) {
          // when file is loaded
          collection.create({
            dataUri: data
          }, {
            wait: true,
            success: function(ev, model) {

              // when the photo is done uploading, trigger the
              // 'upload' event so that the parent view can decide what
              // should be done.
              self.trigger('uploaded', model);
            }
          });
        });
      };

      reader.readAsDataURL(file);
    }
  });
});