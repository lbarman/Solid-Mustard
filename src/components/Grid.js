import Component from 'core/Component.js';
import RPC from 'core/RPC.js';
import { Tower } from 'prefabs.js';

export default class Grid extends Component {

  onCreate() {
    super.onCreate();
    this.V_CELLS = 18;
    this.H_CELLS = 32;
    this.grid = [];
    for(var x=0; x<this.H_CELLS; x++){
      this.grid[x] = [];
    }
  }

  onClick(evt) {
    RPC.call(this, 'createTower', {x: evt.x, y: evt.y});
  }

  createTower(pos) {
    const tower = this.scene.newPrefab(Tower);
    tower.transform.x = pos.x;
    tower.transform.y = pos.y;
  }

  onDraw(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = '#333';
    ctx.setLineDash([0.1]);

    for (let i = 0 ; i < this.H_CELLS + 1 ; i++) {
        ctx.moveTo(i,0);
        ctx.lineTo(i, this.V_CELLS);
    }
    for (let i = 0 ; i < this.V_CELLS + 1; i++) {
      ctx.moveTo(0,i);
      ctx.lineTo(this.H_CELLS, i);
    }

    ctx.stroke();
    ctx.restore();
  }
}
