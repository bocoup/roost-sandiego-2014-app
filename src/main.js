define(function(require) {
  var Photo = require("components/photo/model");
  var PhotoView = require("components/photo/detail-view");

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
