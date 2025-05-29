'use strict';
const {registerHTMLClass} = require('../shared/register-html-class.js');
const {escapeHtmlTextContent} = require('../shared/text-escaper.js');
const {ignoreCase} = require('../shared/utils.js');

const {HTMLElement} = require('./element.js');

const tagName = 'title';

/**
 * @implements globalThis.HTMLTitleElement
 */
class HTMLTitleElement extends HTMLElement {
  constructor(ownerDocument, localName = tagName) {
    super(ownerDocument, localName);
  }

  get innerHTML() { return super.innerHTML; }
  set innerHTML(html) { super.innerHTML = ignoreCase(this) ? escapeHtmlTextContent(html) : html; }
}

registerHTMLClass(tagName, HTMLTitleElement);

exports.HTMLTitleElement = HTMLTitleElement;
