/*jslint node: true, vars: true, indent: 2 */
(function (undefined) {
  "use strict";

  // Save a reference to the global object.
  var root = this;

  // The top-level namespace. Exported for both CommonJS and the browser.
  var MY_NAMESPACE;
  if (typeof exports !== 'undefined') {
    MY_NAMESPACE = exports;
  } else {
    MY_NAMESPACE = root.MY_NAMESPACE = root.MY_NAMESPACE || {};
  }

  // ------------------------------------------------------------------------
  // note: this is how you would require a dependency when running in Node.js
  // ------------------------------------------------------------------------
  // Require MY_DEPENDENCY, if we're on the server, and it's not already present.
  // if (!MY_DEPENDENCY && (typeof require !== 'undefined'))
  //   MY_DEPENDENCY = require('./MY_DEPENDENCY.js');

  // Define a MY_OBJECT constructor function in MY_NAMESPACE.
  MY_NAMESPACE.MY_OBJECT = function () {
    // ------------------------------------------------
    // todo: put instance properties and functions here
    // ------------------------------------------------
  };
}.call(this));