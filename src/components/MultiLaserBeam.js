import Component from 'core/Component.js';

export default class MultiLaserBeam extends Component {

  onCreate() {
    super.onCreate();

    this.DENSITY = 5;
    this.COLOR = '0,171,169';

    this.sourceX = 100;
    this.sourceY = 100;

    this.targetCreep = null;

    this.destroyIn = 2000;

    this.entity.disableNetworking();
  }

  onUpdate(dt) {
  	//prepare for remove
  	this.destroyIn -= dt;
  	if(this.destroyIn < 0)
  	{
  		this.destroy();
  	}
  }


  onDraw(ctx) {

    if(this.targetCreep == null) {
      return;
    }
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    ctx.strokeStyle = 'rgb('+this.COLOR+')'; 
    ctx.lineWidth = 0.2;

    ctx.beginPath();
    ctx.moveTo(this.sourceX, this.sourceY);
    ctx.lineTo(this.targetCreep.transform.x, this.targetCreep.transform.y);
    ctx.closePath();
    ctx.stroke();


    ctx.lineWidth = 0.1;


    let dirX = (this.targetCreep.transform.x - this.sourceX);
    let dirY = (this.targetCreep.transform.y - this.sourceY);

    let orthX = dirY;
    let orthY = -dirX;

    let length = Math.sqrt(Math.pow(dirX, 2) + Math.pow(dirY, 2));
    let orthNormX = orthX / length;
    let orthNormY = orthY / length;

    for(let i = 0; i < this.DENSITY; i++){

      ctx.strokeStyle = 'rgba('+this.COLOR+', '+Math.random()+')'; 

      ctx.beginPath();
      ctx.moveTo(this.sourceX, this.sourceY);

      let x = this.targetCreep.transform.x;
      let y = this.targetCreep.transform.y;

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
