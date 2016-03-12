import {Log} from './Log.js';

/* globals requestAnimationFrame, setTimeout */

export default class Timer {

  constructor(cb) {
    this._cb = cb;
    this._stopped = false;
    this._interval = 16;
    this._useAnimFrame = (typeof window !== 'undefined');
    this._lastTime = 0;
  }

  _run() {
    if (this._stopped) return;
    var time = Date.now();

    this._cb(time - this._lastTime);

    this._lastTime = time;

    if (this._useAnimFrame)
      requestAnimationFrame( () => this._run());
    else
      setTimeout(() => this._run(), this._interval);
  }

  start() {
    this._lastTime = Date.now();
    this._stopped = false;
    this._run();
  }

  stop() {
    this._stopped = true;
  }

  setInterval(time) {
    this._useAnimFrame = false;
    this._interval = time;
  }
}
