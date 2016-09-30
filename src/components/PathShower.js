import Component from 'core/Component.js';
import Types from 'core/Types.js';


export default class PathShower extends Component {

    onCreate() {
        this.width = 1;
        this.height = 1;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    onDraw(ctx) {

        //start drawing
        ctx.save();

        ctx.translate(this.transform.x, this.transform.y);
        ctx.rotate(this.transform.theta);

        ctx.beginPath();
        ctx.fillStyle = `rgba(27,161,226, 0.3)`;
        ctx.lineWidth = 1;
        ctx.moveTo(0.25, 0.25);
        ctx.lineTo(0.75, 0.25);
        ctx.lineTo(0.75, 0.75);
        ctx.lineTo(0.25, 0.75);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}
