define(['src/modules/core/base-view'], function(BaseView) {
  'use strict';

  suite('BaseView', function() {

    setup(function() {
      this.view = new BaseView();
    });

    suite('#render', function() {
      test('invokes custom `postRender` hook', function() {
        this.view.postRender = sinon.spy();
        this.view.template = function() {};

        this.view.render();

        assert.equal(this.view.postRender.callCount, 1);
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
        this.view.postPlace = sinon.spy();
        this.view.place();

        assert.equal(this.view.postPlace.callCount, 1);
      });
    });
  });
});