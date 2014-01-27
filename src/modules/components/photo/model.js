define(function(require) {
  var Backbone = require("backbone");

  var Photo = Backbone.Model.extend({
    urlRoot : function() {
      return "http://localhost:8001/photos";
    }
  });

  return Photo;
});
