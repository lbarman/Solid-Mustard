import Component from 'core/Component.js';
import Text from 'components/Text.js';
import Transform from 'core/components/Transform.js';
import Player from 'components/Player.js';

import { GUIText } from 'prefabs.js';

export default class GUI extends Component {

  onCreate() {
    super.onCreate();

    this.player = this.transform.parent.getComponent(Player);
    // This Component is not synchronized so we can do exotic shit in here
    this.text = this.scene.newPrefab(GUIText, this).getComponent(Text);
    this.text.entity.disableNetworking();
    this.text.transform.localX = -9;
    this.text.transform.localY = -10;


    this.t_nextWave = this.scene.newPrefab(GUIText, this).getComponent(Text);
    this.t_nextWave.entity.disableNetworking();
    this.t_nextWave.transform.localX = 0;
    this.t_nextWave.transform.localY = -10;

    this.updateText();
  }

  onUpdate() {
    this.updateText();
  }

  updateText() {
    this.text.text = `Life: ${this.player.life}`;
    this.t_nextWave.text = `Next wave in ${Math.floor(this.scene.controller.timeToNextWave / 1000)}`;
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
