
define(function(require) {

  'use strict';

  var Backbone = require('backbone');
  var $ = require('jquery');

  var BaseView = Backbone.View.extend({

    constructor: function() {

      // Create a per instance subViews property.
      // It is a map of unique child ids to child views.
      // The child id can be a number or string, e.g. the id of the associated model
      this.subViews = {};

      // Call super to invoke the default constructor functionality
      Backbone.View.apply( this, arguments );

    },

    addSubView: function( subViewSpec ) {

      // If we didn't pass an options object, create one.
      subViewSpec.options = subViewSpec.options || {};

      // Add the `el` property to our options for creating a View instance
      subViewSpec.options.el = this.$template.find(subViewSpec.container).get(0);

      // Create our subView instance, render, and place it in the document
      var subView = new subViewSpec.viewType( subViewSpec.options )
        .render()
        .place();

      // Add it to the subViews map
      this.subViews[ subViewSpec.name ] = subView;

      return subView;

    },

    destroy: function() {

      // In case an instance has specialized logic for cleaning itself up,
      // invoke the `preDestroy` hook before any actual destruction occurs.
      this.preDestroy();

      // Call destroy on all of the subViews we may have added
      this.destroySubViews();

      // Release event listeners
      this.stopListening();

      // Empty our element - do not remove it, because we will use it again
      this.$el.empty();

      return this;
    },

    preDestroy: function() {},

    destroySubViews: function() {

      // Cache local to this function
      var subViews = this.subViews;

      for ( var id in subViews ) {

        // Only delete own properties
        if ( subViews.hasOwnProperty(id) ) {
          subViews[ id ].destroy();

          // Destroy removes the events and DOM element
          // Call delete to remove the object from memory
          delete subViews[ id ];
        }
      }

      return this;
    },

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