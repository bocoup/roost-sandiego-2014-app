define(function(require) {

  var BaseView = require("core/base-view");
  var template = require("tmpl!src/modules/components/photo/gallery-view");

  var GalleryView = BaseView.extend({

    template: template,

    serializeData: function() {

      return {

        gallery: this.collection.toJSON()

      };

    }

  });

  return GalleryView;
});