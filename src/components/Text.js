import Sprite from 'core/components/Sprite.js';
import Types from 'core/Types.js';


export default class Text extends Sprite {


  onCreate() {
    super.onCreate();

    this.createAttribute('text', 'Text', Types.String);
    this.createAttribute('fillStyle', '#fff', Types.String);
  }
  draw(ctx) {
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    ctx.fillStyle = this.fillStyle;
    ctx.font = "0.5px monospace";
    ctx.fillText(this.text, 0, 0);

    ctx.restore();
  }
}
