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


    var upgradeColor = "244, 191, 66"
    var upgradePosX = -1
    var upgradePosY = -1

    //body
    ctx.beginPath();
    ctx.fillStyle = `rgba(${upgradeColor}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.moveTo(upgradePosX, upgradePosY);
    ctx.lineTo(upgradePosX + this.width, upgradePosY);
    ctx.lineTo(upgradePosX + this.width, upgradePosY + this.height);
    ctx.lineTo(upgradePosX, upgradePosY + this.height);
    ctx.closePath();
    ctx.fill();

    //stronger border
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${upgradeColor}, 1)`;
    ctx.lineWidth = 0.05;
    ctx.moveTo(upgradePosX, upgradePosY);
    ctx.lineTo(upgradePosX + this.width, upgradePosY);
    ctx.lineTo(upgradePosX + this.width, upgradePosY + this.height);
    ctx.lineTo(upgradePosX, upgradePosY + this.height);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.moveTo(upgradePosX + this.width/2, upgradePosY + 1*this.height/5);
    ctx.lineTo(upgradePosX + 4*this.width/5, upgradePosY + 2.5*this.height/5);
    ctx.lineTo(upgradePosX + 3*this.width/5, upgradePosY + 2.5*this.height/5);
    ctx.lineTo(upgradePosX + 3*this.width/5, upgradePosY + 4*this.height/5);
    ctx.lineTo(upgradePosX + 2*this.width/5, upgradePosY + 4*this.height/5);
    ctx.lineTo(upgradePosX + 2*this.width/5, upgradePosY + 2.5*this.height/5);
    ctx.lineTo(upgradePosX + 1*this.width/5, upgradePosY + 2.5*this.height/5);
    ctx.lineTo(upgradePosX + this.width/2, upgradePosY + 1*this.height/5);
    ctx.closePath();
    ctx.stroke();

    var deleteColor = "244, 75, 66"
    var deletePosX = -1
    var deletePosY = 0.5

    //body
    ctx.beginPath();
    ctx.fillStyle = `rgba(${deleteColor}, 0.3)`;
    ctx.lineWidth = 1;
    ctx.moveTo(deletePosX, deletePosY);
    ctx.lineTo(deletePosX + this.width, deletePosY);
    ctx.lineTo(deletePosX + this.width, deletePosY + this.height);
    ctx.lineTo(deletePosX, deletePosY + this.height);
    ctx.closePath();
    ctx.fill();

    //stronger border
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${deleteColor}, 1)`;
    ctx.lineWidth = 0.05;
    ctx.moveTo(deletePosX, deletePosY);
    ctx.lineTo(deletePosX + this.width, deletePosY);
    ctx.lineTo(deletePosX + this.width, deletePosY + this.height);
    ctx.lineTo(deletePosX, deletePosY + this.height);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.moveTo(deletePosX + 1*this.width/5, deletePosY + 1*this.height/5);
    ctx.lineTo(deletePosX + 4*this.width/5, deletePosY + 4*this.height/5);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.moveTo(deletePosX + 1*this.width/5, deletePosY + 4*this.height/5);
    ctx.lineTo(deletePosX + 4*this.width/5, deletePosY + 1*this.height/5);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = this.fillStyle;
    ctx.font = "1px monospace";
    ctx.fillText(this.text, 0.55, -0.2);

    ctx.font = "0.5px monospace";
    ctx.fillText(this.subtext, 0.7, 0.7);

    ctx.restore();
  }
}
