import Types from '../Types.js';
import Shape from './Shape.js';


/**
 * Rectangle shape sprite.
 *
 * The drawn rectangle has its top-left corner at `transform` coordinates and
 * spans `width` units horizontally and `height` vertically.
 */
export default class RectangleShape extends Shape {

  onCreate() {
    super.onCreate();
    this.createAttribute('width', 10, Types.Float);
    this.createAttribute('height', 10, Types.Float);
  }


  /**
   * Traces a rectangle shape
   *
   * @protected
   * @param  {CanvasRenderingContext2D} ctx
   */
  traceShape(ctx) {
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.width, 0);
    ctx.lineTo(0 + this.width, 0 + this.height);
    ctx.lineTo(0, 0 + this.height);
    ctx.closePath();
  }
}
