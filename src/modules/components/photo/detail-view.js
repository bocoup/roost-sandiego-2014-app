define(function(require) {

  var BaseView = require("core/base-view");
  var Photo = require("components/photo/model");
  var template = require("tmpl!src/modules/components/photo/detail-view");

  var PhotoView = BaseView.extend({

    template: template,

    model : Photo,

    serializeData: function() {

      return {

        photo: this.model.toJSON()

      };

    }

  });

  return PhotoView;

});
