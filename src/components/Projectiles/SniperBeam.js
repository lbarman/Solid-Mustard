import Component from 'core/Component.js';

import Types from 'core/Types.js';

export default class SniperBeam extends Component {

  onCreate() {
    super.onCreate();

    this.DESTROY_IN_CONST = 600;
    this.createAttribute('destroyIn', this.DESTROY_IN_CONST, Types.Int);
    this.createAttribute('risingAlpha', true, Types.Boolean);
    this.createAttribute('alpha', 0.5, Types.Float);
    this.createAttribute('sourceX', 0, Types.Float);
    this.createAttribute('sourceY', 0, Types.Float);
    this.createAttribute('targetX', 0, Types.Float);
    this.createAttribute('targetY', 0, Types.Float);

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
        this.alpha = 1;
        this.risingAlpha = false;
      }
    }
    else
    {
      const ratio = ((this.destroyIn)  / this.DESTROY_IN_CONST);
      this.alpha = ratio * ratio;
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
