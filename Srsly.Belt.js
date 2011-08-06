(function() {
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

  // Utility belt functions.
  // No dependencies. Works with Node.js.
  Srsly.Belt = {
    
    // Merges a set of default values into an object.
    applyDefaults: function(options, defaults) {
      if (typeof options === 'undefined' || !options) {
        options = {};
      }

      if (defaults) {
        for (var prop in defaults) {
          if (defaults.hasOwnProperty(prop)) {
            if (typeof options[prop] === 'undefined') {
              options[prop] = defaults[prop];
            }
          }
        }
      }

      return options;
    }

  };

}).call(this);