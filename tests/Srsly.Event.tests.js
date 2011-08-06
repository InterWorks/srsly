describe("Srsly.Event", function() {

  var ev;

  beforeEach(function() {
    ev = new Srsly.Event();
  });

  describe("when firing the event", function() {
    it("should call listeners with the default scope ('this' value) when a more specific scope is not given", function() {
      // arrange
      var defaultContext = {};
      ev = new Srsly.Event(defaultContext);

      var calledContext;
      ev.hook(function() {
        calledContext = this;
      });

      // act
      ev.fire();

      // assert
      expect(calledContext).toBe(defaultContext);
    });

    it("should call listeners with the given scope", function() {
      // arrange
      var specificContext = {};

      var calledContext;
      ev.hook(function() {
        calledContext = this;
      }, { scope: specificContext });

      // act
      ev.fire();

      // asset
      expect(calledContext).toBe(specificContext);
    });

    it("should call listeners with arguments passed to the fire function", function() {
      // arrange
      var fireArg1 = 1;
      var fireArg2 = 2;

      var listenerArg1, listenerArg2;
      ev.hook(function(arg1, arg2) {
        listenerArg1 = arg1;
        listenerArg2 = arg2;
      });

      // act
      ev.fire(fireArg1, fireArg2);

      // assert
      expect(listenerArg1).toBe(fireArg1);
      expect(listenerArg2).toBe(fireArg2);
    });

    it("should call all listeners", function() {
      // arrange
      var listenerOneCalled = false;
      ev.hook(function() { listenerOneCalled = true; });

      var listenerTwoCalled = false;
      ev.hook(function() { listenerTwoCalled = true; });

      // act
      ev.fire();

      // assert
      expect(listenerOneCalled).toBe(true);
      expect(listenerTwoCalled).toBe(true);
    });

    it("should only call 'single fire' listeners once", function() {
      // arrange
      var listener1CallCount = 0;
      var listener2CallCount = 0;
      ev.hook(function() { listener1CallCount++; }, { single: true });
      ev.hook(function() { listener2CallCount++; }, { single: false });

      // act
      ev.fire();
      ev.fire();

      // assert
      expect(listener1CallCount).toBe(1);
      expect(listener2CallCount).toBe(2);
    });
  });

  it("should remove individual listeners", function() {
    // arrange
    var listenerCalled = false;
    ev.hook(function() { listenerCalled = true; });

    var unhookedListenerCalled = false;
    var unhookedListenerFunc = function() { unhookedListenerCalled = true; }
    ev.hook(unhookedListenerFunc);

    // act
    ev.hook.unhook(unhookedListenerFunc)
    ev.fire();

    // assert
    expect(listenerCalled).toBe(true);
    expect(unhookedListenerCalled).toBe(false);
  });

  it("should clear all listeners", function() {
    // arrange
    var listenerCalled = false;
    ev.hook(function() { listenerCalled = true; });
    ev.hook(function() { listenerCalled = true; });

    // act
    ev.hook.clear();
    ev.fire();

    // assert
    expect(listenerCalled).toBe(false);
  });

});