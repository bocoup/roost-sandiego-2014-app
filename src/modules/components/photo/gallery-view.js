define(function(require) {

  var Backbone = require("backbone");
  var template = require("tmpl!src/modules/components/photo/gallery-view");

  var GalleryView = Backbone.View.extend({
    render: function() {
      this.$el.html(template({
        gallery: this.collection.toJSON()
      }));
      return this;
    }
  });

  return GalleryView;
});