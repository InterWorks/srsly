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

  // Require Srsly.Belt, if we're on the server, and it's not already present.
  if (!Srsly.Belt && (typeof require !== 'undefined')) Srsly.Belt = require('./Srsly.Belt.js').Belt;

  // Provides a simple way to expose events as properties on your objects.
  // Depends on Srsly.Belt. Works with Node.js.
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
      // The value of 'this' will be the event's default scope,
      // which is the 'Joshua' in this case.
      console.log(this + ' says ' + words);
    });
    joshua.speak("Hello!"); // will show "Joshua says Hello!"

    // joshua.onSpeak.unhook(func); // Remove a specific listener.
    // joshua.onSpeak.clear(); // Remove all listeners.
  */
  Srsly.Event = function (defaultScope) {
    var listeners = [];

    // Calls all of this event's listeners with any arguments passed.
    this.fire = function () {

      // Collect listeners that should be removed after this firing.
      var removeListeners;

      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];

        // Call the listener function with this event's scope and any arguments passed into the fire().
        listener.func.apply(listener.options.scope, arguments);
        
        // If this listener should only be called once, then unhook it.
        if (listener.options.single === true) {
          removeListeners = removeListeners || [];
          removeListeners.push(listener);
        }
      }

      // Unhook all listeners that shouldn't be called again.
      if (removeListeners) {
        for (var i = 0; i < removeListeners.length; i++) {
          this.hook.unhook(removeListeners[i].func);
        }
      }
    };

    // Public event hook that should be exposed in your object's public interface.
    // Provides consumers of your object a way to add listeners to this event.
    this.hook = function (func, options) {
      options = Srsly.Belt.applyDefaults(options, {
        // True or false whether this listener should only fire once.
        single: false,
        // Scope the listener should be executed in. (Value of 'this' inside the listener function.)
        scope: defaultScope
      });

      listeners.push({
        func: func,
        options: options
      });
    };

    // Removes the passed function from this event's listeners.
    // Assumes that the passed function only appears in the listeners collection ONCE!
    this.hook.unhook = function (func) {
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].func === func) {
          console.log('removing listener');
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