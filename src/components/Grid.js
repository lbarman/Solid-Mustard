import Component from 'core/Component.js';
import RPC from 'core/RPC.js';
import { Tower } from 'prefabs.js';
import IASystem from 'systems/IASystem.js';
import PathFinder from 'utils/PathFinder.js';
import TowerSprite from 'components/TowerSprite.js';
import TowerComp from 'components/Tower.js';

export default class Grid extends Component {

  onCreate() {
    super.onCreate();
    this.V_CELLS = 18;
    this.H_CELLS = 32;
    this.start = {x:0, y:4};
    this.end = {x:this.H_CELLS-1, y:12};

    this.cursor = this.scene.newPrefab(Tower);
    this.cursor.disableNetworking();
    const sprite = this.cursor.getComponent(TowerSprite);
    sprite.color = '200, 80, 80';
    sprite.displayRadius = true;
    this.cursor.getComponent(TowerComp).disable();

    this.grid = [];
    for(var x=0; x<this.H_CELLS; x++){
      this.grid[x] = [];
      for(var y=0; y<this.V_CELLS; y++){
        this.grid[x][y] = false;
      }
    }

    var pathFinder = new PathFinder(this.grid, this.start, this.end);
    this.scene.getSystem(IASystem).updatePathFinder(pathFinder);
  }

  onDestroy() {
    super.onDestroy();
    this.cursor.destroy();
  }

  onClick(evt) {
    const pos = this.snapToGrid(evt.x, evt.y);
    this.createTower(pos);
    RPC.call(this, 'createTower', pos);
  }

  onMouseMove(evt) {
    const coords = this.snapToGrid(evt.x, evt.y);
    this.cursor.transform.x = coords.x;
    this.cursor.transform.y = coords.y;
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

    ctx.stroke();
    ctx.restore();
  }
}
