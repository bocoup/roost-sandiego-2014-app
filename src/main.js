define(function(require) {
  var PhotoCollection = require("components/photo/collection");
  var GalleryView = require("components/photo/gallery-view");

  var photos = new PhotoCollection();
  var gallery = new GalleryView({
    collection : photos,
    el: "#photos"
  });

  photos.fetch().then(function() {
    gallery.render();
  });
});
