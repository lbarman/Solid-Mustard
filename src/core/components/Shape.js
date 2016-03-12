import Types from '../Types.js';
import Sprite from './Sprite.js';


/**
 * Base class for shape sprites
 */
export default class Shape extends Sprite {

  onCreate() {
    super.onCreate();
    this.createAttribute('fillStyle', '#00f', Types.String);
    this.createAttribute('strokeStyle', '#f00', Types.String);
    this.createAttribute('fill', true, Types.Boolean);
    this.createAttribute('stroke', false, Types.Boolean);
  }




  /**
   * traceShape - Trace the shape using ctx.lineTo and co.
   *
   * This method should be overriden by subclasses.
   *
   * @protected
   * @param  {CanvasRenderingContext2D} ctx The context on which to draw
   */
  traceShape(ctx) {}

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.fillStyle;
    ctx.strokeStyle = this.strokeStyle;

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    ctx.beginPath();

    this.traceShape(ctx);

    if (this.fill) ctx.fill();
    if (this.stroke) ctx.stroke();

    ctx.restore();
  }
}
