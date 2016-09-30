import Sprite from 'core/components/Sprite.js';
import Types from 'core/Types.js';


export default class TowerInfo extends Sprite {


  onCreate() {
    super.onCreate();

    this.width = 1.00;
    this.height = 1.00;
    this.color = "253, 123, 204"

    this.createAttribute('text', 'Text', Types.String);
    this.createAttribute('subText', 'blablablalblalblablalblabal', Types.String);
    this.createAttribute('fillStyle', '#fff', Types.String);
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


    this.upgradeColor = "244, 191, 66"
    this.upgradePosX = -1
    this.upgradePosY = -1

    this.deleteColor = "244, 75, 66"
    this.deletePosX = -1
    this.deletePosY = 0.5

    /*upgrade*/

    //body
    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.upgradeColor}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.moveTo(this.upgradePosX, this.upgradePosY);
    ctx.lineTo(this.upgradePosX + this.width, this.upgradePosY);
    ctx.lineTo(this.upgradePosX + this.width, this.upgradePosY + this.height);
    ctx.lineTo(this.upgradePosX, this.upgradePosY + this.height);
    ctx.closePath();
    ctx.fill();

    //stronger border
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${this.upgradeColor}, 1)`;
    ctx.lineWidth = 0.05;
    ctx.moveTo(this.upgradePosX, this.upgradePosY);
    ctx.lineTo(this.upgradePosX + this.width, this.upgradePosY);
    ctx.lineTo(this.upgradePosX + this.width, this.upgradePosY + this.height);
    ctx.lineTo(this.upgradePosX, this.upgradePosY + this.height);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.moveTo(this.upgradePosX + this.width/2, this.upgradePosY + 1*this.height/5);
    ctx.lineTo(this.upgradePosX + 4*this.width/5, this.upgradePosY + 2.5*this.height/5);
    ctx.lineTo(this.upgradePosX + 3*this.width/5, this.upgradePosY + 2.5*this.height/5);
    ctx.lineTo(this.upgradePosX + 3*this.width/5, this.upgradePosY + 4*this.height/5);
    ctx.lineTo(this.upgradePosX + 2*this.width/5, this.upgradePosY + 4*this.height/5);
    ctx.lineTo(this.upgradePosX + 2*this.width/5, this.upgradePosY + 2.5*this.height/5);
    ctx.lineTo(this.upgradePosX + 1*this.width/5, this.upgradePosY + 2.5*this.height/5);
    ctx.lineTo(this.upgradePosX + this.width/2, this.upgradePosY + 1*this.height/5);
    ctx.closePath();
    ctx.stroke();

    /* delete */

    //body
    ctx.beginPath();
    ctx.fillStyle = `rgba(${this.deleteColor}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.moveTo(this.deletePosX, this.deletePosY);
    ctx.lineTo(this.deletePosX + this.width, this.deletePosY);
    ctx.lineTo(this.deletePosX + this.width, this.deletePosY + this.height);
    ctx.lineTo(this.deletePosX, this.deletePosY + this.height);
    ctx.closePath();
    ctx.fill();

    //stronger border
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${this.deleteColor}, 1)`;
    ctx.lineWidth = 0.05;
    ctx.moveTo(this.deletePosX, this.deletePosY);
    ctx.lineTo(this.deletePosX + this.width, this.deletePosY);
    ctx.lineTo(this.deletePosX + this.width, this.deletePosY + this.height);
    ctx.lineTo(this.deletePosX, this.deletePosY + this.height);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.moveTo(this.deletePosX + 1*this.width/5, this.deletePosY + 1*this.height/5);
    ctx.lineTo(this.deletePosX + 4*this.width/5, this.deletePosY + 4*this.height/5);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.moveTo(this.deletePosX + 1*this.width/5, this.deletePosY + 4*this.height/5);
    ctx.lineTo(this.deletePosX + 4*this.width/5, this.deletePosY + 1*this.height/5);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = this.fillStyle;
    ctx.font = "1px monospace";
    ctx.fillText(this.text, 0.55, -0.2);

    ctx.font = "0.5px monospace";
    ctx.fillText(this.subtext, 0.7, 0.7);

    ctx.restore();
  }


  onClick(evt) {
    let absX = (evt.x - this.transform.x);
    let absY = (evt.y - this.transform.y);


    if(absX >= this.upgradePosX && absX <= this.upgradePosX + this.width)
    {
      if(absY >= this.upgradePosY && absY <= this.upgradePosY + this.height)
      {
        console.log("Upgrade !")
      }

      if(absY >= this.deletePosY && absY <= this.deletePosY + this.height)
      {
        console.log("Delete !")
      }
    }
  }
}
