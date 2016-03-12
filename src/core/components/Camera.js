import { Log } from '../Log.js';

import Component from '../Component.js';
import Types from '../Types.js';
import gd from '../drivers/Graphics.js';
import GraphicSystem from '../systems/GraphicSystem.js';

export default class Camera extends Component {

  onCreate() {
    super.onCreate();
    this.createAttribute('backgroundColor', '#fff', Types.String);
    this.createAttribute('width', 1366, Types.Int);
    this.createAttribute('height', 768, Types.Int);
    this.createAttribute('mode', 'letterbox', Types.String);

    this._graphicSystem = this.scene.getSystem(GraphicSystem);


    if (gd.available()) {
      Log.info('Graphics context is available');
      gd.init();
    } else {
      this.disable();
    }
  }

  transformCoordinates(x, y) {
    const f = this.getScalingFactor();
    return {
      x: (x - gd.width / 2) / f + this.transform.x,
      y: (y - gd.height / 2) / f + this.transform.y
    };
  }

  onDestroy() {

  }

  getScalingFactor() {
    if (this.mode === 'letterbox') {
      return Math.min(gd.width/this.width, gd.height/this.height);
    } else if (this.mode === 'crop') {
      return Math.max(gd.width/this.width, gd.height/this.height);
    }
  }

  onUpdate() {
    this._graphicSystem.lastActiveCamera = this;
    // Clear the whole surface before painting entities
    gd.clear(this.backgroundColor);

    gd.ctx.save();

    gd.ctx.translate(gd.width / 2, gd.height / 2);

    // Determine size factor
    var f = this.getScalingFactor();

    gd.ctx.scale(f, f);

    gd.ctx.translate(-this.transform.x, -this.transform.y);

    var sprites = this._graphicSystem.sprites;
    for (const sprite of sprites) {
      sprite.draw(gd.ctx);
    }

    gd.ctx.restore();
  }
}
