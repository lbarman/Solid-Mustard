import Component from 'core/Component.js';
import Text from 'components/Text.js';
import Transform from 'core/components/Transform.js';
import Player from 'components/Player.js';

export default class GUI extends Component {

  onCreate() {
    super.onCreate();

    this.player = this.transform.parent.getComponent(Player);
    // This Component is not synchronized so we can do exotic shit in here
    this.text = this.scene.newEntityWithComponents([Transform, Text], this).getComponent(Text);
    this.text.entity.disableNetworking();
    this.text.transform.localX = -9;
    this.text.transform.localY = -10;

    this.updateText();
  }

  onUpdate() {
    this.updateText();
  }

  updateText() {
    this.text.text = `Life: ${this.player.life}`;
  }

  onDraw(ctx) {
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);

    // ctx.fillStyle = '#fff';
    // ctx.fillRect(0, 0, 1, 1);

    ctx.restore();
  }

  onClick(evt) {
    console.log(evt);
  }
}
