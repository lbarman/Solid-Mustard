import Component from 'core/Component.js';

export default class Creep extends Component {


  onCreate() {
    this.SPEED = 1.0;
    this.transform.x = 0;
  }

  onUpdate(dt) {
    this.transform.x += (dt/1000.0)*this.SPEED;
  }
}
