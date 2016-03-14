import Component from 'core/Component.js';
import Creep from 'components/Creep.js';
import Player from 'components/Player.js';
import Types from 'core/Types.js';

export default class MultiLaserBeam extends Component {

  onCreate() {
    super.onCreate();

    this.DENSITY = 5;
    this.COLOR = '0,171,169';

    this.createAttribute('target', null, Types.Component(Creep));
    this.createAttribute('damage', 0, Types.Int);
    this.createAttribute('player', null, Types.Component(Player));
    this.createAttribute('destroyIn', 1000, Types.Int);
    this.createAttribute('sourceX', 0, Types.Float);
    this.createAttribute('sourceY', 0, Types.Float);

    this.entity.disableNetworking();
  }

  onUpdate(dt) {
    if (this.target == null) {
      this.destroy();
    } else {
      //prepare for remove
      this.destroyIn -= dt;
      if(this.destroyIn < 0)
      {
        this.target.decreaseLife(this.damage, this.player);
        this.destroy();
      }
    }
  }


  onDraw(ctx) {

    if(this.target == null) {
      return;
    }
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    ctx.strokeStyle = 'rgb('+this.COLOR+')';
    ctx.lineWidth = 0.2;

    ctx.beginPath();
    ctx.moveTo(this.sourceX, this.sourceY);
    ctx.lineTo(this.target.transform.x, this.target.transform.y);
    ctx.closePath();
    ctx.stroke();


    ctx.lineWidth = 0.1;


    let dirX = (this.target.transform.x - this.sourceX);
    let dirY = (this.target.transform.y - this.sourceY);

    let orthX = dirY;
    let orthY = -dirX;

    let length = Math.sqrt(Math.pow(dirX, 2) + Math.pow(dirY, 2));
    let orthNormX = orthX / length;
    let orthNormY = orthY / length;

    for(let i = 0; i < this.DENSITY; i++){

      ctx.strokeStyle = 'rgba('+this.COLOR+', '+Math.random()+')';

      ctx.beginPath();
      ctx.moveTo(this.sourceX, this.sourceY);

      let x = this.target.transform.x;
      let y = this.target.transform.y;

      let px1 = x - 3*dirX/4 + orthNormX * (Math.random() - 0.5);
      let py1 = y - 3*dirY/4 + orthNormY * (Math.random() - 0.5);

      let px2 = x - dirX/4 - orthNormX * (Math.random() - 0.5);
      let py2 = y - dirY/4 - orthNormY * (Math.random() - 0.5);

      ctx.bezierCurveTo(px1, py1, px2, py2, x, y);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  }
}
