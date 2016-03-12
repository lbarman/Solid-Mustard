import Component from 'core/Component.js';
import LaserBeamComp from 'components/LaserBeam.js';
import RectangleShape from 'core/components/RectangleShape.js';

import { LaserBeam } from 'prefabs.js';

export default class Tower extends Component {

  onCreate() {
    this.COOLDOWN = 200;
    this.lastFire = 0;
  }

  fire(x, y) {
    if (Date.now() - this.lastFire > this.COOLDOWN) {
      this.lastFire = Date.now();

      let beam = this.scene.newPrefab(LaserBeam, this.parent);

      beam.getComponent(LaserBeamComp).sourceX = this.transform.x + this.getComponent(RectangleShape).width;
      beam.getComponent(LaserBeamComp).sourceY = this.transform.y + this.getComponent(RectangleShape).height;
      beam.getComponent(LaserBeamComp).targetX = x;
      beam.getComponent(LaserBeamComp).targetY = y;

      return beam;
    }
  }
}
