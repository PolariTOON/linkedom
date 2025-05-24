/**
 * @implements globalThis.Attr
 */
export class Attr extends Node implements globalThis.Attr {
    constructor(ownerDocument: any, localName: any, value?: string, prefix?: any);
    ownerElement: any;
    name: string;
    prefix: string;
    get namespaceURI(): "http://www.w3.org/XML/1998/namespace" | "http://www.w3.org/2000/xmlns/";
    set value(newValue: string);
    get value(): string;
    cloneNode(): Attr;
    toJSON(): any[];
    [VALUE]: string;
    [CHANGED]: boolean;
}
import { Node } from './node.js';
import { VALUE } from '../shared/symbols.js';
import { CHANGED } from '../shared/symbols.js';
