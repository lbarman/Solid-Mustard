import Types from '../Types.js';
import Component from '../Component.js';


/**
 * Defines a world transformation with (`x`, `y`) coordinates and an angle `theta`
 */
export default class Transform extends Component {

  onCreate() {
    this.createAttribute('x', 0, Types.Int);
    this.createAttribute('y', 0, Types.Int);
    this.createAttribute('theta', 0, Types.Int);
  }


  /**
   * Computes the distance to another transformation.
   *
   * @param  {Transform} other
   * @return {number} The absolute distance from this transform to other
   */
  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx*dx+dy*dy);
  }
}
