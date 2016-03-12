import { Log } from '../Log.js';
import Component from '../Component.js';
import Types from '../Types.js';
import RPC from '../RPC.js';
import { Keycodes } from '../Keycodes.js';

/* global window */

export default class Input extends Component {

  onCreate() {
    // TODO (after diff update): have an exhaustive key map matching Keycodes definitions
    const keys = {
      left: false,
      right: false,
      up: false,
      down: false
    };
    this.createAttribute('keys', keys, Types.Object);

    this._keyDownListener = (evt) => this.handleKeyDown(evt);
    this._keyUpListener = (evt) => this.handleKeyUp(evt);
      if (this.enabled === true) {
      this._bindHandlers();
    }
  }

  _inputAvailable() {
    return typeof window !== 'undefined';
  }

  /**
   * onEvent functions are client-side only. Default implementation transferes
   * event to handleEvent which runs on both client and server.
   */
  handleKeyDown(nativeEvent) {
    var evt = {
      type: 'keydown',
      which: nativeEvent.which
    };
    this.entity.triggerEvent('keydown', evt);
    RPC.call(this, 'handleEvent', evt);
    this.handleEvent(evt);
  }

  handleKeyUp(nativeEvent) {
    var evt = {
      type: 'keyup',
      which: nativeEvent.which
    };
    this.entity.triggerEvent('keyup', evt);
    RPC.call(this, 'handleEvent', evt);
    this.handleEvent(evt);
  }

  /**
    * Main event dispatching function
    */
  handleEvent(evt) {
    switch(evt.type) {
      case 'keydown':
      switch(evt.which) {
        case Keycodes.d:
        this.keys.right = true;
        break;
        case Keycodes.s:
        this.keys.down = true;
        break;
        case Keycodes.z:
        case Keycodes.w:
        this.keys.up = true;
        break;
        case Keycodes.q:
        case Keycodes.a:
        this.keys.left = true;
        break;
      }
      break;
      case 'keyup':
      switch(evt.which) {
        case Keycodes.d:
          this.keys.right = false;
          break;
        case Keycodes.s:
          this.keys.down = false;
          break;
        case Keycodes.z:
        case Keycodes.w:
          this.keys.up = false;
          break;
        case Keycodes.q:
        case Keycodes.a:
          this.keys.left = false;
          break;
      }
      break;
    }
  }


  _bindHandlers() {
        Log.info(`bind ${this.id}`);
    if (this._inputAvailable() === true) {
      window.addEventListener('keydown', this._keyDownListener);
      window.addEventListener('keyup', this._keyUpListener);
    }
  }

  _unbindHandlers() {
        Log.info(`unbind ${this.id}`);
    if (this._inputAvailable() === true) {
      window.removeEventListener('keydown', this._keyDownListener);
      window.removeEventListener('keyup', this._keyUpListener);
    }
  }

  onDestroy() {
    this._unbindHandlers();
  }

  disable() {
    super.disable();
    this._unbindHandlers();
  }

  enable() {
    super.enable();
    this._bindHandlers();
  }
}
