import Sprite from 'core/components/Sprite.js';
import Tower from 'components/Tower.js';
import Types from 'core/Types.js';


export default class LaserTowerSprite extends Sprite {

  onCreate() {
    super.onCreate();
    this.width = 1;
    this.height = 1;

    this.createAttribute('color', '0,171,169', Types.String);
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

      var centerX = this.width/2;
      var centerY = this.height/2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, this._tower.towerRange, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(${this.color}, 0.1)`;
      ctx.fill();
    }


    ctx.beginPath();

    //red body
    ctx.fillStyle = `rgba(${this.color}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.width, 0);
    ctx.lineTo(0 + this.width, 0 + this.height);
    ctx.lineTo(0, 0 + this.height);
    ctx.closePath();
    ctx.fill();

    //stronger border
    ctx.strokeStyle = `rgba(${this.color}, 1)`;
    ctx.lineWidth = 0.05;
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.width, 0);
    ctx.lineTo(0 + this.width, 0 + this.height);
    ctx.lineTo(0, 0 + this.height);
    ctx.closePath();
    ctx.stroke();

    //inner border
    let i = this.width / 3;

    ctx.strokeStyle = `rgba(${this.color}, 1)`;
    ctx.fillStyle = `rgba(${this.color}, 0.7)`;

    ctx.lineWidth = 0.05;
    ctx.moveTo(this.width/2, i);
    ctx.lineTo(this.width-i, this.height/2);
    ctx.lineTo(this.width/2, this.height -i );
    ctx.lineTo(i, this.height/2);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}
