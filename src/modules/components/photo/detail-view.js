define(function(require) {
  var Backbone = require("backbone");
  var Photo = require("components/photo/model");
  var _ = require("underscore");
  var $ = require("jquery");

  var PhotoView = Backbone.View.extend({
    model : Photo,

    template: _.template($("#photo_view").text()),

    render: function() {

      this.$el.html(
        this.template(
          this.model.toJSON()
        )
      );

      return this;
    }
  });

  return PhotoView;
});
