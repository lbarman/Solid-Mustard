import RawSprite from 'core/components/RawSprite.js';
import Types from 'core/Types.js';


export default class TowerSprite extends RawSprite {

  onCreate() {
    super.onCreate();
    this.width = 1;
    this.height = 1;

    this.createAttribute('color', '255, 0, 0', Types.String);
  }

  onDraw(ctx) {

    //start drawing
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);


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

    //black border
    let i = this.width / 3;

    ctx.strokeStyle = `rgba(${this.color}, 1)`;
    ctx.fillStyle = `rgba(${this.color}, 0.7)`;

    ctx.lineWidth = 0.05;
    ctx.moveTo(i, i);
    ctx.lineTo(this.width-i, i);
    ctx.lineTo(0 + this.width - i, 0 + this.height - i);
    ctx.lineTo(0+i, 0 + this.height -i);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}
