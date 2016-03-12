import Component from 'core/Component.js';
import RPC from 'core/RPC.js';
import { Tower } from 'prefabs.js';
import IASystem from 'systems/IASystem.js';
import PathFinder from 'utils/PathFinder.js';
import TowerSprite from 'components/TowerSprite.js';
import TowerComp from 'components/Tower.js';
import Types from 'core/Types.js';

class Grid extends Component {

  onCreate() {
    super.onCreate();
    this.V_CELLS = Grid.V_CELLS;
    this.H_CELLS = Grid.H_CELLS;

    this.cursor = this.scene.newPrefab(Tower);
    this.cursor.disableNetworking();
    this.cursorSprite = this.cursor.getComponent(TowerSprite);
    this.cursorSprite.color = '25, 225, 25';
    this.cursorSprite.displayRadius = true;
    this.cursor.getComponent(TowerComp).disable();

    this.createAttribute('start', {}, Types.Object);
    this.createAttribute('end', {}, Types.Object);
    this.createAttribute('grid_num', -1, Types.Int);
    this.createAttribute('grid', null, Types.Array);

    this.grid = [];
    for(var x=0; x<this.H_CELLS; x++){
      this.grid[x] = [];
      for(var y=0; y<this.V_CELLS; y++){
        this.grid[x][y] = false;
      }
    }

    this.activeCell = null;
  }

  updatePaths(){
    var pathFinder = new PathFinder(this.grid, this.start, this.end);
    this.scene.getSystem(IASystem).setPathFinder(pathFinder, this.grid_num);
  }

  onDestroy() {
    super.onDestroy();
    this.cursor.destroy();
  }

  onClick(evt) {
    const pos = this.snapToGrid(evt.x - this.transform.x, evt.y);
    this.createTower(pos);
    RPC.call(this, 'createTower', pos);
  }

  onMouseMove(evt) {
    const pos = this.snapToGrid(evt.x - this.transform.x, evt.y);

    if( pos.x >= 0 && pos.x < Grid.H_CELLS &&
        pos.y >= 0 && pos.y < Grid.V_CELLS) {

      this.cursor.transform.x = pos.x + this.transform.x;
      this.cursor.transform.y = pos.y;

      if (this.grid[pos.x][pos.y]){
        this.cursorSprite.color = '225, 0, 0';
      } else {
        this.cursorSprite.color = '0, 255, 0';
      }

      this.cursorSprite.enable();
    } else {
      this.cursorSprite.disable();
    }
  }

  snapToGrid(x, y) {
    return {
      x: Math.floor(x),
      y: Math.floor(y)
    };
  }

  createTower(pos) {

    if( pos.x >= 0 && pos.x < Grid.H_CELLS &&
        pos.y >= 0 && pos.y < Grid.V_CELLS &&
        !this.grid[pos.x][pos.y]){

      console.log('Creating tower at '+pos.x+ 'on grid '+this.grid_num);
      const actualPos = this.snapToGrid(pos.x, pos.y);
      var testPaths = new PathFinder(this.grid, this.start, this.end);
      if(testPaths.doesAnyPathExists()){
        const tower = this.scene.newPrefab(Tower);
        tower.transform.x = actualPos.x + this.transform.x;
        tower.transform.y = actualPos.y;
        this.grid[actualPos.x][actualPos.y] = true;
        this.updatePaths();
      }
    }
  }

  onDraw(ctx) {
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);

    ctx.beginPath();
    ctx.lineWidth = 0.05;
    ctx.strokeStyle = '#333';
    // ctx.setLineDash([0.1]); // Makes everything lagg like hell

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

Grid.V_CELLS = 18;
Grid.H_CELLS = 32;

export default Grid;
