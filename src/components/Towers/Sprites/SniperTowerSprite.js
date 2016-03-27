import Sprite from 'core/components/Sprite.js';
import Tower from 'components/Towers/Tower.js';
import Types from 'core/Types.js';


export default class SniperTowerSprite extends Sprite {

  onCreate() {
    super.onCreate();
    this.width = 1;
    this.height = 1;

    this.createAttribute('color', '162,0,255', Types.String);
    this.createAttribute('displayRadius', false, Types.Boolean);
    this._tower = this.getComponent(Tower);
  }

  draw(ctx) {
    //start drawing
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    //radius
    if(this.displayRadius) {

      let centerX = this.width/2;
      let centerY = this.height/2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, this._tower.towerRange, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(${this.color}, 0.1)`;
      ctx.fill();
      ctx.closePath();
    }



    //red body
    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.color}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.width, 0);
    ctx.lineTo(0 + this.width, 0 + this.height);
    ctx.lineTo(0, 0 + this.height);
    ctx.closePath();
    ctx.fill();

    //stronger border
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${this.color}, 1)`;
    ctx.lineWidth = 0.05;
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.width, 0);
    ctx.lineTo(0 + this.width, 0 + this.height);
    ctx.lineTo(0, 0 + this.height);
    ctx.closePath();
    ctx.stroke();

    let centerX = this.width/2;
    let centerY = this.height/2;

    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.color}, 0.3)`;
    ctx.arc(centerX, centerY, 0.2, 0, 2 * Math.PI, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.moveTo(this.width/2, this.width/5);
    ctx.lineTo(this.height/2, 4*this.height/5);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.moveTo(this.width/5, this.width/2);
    ctx.lineTo(4*this.height/5, this.height/2);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}
