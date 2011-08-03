describe("Srsly.Event", function() {

  var ev;

  beforeEach(function() {
    ev = new Srsly.Event();
  });

  describe("when firing the event", function() {
    it("should call listeners with the expected context ('this' value)", function() {
      // arrange
      var context = {};
      ev = new Srsly.Event(context);

      var calledContext;
      ev.hook(function() {
        calledContext = this;
      });

      // act
      ev.fire();

      // assert
      expect(calledContext).toBe(context);
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