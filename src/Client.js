import 'scenes/index.js';

import Client from 'core/Client.js';
import { Log } from 'core/Log.js';
import game from 'core/Game.js';

export default class extends Client {
  constructor() {
    super();
    this.connect();
  }

  onConnect() {
    game.start();
  }

  onDisconnect() {
    game.stop();
  }

  onMessage(type, data) {
    switch(type) {
      case 'playerId':
        Log.info(`setting player id to ${data}`);
        game.playerId = data;
        break;
      default:
        super.onMessage(type, data);
    }
  }
}
