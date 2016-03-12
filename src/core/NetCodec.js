import { Log } from './Log.js';

export default class NetCodec {

  constructor(socket) {
    this._socket = socket;

    this._clientSubscribers = [];
    this._updateListener = null;
    this._RPCListener = null;

    socket.on('message', (raw) => {
      var packet = JSON.parse(raw);
      if (packet.dest === 'client') {
        for (let sub of this._clientSubscribers) {
          sub.cb.call(sub.ctx, packet.type, packet.data);
        }
      } else if (packet.dest === 'update'){
        if (this._updateListener !== null) {
          this._updateListener(packet.data);
        }
      } else if (packet.dest === 'RPC') {
        if (this._RPCListener !== null) {
          this._RPCListener(packet.scene, packet.entity, packet.component, packet.method, packet.data);
        }
      } else {
        throw new Error(`Unknown packet destination: ${packet.dest}`);
      }
    });
  }

  sendClientMessage(type, data) {
    this._socket.send(JSON.stringify({
      dest: 'client',
      type: type,
      data: data
    }));
  }

  onClientMessage(cb, ctx) {
    this._clientSubscribers.push({
      cb: cb,
      ctx: ctx
    });
  }

  sendUpdate(update) {
    this._socket.send(JSON.stringify({
      dest: 'update',
      data: update
    }));
  }

  setUpdateListener(listener) {
    this._updateListener = listener;
  }

  sendRPC(scene, entity, component, method, data) {
    this._socket.send(JSON.stringify({
      dest: 'RPC',
      scene: scene,
      entity: entity,
      component: component,
      method: method,
      data: data
    }));
  }

  onRPC(listener) {
    this._RPCListener = listener;
  }

}
