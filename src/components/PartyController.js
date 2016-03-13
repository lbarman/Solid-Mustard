import Component from 'core/Component.js';
import Types from 'core/Types.js';

export default class PartyController extends Component {
  onCreate() {
    this.createAttribute('timeToNextWave', 30000, Types.Int);
  }

  onUpdate(dt) {
    this.timeToNextWave -= dt;
    if (this.timeToNextWave < 0) {
      this.timeToNextWave = 30000;
    }
  }
}
