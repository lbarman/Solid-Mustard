import Component from 'core/Component.js';

export default class SniperBeam extends Component {

  onCreate() {
    super.onCreate();

    this.sourceX = 100;
    this.sourceY = 100;
    this.targetX = 500;
    this.targetY = 500;

    this.DESTROY_IN_CONST = 600;
    this.destroyIn = this.DESTROY_IN_CONST;
    this.risingAlpha = true;
    this.alpha = 0.5;

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
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    if(this.risingAlpha){
      this.alpha += 0.3;

      if(this.alpha >= 1) {
        this.risingAlpha = false;
      }
    }
    else
    {
      this.alpha = 0.5 + ((0.0 + this.destroyIn)  / this.DESTROY_IN_CONST);
    }

    ctx.strokeStyle = 'rgba(162,0,255, '+this.alpha+')'; 
    ctx.lineWidth = 0.1;

    ctx.beginPath();

    ctx.moveTo(this.sourceX, this.sourceY);
    ctx.lineTo(this.targetX, this.targetY);
    ctx.closePath(); 
    ctx.stroke();

    ctx.restore();
  }
}
