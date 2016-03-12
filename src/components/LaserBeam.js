import Component from 'core/Component.js';

export default class LaserBeam extends Component {

  onCreate() {
    super.onCreate();

    this.sourceX = 100;
    this.sourceY = 100;
    this.targetX = 500;
    this.targetY = 500;

    this.entity.disableNetworking();
  }

  onDraw(ctx) {
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    ctx.strokeStyle = '#f00'; 
    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(this.sourceX, this.sourceY);
    ctx.lineTo(this.targetX, this.targetY);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}
