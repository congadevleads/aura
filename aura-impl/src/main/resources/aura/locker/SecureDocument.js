/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//#include aura.locker.SecureThing
//#include aura.locker.SecureElement
//#include aura.locker.SecureScriptElement
var SecureDocument = (function() {
  "use strict";

  /**
   * Construct a new SecureDocument.
   *
   * @public
   * @class
   * @constructor
   *
   * @param {Object}
   *            document - the DOM document
   * @param {Object}
   *            key - the key to apply to the secure document
   */
  function SecureDocument(document, key) {
    setLockerSecret(this, "key", key);
    setLockerSecret(this, "ref", document);
    Object.freeze(this);
  }

  SecureDocument.prototype = Object.create(null, {
    toString: {
      value: function() {
        return "SecureDocument: " + getLockerSecret(this, "ref") + "{ key: " + JSON.stringify(getLockerSecret(this, "key")) + " }";
      }
    },

    createElement: {
      value: function(tag) {
        var key = getLockerSecret(this, "key");
        switch (tag.toLowerCase()) {
        case "script":
          return new SecureScriptElement(key);

        default:
          var el = getLockerSecret(this, "ref").createElement(tag);
          return new SecureElement(el, key);
        }
      }
    },
    createDocumentFragment: {
      value: function() {
        return new SecureElement(getLockerSecret(this, "ref").createDocumentFragment(), getLockerSecret(this, "key"));
      }
    },
    createTextNode: {
      value: function(text) {
        return new SecureElement(getLockerSecret(this, "ref").createTextNode(text), getLockerSecret(this, "key"));
      }
    },

    body: SecureThing.createFilteredProperty("body"),
    head: SecureThing.createFilteredProperty("head"),

    getElementById: SecureThing.createFilteredMethod("getElementById"),
    getElementsByClassName: SecureThing.createFilteredMethod("getElementsByClassName"),
    getElementsByName: SecureThing.createFilteredMethod("getElementsByName"),
    getElementsByTagName: SecureThing.createFilteredMethod("getElementsByTagName"),

    querySelector: SecureThing.createFilteredMethod("querySelector"),
    querySelectorAll: SecureThing.createFilteredMethod("querySelectorAll"),

    // DCHASMAN TODO W-2839646 Figure out how much we want to filter cookie access???
    cookie: SecureThing.createPassThroughProperty("cookie")
  });

  SecureDocument.prototype.constructor = SecureDocument;

  return SecureDocument;
})();
