import { Log } from './Log.js';
import NetCodec from './NetCodec.js';
import RPC from './RPC.js';

export default class ClientHandle {

  constructor(socket) {
    this._codec = new NetCodec(socket);
    this._codec.onClientMessage(this.onClientMessage, this);
    this._scenes = {};

    // TODO: this works for inbound RPCs but not for outbound !
    RPC.init(this._codec);
  }

  addToScene(scene) {
    this._codec.sendClientMessage('createScene', {
      name: scene.constructor.name,
      id: scene.id
    });
    this._scenes[scene.id] = scene;
  }

  get scenes() {
    return this._scenes;
  }

  send(type, data) {
    this._codec.sendClientMessage(type, data);
  }

  onClientMessage() {

  }

  sendSnapshot(snapshot) {
    this._codec.sendSnapshot(snapshot);
  }

  updateClient() {
    var update = {};
    for (let s of Object.keys(this.scenes)) {
      update[s] = {
        snapshot: this.scenes[s].model.takeSnapshot()
      };
    }
    this._codec.sendUpdate(update);
  }

}
