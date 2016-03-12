import Component from 'core/Component.js';
import IASystem from 'system/IASystem.js';

export default class Creep extends Component {

  onCreate() {
    this.SPEED = 1.0;
    this.transform.x = 0;
    this.iaSystem = this.scene.getSystem(IASystem);
    this.iaSystem.addCreep(this);
  }

  onUpdate(dt) {
    this.transform.x += (dt/1000.0)*this.SPEED;
  }

  onDestroy(){
    this.iaSystem.removeCreep(this);
  }
}
