define(function(require) {
  var Backbone = require("backbone");
  var Photo = require("components/photo/model");
  var template = require("tmpl!src/modules/components/photo/detail-view");

  var PhotoView = Backbone.View.extend({
    model : Photo,

    render: function() {

      this.$el.html(template(this.model.toJSON()));

      return this;
    }
  });

  return PhotoView;
});
