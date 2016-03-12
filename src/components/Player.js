import Component from 'core/Component.js';
import Types from 'core/Types.js';
import Input from 'core/components/Input.js';
import CameraComp from 'core/components/Camera.js';
import game from 'core/Game.js';
import { Keycodes } from 'core/Keycodes.js';
import RPC from 'core/RPC.js';

import GridComp from 'components/Grid.js';

import { Camera } from 'prefabs.js';

export default class Player extends Component {

  onCreate() {
    this.createAttribute('grid', null, Types.Component(GridComp));
    this.createAttribute('camera', null, Types.Component(CameraComp));

    this.camera = this.scene.newPrefab(Camera).getComponent(CameraComp);


    if (game.playerId != this.entity.id) {
      this.getComponent(Input).disable();
      this.camera.disable();
    }
  }

  setGrid(g) {
    this.grid = g;
  }

  spawn() {
    // if (this.pawn == null) {
    //   this.pawn = this.scene.newPrefab(Pawn, this.entity).getComponent('Pawn');
    //   this.pawn.reset();
    // }
  }

  onKeyDown(evt) {
    switch(evt.which) {
      case Keycodes.j:
        RPC.call(this, 'spawn', null);
        break;
    }
  }
}
