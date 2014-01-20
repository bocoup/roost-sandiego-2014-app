
define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var $ = require('jquery');

  var BaseView = Backbone.View.extend({

    place: function() {

      this.$el.html(this.$template);

      this.postPlace();

      return this;

    },

    postPlace: function() {},

    postRender: function() {},

    render: function() {

      this.$template = $(this.template(this.serializeData()));

      this.postRender();

      return this;

    },

    serializeData: function() {}


  });

  return BaseView;

});