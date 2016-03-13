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
    this.playerLife = this.scene.newPrefab(GUIText, this).getComponent(Text);
    this.playerLife.entity.disableNetworking();
    this.playerLife.transform.localX = -15;
    this.playerLife.transform.localY = -10;

    this.player = this.transform.parent.getComponent(Player);
    // This Component is not synchronized so we can do exotic shit in here
    this.playerMoney = this.scene.newPrefab(GUIText, this).getComponent(Text);
    this.playerMoney.entity.disableNetworking();
    this.playerMoney.transform.localX = 12;
    this.playerMoney.transform.localY = -10;

    this.timeBeforeNextWave = this.scene.newPrefab(GUIText, this).getComponent(Text);
    this.timeBeforeNextWave.entity.disableNetworking();
    this.timeBeforeNextWave.transform.localX = -15;
    this.timeBeforeNextWave.transform.localY = 10.5;

    this.updateText();
  }

  onUpdate() {
    this.updateText();
  }

  updateText() {
    
    let builder = "";
    for(let i=0; i<this.player.grid.hq.life; i++)
    {
      builder = builder + "💗";
    }

    this.playerLife.text = builder;
    this.playerMoney.text = `${this.player.money}$`;
    this.timeBeforeNextWave.text = `Next wave in ${Math.floor(this.scene.controller.timeToNextWave / 1000)} sec`;
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
