define(['src/modules/components/photo/detail-view'], function(PhotoView) {
  'use strict';

  suite('PhotoView', function() {

    setup(function() {
      this.view = new PhotoView();
    });

    suite('#test', function() {
      test('should return foobar', function() {
        var foo = "foobar";
        var bar = "foobar";

        assert.equal(foo, bar);
      });
    });
  });
});
