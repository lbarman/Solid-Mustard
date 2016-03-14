import Component from 'core/Component.js';
import Types from 'core/Types.js';

import { Creep } from 'components/Creep.js';
import game from 'core/Game.js';

const n_creeps = 5;
const delay_creeps = 400;
const wave_time = 5000;

export default class PartyController extends Component {
  onCreate() {
    this.createAttribute('timeToNextWave', wave_time, Types.Int);
    this.createAttribute('timeToNextCreep', 0, Types.Int);
    this.createAttribute('creepsSpawned', 0, Types.Int);
  }

  onUpdate(dt) {
    this.timeToNextWave -= dt;
    if (this.timeToNextWave < 0) {
      this.timeToNextCreep -= dt;
      if (this.timeToNextCreep < 0) {
        this.scene.spawnCreeps();
        this.timeToNextCreep = delay_creeps;
        this.creepsSpawned++;
      }
      if (this.creepsSpawned >= n_creeps) {
        this.timeToNextWave = wave_time;
        this.creepsSpawned = 0;
        this.timeToNextCreep = 0;
      }
    }

  }
}
