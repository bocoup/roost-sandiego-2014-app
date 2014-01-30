define(function(require) {

  'use strict';

  var BaseView = require('core/base-view');
  var template = require('tmpl!src/modules/components/tools/standard-view');
  var gum = require('services/gum-compat');

  return BaseView.extend({

    template: template,

    postPlace: function() {
      if (!gum.getUserMedia) {
        this.$('.btn').eq(0).remove();
      }
    }

  });

});
