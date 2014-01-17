define(function(require) {

  var Backbone = require("backbone");
  var Photo = require("components/photo/model");
  var APIService = require("services/APIService");

  var PhotoCollection = Backbone.Collection.extend({
    model: Photo,
    comparator: function(model) {
      return (1 / model.id);
    },
    url : APIService.photos
  });

  return PhotoCollection;
});