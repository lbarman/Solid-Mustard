import Component from 'core/Component.js';
import Types from 'core/Types.js';

import Creep from 'components/Creep.js';
import Player from 'components/Player.js';

class Bullet extends Component {

  onCreate() {
    this.createAttribute('life', 2000, Types.Int);
    this.createAttribute('damage', 20, Types.Int);
    this.createAttribute('player', null, Types.Component(Player));
  }

  onCollision(evt) {
    const creep = evt.other.getComponent(Creep);

    if (creep != null) {
      creep.decreaseLife(this.damage, this.player);
      this.destroy();
    }
  }

  onUpdate(dt) {
    if ((this.life -= dt) < 0) {
      this.destroy();
    }
  }

}

Bullet.SPEED = 0.005;

export default Bullet;
