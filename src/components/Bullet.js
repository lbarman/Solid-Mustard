import Pawn from './Pawn.js';
import Component from 'core/Component.js';
import CircleShape from 'core/components/CircleShape.js';

export default class Bullet extends Component {

  onCreate() {
    this.physics.radius = 3;

    const shape = this.getComponent(CircleShape);
    shape.fillStyle = '#ff0';
    shape.fill = true;
    shape.radius = 1.5;
  }

  static get SPEED() {
    return 0.2;
  }


  onCollision(evt) {
    const other = evt.other;
    if (other == null) {
      // If it collided with the wall:

      if (evt.vx !== 0) {
       this.physics.vx = -this.physics.vx;
      } else if (evt.vy !== 0) {
       this.physics.vy = -this.physics.vy;
      }

    } else {
      const pawn = other.getComponent(Pawn);
      if (pawn != null) {
        // If it collided with a pawn, hit the pawn and destroy the bullet
        pawn.hit(this);
        this.destroy();
      }
    }
  }

}
