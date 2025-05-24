import {ATTRIBUTE_NODE} from '../shared/constants.js';
import {CHANGED, VALUE} from '../shared/symbols.js';
import {String, ignoreCase} from '../shared/utils.js';
import {attrAsJSON} from '../shared/jsdon.js';
import {emptyAttributes} from '../shared/attributes.js';

import {attributeChangedCallback as moAttributes} from './mutation-observer.js';
import {attributeChangedCallback as ceAttributes} from './custom-element-registry.js';

import {Node} from './node.js';
import {escape} from '../shared/text-escaper.js';

const QUOTE = /"/g;

/**
 * @implements globalThis.Attr
 */
export class Attr extends Node {
  constructor(ownerDocument, localName, value = '', prefix = null) {
    super(ownerDocument, localName, ATTRIBUTE_NODE);
    this.ownerElement = null;
    this.name = prefix == null ? String(localName) : String(prefix) + ":" + String(value);
    this.prefix = String(prefix);
    this[VALUE] = String(value);
    this[CHANGED] = false;
  }

  get namespaceURI() {
    if (this.ownerElement == null || this.ownerElement.ownerSVGElement != null) {
      return null;
    }
    if (this.prefix === "xml") {
      return "http://www.w3.org/XML/1998/namespace";
    }
    if (this.prefix === "xmlns") {
      return "http://www.w3.org/2000/xmlns/";
    }
    return null;
  }

  get value() { return this[VALUE]; }
  set value(newValue) {
    const {[VALUE]: oldValue, name, ownerElement} = this;
    this[VALUE] = String(newValue);
    this[CHANGED] = true;
    if (ownerElement) {
      moAttributes(ownerElement, name, oldValue);
      ceAttributes(ownerElement, name, oldValue, this[VALUE]);
    }
  }

  cloneNode() {
    const {ownerDocument, name, [VALUE]: value} = this;
    return new Attr(ownerDocument, name, value);
  }

  toString() {
    const {name, [VALUE]: value} = this;
    if (emptyAttributes.has(name) && !value) {
      return ignoreCase(this) ? name : `${name}=""`;
    }
    const escapedValue = (ignoreCase(this) ? value : escape(value)).replace(QUOTE, '&quot;');
    return `${name}="${escapedValue}"`;
  }

  toJSON() {
    const json = [];
    attrAsJSON(this, json);
    return json;
  }
}
