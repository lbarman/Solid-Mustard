import Component from 'core/Component.js';
import Types from 'core/Types.js';


export default class HeadQuarters extends Component {

  onCreate() {
    this.createAttribute('life', 10, Types.Int);
  }

  hit(damage) {
    this.life -= damage;
  }
}
