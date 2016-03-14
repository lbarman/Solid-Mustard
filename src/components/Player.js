import Component  from 'core/Component.js';
import game  from 'core/Game.js';
import Types  from 'core/Types.js';
import CameraComp  from 'core/components/Camera.js';
import Input  from 'core/components/Input.js';
import { GUI } from 'prefabs.js';


export default class Player extends Component {

  onCreate() {
    super.onCreate();
    this.createAttribute('grid', null, Types.Component);
    this.createAttribute('life', 10, Types.Int);
    this.createAttribute('money', 100, Types.Int);

    const camera = this.getComponent(CameraComp);
    this.CAMERA_SPEED = 0.02;


    if (game.playerId != this.entity.id) {
      this.getComponent(Input).disable();
      camera.disable();
    } else {
      this.gui = this.scene.newPrefab(GUI, this);
      this.gui.disableNetworking();
    }
  }

  onDestroy() {
    super.onDestroy();
    if (this.gui) {
      this.gui.destroy();
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

  giveMoney(reward) {
    this.money += reward;
    console.log(`Player money is now: ${this.money}`);
  }

}
