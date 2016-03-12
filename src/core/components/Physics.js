import { Log } from '../Log.js';
import Component from '../Component.js';
import Types from '../Types.js';
import PhysicSystem from '../systems/PhysicSystem.js';

export default class Physics extends Component {

  onCreate() {
    super.onCreate();
    this.createAttribute('vx', 0, Types.Float);
    this.createAttribute('vy', 0, Types.Float);
    this.createAttribute('vtheta', 0, Types.Float);
    // Only round shapes for now
    this.createAttribute('radius', 0, Types.Float);

    this._physicsSystem = this.scene.getSystem(PhysicSystem);
    this._physicsSystem.addObject(this);
  }

  onDestroy() {
    super.onDestroy();
    this._physicsSystem.removeObject(this);
  }
}
