import 'scenes/index.js';

import game from 'core/Game.js';
import Server from 'core/Server.js';
import PlayerComp from 'components/Player.js';

import { Player } from 'prefabs.js';

export default class extends Server {

  onCreate() {
    this.scene = game.createScene('MainScene');
    game.start();
  }

  onClientConnect(client) {
    var player = this.scene.newPrefab(Player);
    client.addToScene(this.scene);
    player.getComponent(PlayerComp).spawn();
    client.send('playerId', player.id);
  }

  onClientDisconnect() {  }

}
