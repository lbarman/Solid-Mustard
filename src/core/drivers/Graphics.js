import { Log } from '../Log.js';

/* globals document, window */

const CSS_RULEZ = [`
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}`,
`#savannah-screen {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: transparent;
}`];

class Graphics {

  constructor() {
    this._initialized = false;
    this._isCanvasSupported = undefined;
    this._ctx = null;
  }

  // Returns true if graphic rendering is available on this platform
  available() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      Log.info('No document or window available: graphics will be disabled.');
      return false;
    }
    if (this._isCanvasSupported === undefined) {
      this._isCanvasSupported = this._determineCanvasSupported();
      if (this._isCanvasSupported) {
        Log.info('Canvas is supported :)');
      } else {
        Log.info('Canvas not supported: graphics will be disabled.');
      }
    }
    return this._isCanvasSupported;
  }

  init() {
    if (this._initialized === true) {
      return;
    }

    this._makeCanvas();
    this._addCSSRules(CSS_RULEZ);
    window.addEventListener('resize', () => this.updateCanvasSize());


    this._initialized = true;
  }

  get height() {
    return (typeof window !== 'undefined') ? window.innerHeight : 0;
  }

  get width() {
    return (typeof window !== 'undefined') ? window.innerWidth : 0;
  }

  clear(color = '#fff') {
    this._ctx.fillStyle = color;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }

  get ctx() {
    return this._ctx;
  }

  _makeCanvas() {
    this._canvas = document.createElement('canvas');
    this._canvas.id = 'savannah-screen';
    this._ctx = this._canvas.getContext('2d');
    document.body.appendChild(this._canvas);
    this.updateCanvasSize();
  }

  _determineCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }

  _addCSSRules(rules) {
    var sheet = window.document.styleSheets[0];
    if (typeof sheet === 'undefined') {
      // The document contains no styleSheet
      document.head.appendChild(document.createElement('style'));
      // Try again now
      sheet = window.document.styleSheets[0];
    }

    for (let rule of rules) {
      if (typeof sheet.insertRule === 'function') {
        sheet.insertRule(rule, sheet.cssRules.length);
      } else {
        sheet.addRule(rule, -1);
      }
    }
  }

  updateCanvasSize() {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }



}

export default new Graphics();
