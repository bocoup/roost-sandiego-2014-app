define(['src/modules/core/base-view'], function(BaseView) {
  'use strict';

  suite('BaseView', function() {

    setup(function() {
      this.view = new BaseView();
    });

    suite('#render', function() {
      test('invokes custom `postRender` hook', function() {
        var invoked = false;
        this.view.postRender = function() {
          invoked = true;
        };
        this.view.template = function() {};

        this.view.render();

        assert.ok(invoked);
      });

      test('correctly sets the markup to be used in BaseView#place', function() {
        this.view.template = function() {
          return '<h1>test!</h1>';
        };

        this.view.render();
        this.view.place();

        assert.equal(this.view.$el.html(), '<h1>test!</h1>');
      });

      test('expands the template with the data returned by `serializeData`', function() {
        var expectedData = {};
        var actualData;
        this.view.serializeData = function() {
          return expectedData;
        };
        this.view.template = function(data) {
          actualData = data;
        };
        this.view.render();

        assert.equal(actualData, expectedData);
      });
    });

    suite('#place', function() {
      test('invokes custom `postPlace` hook', function() {
        var invoked = false;
        this.view.postPlace = function() {
          invoked = true;
        };
        this.view.place();

        assert.ok(invoked);
      });
    });
  });
});
