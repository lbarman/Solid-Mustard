import { Log } from '../Log.js';

import Component from '../Component.js';
import Types from '../Types.js';
import gd from '../drivers/Graphics.js';
import GraphicSystem from '../systems/GraphicSystem.js';

export default class Camera extends Component {

  onCreate() {
    this.createAttribute('backgroundColor', '#fff', Types.String);
    this.createAttribute('width', 1366, Types.Int);
    this.createAttribute('height', 768, Types.Int);

    if (gd.available()) {
      Log.info('Graphics context is available');
      gd.init();
    } else {
      this.disable();
    }
  }

  onDestroy() {

  }

  onUpdate() {
    // Clear the whole surface before painting entities
    gd.clear(this.backgroundColor);

    gd.ctx.save();
    // TODO: Center camera
    gd.ctx.translate(this.width / 2 - this.transform.x, this.height / 2 - this.transform.y);

    // Determine size factor
    var f = Math.max(gd.width/this.width, gd.height/this.height);
    gd.ctx.scale(f, f);

    var sprites = this.scene.getSystem(GraphicSystem).sprites;
    for (const sprite of sprites) {
      sprite.draw(gd.ctx);
    }
    gd.ctx.restore();
  }
}
