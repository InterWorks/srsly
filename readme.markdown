                     _            _      
                    | |          (_)     
     ___  _ __  ___ | | _   _     _  ___ 
    / __|| '__|/ __|| || | | |   | |/ __|
    \__ \| |   \__ \| || |_| | _ | |\__ \
    |___/|_|   |___/|_| \__, |(_)| ||___/
                         __/ |  _/ |     
                        |___/  |__/      

**srsly.js - _Seriously_ sweet JavaScript**
http://github.com/interworks/srsly

## What you should know

srsly.js is a loose bundle of JavaScript goodness put together by the fine folks at [InterWorks, Inc.][].

This isn't a framework. Take what you want, leave the rest for later.
Dependencies are kept to a minimum and [Node.js][] is supported when it makes sense.

It rocks, it's free - so treat yourself to some JS love, on us.

## The Goods
### Srsly.Event

  * No dependencies.
  * Works with [Node.js][]

Provides a simple way to expose events as properties on your objects. Each event gets a real property to represent it, not just some magic string.

#### Example

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
      alert(this + ' says ' + words);
    });
    joshua.speak("Hello!"); // will show alert('Joshua says Hello!')

    // joshua.onSpeak.unhook(func); // Remove a specific listener.
    // joshua.onSpeak.clear(); // Remove all listeners.

## Contributors

  `git log --format='%aN' | sort -u`

  * Joshua Poehls

## MIT License

    Copyright (c) 2010 InterWorks, Inc., http://github.com/interworks/srsly

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[InterWorks, Inc.]: http://www.interworks.com
[Node.js]: http://www.nodejs.org