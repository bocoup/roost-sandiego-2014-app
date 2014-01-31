define(['src/modules/core/base-view'], function(BaseView) {
  'use strict';

  suite('BaseView', function() {
    suite('#render', function() {
      test('invokes custom `postRender` hook', function() {
        var view = new BaseView();
        var invoked = false;
        view.postRender = function() {
          invoked = true;
        };
        view.template = function() {};

        view.render();

        assert.ok(invoked);
      });

      test('correctly sets the markup to be used in BaseView#place', function() {
        var view = new BaseView();
        view.template = function() {
          return '<h1>test!</h1>';
        };

        view.render();
        view.place();

        assert.equal(view.$el.html(), '<h1>test!</h1>');
      });

      test('expands the template with the data returned by `serializeData`', function() {
        var view = new BaseView();
        var expectedData = {};
        var actualData;
        view.serializeData = function() {
          return expectedData;
        };
        view.template = function(data) {
          actualData = data;
        };
        view.render();

        assert.equal(actualData, expectedData);
      });
    });

    suite('#place', function() {
      test('invokes custom `postPlace` hook', function() {
        var view = new BaseView();
        var invoked = false;
        view.postPlace = function() {
          invoked = true;
        };
        view.place();

        assert.ok(invoked);
      });
    });
  });
});
