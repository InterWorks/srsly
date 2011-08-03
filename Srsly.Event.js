(function () {
  // Protect 'undefined' from being 'redefined'.
  var undefined;

  // Save a reference to the global object.
  var root = this;

  // The top-level namespace. Exported for both CommonJS and the browser.
  var Srsly;
  if (typeof exports !== 'undefined') {
    Srsly = exports;
  } else {
    Srsly = root.Srsly = root.Srsly || {};
  }

  // Provides a simple way to expose events as properties on your objects.
  // No dependencies. Works with Node.js.
  // Example:
  /*
    // Require Srsly.Event, if we're on the server, and it's not already present.
    if (!Srsly && (typeof Srsly !== 'undefined')) Srsly = require('Srsly.Event.js');

    function Person(name) {
      // The value passed to the constructor will be used
      // as the context ('this' value) when calling the listeners.
      var onSpeak = new Srsly.Event(name);

      this.speak = function(words) {
        onSpeak.fire(words);
      }

      // Return the public 'hook' interface of the event.
      this.onSpeak = onSpeak.hook;
    };

    var joshua = new Person('Joshua');
    joshua.onSpeak(function (words) {
      // The value of 'this' will be the event's sender,
      // which is the 'Joshua' in this case.
      console.log(this + ' says ' + words);
    });
    joshua.speak("Hello!"); // will show "Joshua says Hello!"

    // joshua.onSpeak.unhook(func); // Remove a specific listener.
    // joshua.onSpeak.clear(); // Remove all listeners.
  */
  Srsly.Event = function (sender) {
    var listeners = [];

    // Calls all of this event's listeners with any arguments passed.
    this.fire = function () {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i].apply(sender, arguments);
      }
    };

    // Public event hook that should be exposed in your object's public interface.
    // Provides consumers of your object a way to add listeners to this event. 
    this.hook = function (func) {
      listeners.push(func);
    };

    // Removes the passed function from this event's listeners.
    this.hook.unhook = function (func) {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i] === func) {
          listeners.splice(i, 1);
        }
      }
    };

    // Removes all listeners of this event.
    this.hook.clear = function () {
      listeners = [];
    };
  };
}).call(this);