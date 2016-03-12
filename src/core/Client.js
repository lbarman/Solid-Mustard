import { Log } from './Log.js';
import NetCodec from './NetCodec.js';
import game from './Game.js';
import RPC from './RPC.js';

// For debugging purposes
/* globals window */
window.game = game;

/* globals eio */

export default class Client {

  connect() {
    var socket = this._socket = new eio.Socket('ws://localhost:3000/');
    this._codec = new NetCodec(socket);
    this._codec.onClientMessage(this.onMessage, this);
    socket.on('open', () => {
      Log.info('Online!');
      socket.on('close', () => {
        Log.warn('Socket closed. TODO: handle this case.');
        this.onDisconnect();
      });

      this._codec.setUpdateListener((data) => this.onUpdate(data));

      // Invoke user hook
      this.onConnect();
    });
    RPC.init(this._codec);
  }

  onConnect() { }

  onDisconnect() { }

  onMessage(type, data) {
    switch(type) {
      case 'createScene':
        game.createScene(data.name, data.id);
        break;
      default:
        Log.error(`Unknown message type: ${type}`);
    }
  }

  onUpdate(data) {
    for (let s of Object.keys(data)) {
      let scene = game.scenes[s];
      if (scene === undefined) {
        Log.warn('Received update for inexisting scene');
        continue;
      }
      scene.model.applySnapshot(data[s].snapshot);
    }
  }

  send(type, data) {
    this._codec.sendClientMessage(this._socket, type, data);
  }
}
