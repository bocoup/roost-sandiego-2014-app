
function awesome() {
  document.body.innerHTML = 'OMG';
}

awesome();

var Photo = Backbone.Model.extend({
  urlRoot : function() {
    return "http://localhost:8001/photos";
  }
});

var me = new Photo({
  id: 1
});

me.fetch().then(function(photo) {
  console.log(photo);

  // add to the DOM:
  $('<img>', {
    src: photo.dataUri
  }).appendTo('body');

});