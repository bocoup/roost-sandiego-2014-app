define(function(require) {

  var BaseView = require("core/base-view");
  var Photo = require("components/photo/model");
  var template = require("tmpl!src/modules/components/photo/detail-view");

  var PhotoView = BaseView.extend({

    template: template,

    model : Photo,

    events: {
      "click button": "deletePhoto"
    },

    deletePhoto: function() {
      var self = this;

      this.model.destroy({
        wait: true,
        success: function() {
          self.trigger("deleted");
        },
        error: function() {
          self.$el.find('.photo').append('<p class="error">There was an error deleting this photo.</p>');
        }
      });
    },

    serializeData: function() {

      return {

        photo: this.model.toJSON()

      };

    }

  });

  return PhotoView;

});
