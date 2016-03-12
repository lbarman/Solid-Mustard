import Types from '../Types.js';
import Shape from './Shape.js';


/**
 * Circle shape sprite.
 *
 * The circle is centered around `transform` coordinates
 */
export default class CircleShape extends Shape {
  onCreate() {
    super.onCreate();
    this.createAttribute('radius', 20, Types.Float);
  }


  /**
   * Traces a circle shape
   *
   * @protected
   * @param  {CanvasRenderingContext2D} ctx
   */
  traceShape(ctx) {
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
  }
}
