define(function(require) {
  'use strict';

  var BaseView = require('core/base-view');
  var template = require("tmpl!src/modules/components/photo/webcam-view");

  return BaseView.extend({
    template: template
  });
});
