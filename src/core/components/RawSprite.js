import Types from '../Types.js';
import Sprite from './Sprite.js';


/**
 * Component for custom graphics.
 *
 * When an entity has a RawSprite component attached, it reveives `onDraw(ctx)` events.
 *
 * `onDraw(ctx)` has the same semantics as {@link Sprite#draw}.
 */
export default class RawSprite extends Sprite {

  draw(ctx) {
    this.entity.triggerEvent('draw', ctx);
  }
}
