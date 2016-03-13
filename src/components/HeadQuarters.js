import Component from 'core/Component.js';
import Types from 'core/Types.js';


export default class HeadQuarters extends Component {

  onCreate() {
    this.createAttribute('life', 10, Types.Int);
    this.width = 3;
    this.height = 3;
    this.offsetX = -1;
    this.offsetY = -1;
  }

  hit(damage) {
    this.life -= damage;
  }

  onDraw(ctx) {

    //start drawing
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    ctx.beginPath();
    ctx.fillStyle = `rgba(27,161,226, 0.3)`;
    ctx.lineWidth = 1;
    ctx.moveTo(this.offsetX, this.offsetY);
    ctx.lineTo(this.offsetX + this.width, this.offsetY);
    ctx.lineTo(this.offsetX + this.width, this.offsetY + this.height);
    ctx.lineTo(this.offsetX, this.offsetY + this.height);
    ctx.closePath();
    ctx.fill();

    function drawStar(cx,cy,spikes,outerRadius,innerRadius, color){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;

      ctx.fillStyle=color;
      ctx.beginPath();
      ctx.moveTo(cx,cy-outerRadius);
      for(let i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y);
        rot+=step;

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y);
        rot+=step;
      }
      ctx.lineTo(cx,cy-outerRadius);
      ctx.fill();
      ctx.closePath();
    }

    drawStar(0.55,0.6,5,1.5,0.6, "rgba(240,150,9, 0.9)");
    drawStar(0.55,0.6,5,1.4,0.5, "rgba(0,0,0, 1)");
    drawStar(0.55,0.6,5,1.4,0.5, "rgba(27,161,226, 0.6)");


    //stronger border
    ctx.beginPath();
    ctx.strokeStyle = `rgba(27,161,226, 0.4)`;
    ctx.lineWidth = 0.05;
    ctx.moveTo(this.offsetX, this.offsetY);
    ctx.lineTo(this.offsetX + this.width, this.offsetY);
    ctx.lineTo(this.offsetX + this.width, this.offsetY + this.height);
    ctx.lineTo(this.offsetX, this.offsetY + this.height);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}
