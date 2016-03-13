import Component from 'core/Component.js';
import Types from 'core/Types.js';

import { Creep } from 'components/Creep.js';

export default class PartyController extends Component {
  onCreate() {
    this.createAttribute('timeToNextWave', 5000, Types.Int);
  }

  onUpdate(dt) {
    this.timeToNextWave -= dt;
    if (this.timeToNextWave < 0) {
      this.timeToNextWave = 5000;
      this.scene.spawnCreeps();
    }

  }
}
