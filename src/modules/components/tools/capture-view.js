define(function(require) {

  'use strict';

  var BaseView = require('core/base-view');
  var template = require('tmpl!src/modules/components/tools/capture-view');

  return BaseView.extend({

    template: template,

    events: {
      'click button': 'requestCapture'
    },

    requestCapture: function() {
      this.trigger('requestCapture');
    }

  });

});
