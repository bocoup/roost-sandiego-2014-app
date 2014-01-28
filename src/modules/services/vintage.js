define(function(require){
  'use strict';

  var $ = require('jquery');
  var _ = require('underscore');

  require('vintagejs');

  var effect = {
    screen: {
      r: 227,
      g: 12,
      b: 169,
      a: 0.1
    },
    vignette: 0.7,
    noise: 20
  };

  return function(dataURL, callback) {
    // create a temporary image and set its src
    // to the data URL
    var placeholder = $('<img>', {
      src: dataURL
    });

    placeholder.vintage({
      onStop: function() {

        // if we have a callback passed, then
        // call it with the processed data
        if (_.isFunction(callback)) {
          callback(placeholder.attr('src'));
        }
      }
    }, effect);
  };
});