import 'scenes/index.js';

import game from 'core/Game.js';
import Server from 'core/Server.js';
import PlayerComp from 'components/Player.js';
import GridComp from 'components/Grid.js';

import { Player } from 'prefabs.js';

export default class extends Server {

  onCreate() {
    game.isMaster = true;
    this.scene = game.createScene('MainScene');
    game.start();
  }

  onClientConnect(client) {
    var player = this.scene.newPrefab(Player);
    client.addToScene(this.scene);
    client.send('playerId', player.id);
    const grid = this.scene.makeGrid();
    const playerComp = player.getComponent(PlayerComp);
    playerComp.grid = grid;
    grid.player = playerComp;
    player.transform.x = grid.grid_num * GridComp.H_CELLS + GridComp.H_CELLS/2;
    player.transform.y = GridComp.V_CELLS / 2;
  }

  onClientDisconnect() {  }

}
