import Component from 'core/Component.js';
import RPC from 'core/RPC.js';
import { Tower } from 'prefabs.js';
import IASystem from 'system/IASystem.js';
import PathFinder from 'utils/PathFinder.js';

export default class Grid extends Component {

  onCreate() {
    super.onCreate();
    this.V_CELLS = 18;
    this.H_CELLS = 32;
    this.start = {x:0, y:4};
    this.end = {x:this.H_CELLS, y:0};

    this.grid = [];
    for(var x=0; x<this.H_CELLS; x++){
      this.grid[x] = [];
    }

    this.activeCell = null;
    var pathFinder = new PathFinder(this.grid, this.start, this.end);
    this.scene.getSystem(IASystem).updatePathFinder(pathFinder);
  }

  onClick(evt) {
    const pos = this.snapToGrid(evt.x, evt.y);
    this.createTower(pos);
    RPC.call(this, 'createTower', pos);
  }

  onMouseMove(evt) {
    this.activeCell = this.snapToGrid(evt.x, evt.y);
  }

  snapToGrid(x, y) {
    return {
      x: Math.floor(x),
      y: Math.floor(y)
    };
  }

  createTower(pos) {
    const actualPos = this.snapToGrid(pos.x, pos.y);
    const tower = this.scene.newPrefab(Tower);
    tower.transform.x = actualPos.x;
    tower.transform.y = actualPos.y;
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

    if (this.activeCell !== null) {
      ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
      ctx.fillRect(this.activeCell.x, this.activeCell.y, 1, 1);
    }

    ctx.stroke();
    ctx.restore();
  }
}
