
function awesome() {
  document.body.innerHTML = 'OMG';
}

awesome();

var Photo = Backbone.Model.extend({
  urlRoot : function() {
    return "http://localhost:8001/photos";
  }
});

var PhotoView = Backbone.View.extend({
  model : Photo,

  render: function() {

    // add to the DOM:
    $('<img>', {
      src: this.model.get("dataUri")
    }).appendTo(this.$el);

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

me.fetch().then(function(photo) {
  console.log(photo);

  view.render();
});