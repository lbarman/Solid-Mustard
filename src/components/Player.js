import Component from 'core/Component.js';
import Types from 'core/Types.js';
import Input from 'core/components/Input.js';
import CameraComp from 'core/components/Camera.js';
import game from 'core/Game.js';
import { Keycodes } from 'core/Keycodes.js';
import RPC from 'core/RPC.js';

import GridComp from 'components/Grid.js';


export default class Player extends Component {

  onCreate() {
    this.createAttribute('grid', null, Types.Component(GridComp));

    const camera = this.getComponent(CameraComp);
    this.CAMERA_SPEED = 0.01;

    if (game.playerId != this.entity.id) {
      this.getComponent(Input).disable();
      camera.disable();
    }
  }

  setGrid(g) {
    this.grid = g;
    if (game.playerId != this.entity.id) {
      g.disable();
    }
  }

  spawn() {
    // if (this.pawn == null) {
    //   this.pawn = this.scene.newPrefab(Pawn, this.entity).getComponent('Pawn');
    //   this.pawn.reset();
    // }
  }

  onUpdate(dt) {
    super.onUpdate();
    const input = this.getComponent(Input);

    if (input.keys.right) {
      this.transform.x += dt * this.CAMERA_SPEED;
    }
    if (input.keys.left) {
      this.transform.x -= dt * this.CAMERA_SPEED;
    }
  }

}
