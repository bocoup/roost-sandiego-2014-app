define(function(require) {
  var Backbone = require("backbone");
  var APIService = require("services/APIService");

  var Photo = Backbone.Model.extend({
    urlRoot : APIService.photos
  });

  return Photo;
});
