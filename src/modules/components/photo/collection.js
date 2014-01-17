define(function(require) {

  var Backbone = require("backbone");
  var Photo = require("components/photo/model");

  var PhotoCollection = Backbone.Collection.extend({
    model: Photo,
    comparator: function(model) {
      return (1 / model.id);
    },
    url : function() {
      return "http://localhost:8001/photos";
    }
  });

  return PhotoCollection;
});