import Component from 'core/Component.js';
import Text from 'components/Text.js';
import Transform from 'core/components/Transform.js';
import Player from 'components/Player.js';
import TowerSprite from 'components/TowerSprite.js';
import LaserTowerSprite from 'components/LaserTowerSprite.js';
import SniperTowerSprite from 'components/SniperTowerSprite.js';
import TowerComp from 'components/Tower.js';
import LaserTowerComp from 'components/LaserTower.js';
import SniperTowerComp from 'components/SniperTower.js';

import { GUIText, Tower, LaserTower, SniperTower } from 'prefabs.js';

export default class GUI extends Component {

  onCreate() {
    super.onCreate();

    this.nextTower = "blue";


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

    var towerPosX = 12;
    var towerPosY = 9.5;
    var towerSpace = 1.5;

    //red tower
    this.tower1 = this.scene.newPrefab(Tower, this);
    this.tower1.disableNetworking();
    this.tower1Sprite = this.tower1.getComponent(TowerSprite);
    this.tower1Sprite.displayRadius = false;
    this.tower1.getComponent(TowerComp).disable();
    this.tower1.transform.localX = towerPosX;
    this.tower1.transform.localY = towerPosY;
    this.tower1Sprite.enable();

    //purple tower
    this.tower2 = this.scene.newPrefab(SniperTower, this);
    this.tower2.disableNetworking();
    this.tower2Sprite = this.tower2.getComponent(SniperTowerSprite);
    this.tower2Sprite.displayRadius = false;
    this.tower2.getComponent(SniperTowerComp).disable();
    this.tower2.transform.localX = towerPosX + towerSpace;
    this.tower2.transform.localY = towerPosY;
    this.tower2Sprite.enable();
    

    //blue tower
    this.tower3 = this.scene.newPrefab(LaserTower, this);
    this.tower3.disableNetworking();
    this.tower3Sprite = this.tower3.getComponent(LaserTowerSprite);
    this.tower3Sprite.displayRadius = false;
    this.tower3.getComponent(LaserTowerComp).disable();
    this.tower3.transform.localX = towerPosX + 2*towerSpace;
    this.tower3.transform.localY = towerPosY;
    this.tower3Sprite.enable();
    

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
    let absX = (evt.x - this.transform.x);
    let absY = (evt.y - this.transform.y);

    if(absY >= 9.7 && absY <= 10.7)
    {
      if(absX >= 12 && absX <= 13)
      {
        console.log("Tower 1");
        this.nextTower = "red";
      }
      else if(absX >= 13.5 && absX <= 14.5)
      {
        console.log("Tower 2");
        this.nextTower = "purple";
      }
      else if(absX >= 15 && absX <= 16)
      {
        console.log("Tower 3");
        this.nextTower = "blue";
      }
    }
  }
}
