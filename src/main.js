define(function(require) {
  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");

  var Photo = require("src/modules/components/photo/model");

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

  var me = new Photo({
    id: 1
  });


  var view = new PhotoView({
    model : me
  });

  view.$el.appendTo('body');

  me.fetch().always(function() {
    view.render();
  });
});
