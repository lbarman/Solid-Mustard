import Component  from '../Component.js';
import Types  from '../Types.js';

/**
 * Defines a world transformation with (`x`, `y`) coordinates and an angle `theta`
 */
export default class Transform extends Component {

  onCreate() {
    this.createAttribute('localX', 0, Types.Int);
    this.createAttribute('localY', 0, Types.Int);
    this.createAttribute('localTheta', 0, Types.Int);
    this.createAttribute('parent', null, Types.Component);
  }

  get x() {
    return this.localX + ((this.parent != null) ? this.parent.x : 0);
  }

  set x(x) {
    this.localX = x - ((this.parent != null) ? this.parent.x : 0);
  }

  get y() {
    return this.localY + ((this.parent != null) ? this.parent.y : 0);
  }

  set y(y) {
    this.localY = y - ((this.parent != null) ? this.parent.y : 0);
  }

  get theta() {
    return this.localTheta + ((this.parent != null) ? this.parent.theta : 0);
  }

  set theta(theta) {
    this.localTheta = theta - ((this.parent != null) ? this.parent.theta : 0);
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
