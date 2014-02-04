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
        this.view.template = sinon.stub().returns('<h1>test!</h1>');

        this.view.render();
        this.view.place();

        assert.equal(this.view.$el.html(), '<h1>test!</h1>');
      });

      test('expands the template with the data returned by `serializeData`', function() {
        var expectedData = {};
        var actualData;
        sinon.stub(this.view, 'serializeData').returns(expectedData);
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

    suite('#destroy', function() {
      test('all event listeners are unbound', function() {
        var handler = sinon.spy();
        var view2 = new BaseView();
        this.view.listenTo(view2, 'sample-event', handler);

        this.view.destroy();
        view2.trigger('sample-event');

        assert.equal(handler.callCount, 0);
      });

      test('container element is emptied', function() {
        this.view.template = sinon.stub().returns('<span>');

        this.view.render();
        this.view.place();

        this.view.destroy();

        assert.equal(this.view.$el.contents().length, 0);
      });

      test('invokes custom `preDestroy` hook', function() {
        var view = this.view;
        this.view.template = sinon.stub().returns('<p>');

        this.view.render().place();

        sinon.stub(this.view, 'preDestroy', function() {
          assert.equal(this, view);
          assert.equal(this.$el.contents().length, 1);
        });
        this.view.destroy();

        assert.equal(this.view.preDestroy.callCount, 1);
      });
    });
  });
});
