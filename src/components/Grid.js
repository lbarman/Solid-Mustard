import GUIComp  from 'components/GUI.js';
import HeadQuartersComp  from 'components/HeadQuarters.js';
import PathFinder  from 'components/PathFinder.js';
import PathShowerComp  from 'components/PathShower.js';
import Component  from 'core/Component.js';
import RPC  from 'core/RPC.js';
import Types  from 'core/Types.js';
import { Tower, SniperTower, LaserTower, HeadQuarters, PathShower } from 'prefabs.js';
import IASystem  from 'systems/IASystem.js';
import Entity  from '../core/Entity.js';

//Towers
import LaserTowerComp  from 'components/Towers/LaserTower.js';
import SniperTowerComp  from 'components/Towers/SniperTower.js';
import TowerComp  from 'components/Towers/Tower.js';

//Towers - Sprites
import TowerSprite  from 'components/Towers/Sprites/TowerSprite.js';

class Grid extends Component {

  onCreate() {
    super.onCreate();

    this.pathShowers = [];

    this.V_CELLS = Grid.V_CELLS;
    this.H_CELLS = Grid.H_CELLS;

    this.cursor = this.scene.newPrefab(Tower);
    this.cursor.disableNetworking();
    this.cursorSprite = this.cursor.getComponent(TowerSprite);
    this.cursorSprite.color = '255, 255, 255';
    this.cursorSprite.displayRadius = true;
    this.cursor.getComponent(TowerComp).disable();

    this.createAttribute('start', {}, Types.Object);
    this.createAttribute('grid_num', -1, Types.Int);
    this.createAttribute('grid', null, Types.Array);
    this.createAttribute('player', null, Types.Component);
    this.createAttribute('hq', null, Types.Component);

    this.grid = [];
    for(var x=0; x<this.H_CELLS; x++){
      this.grid[x] = [];
      for(var y=0; y<this.V_CELLS; y++){
        this.grid[x][y] = false;
      }
    }

    this.hq = this.scene.newPrefab(HeadQuarters, this).getComponent(HeadQuartersComp);
    this.hq.transform.localX = Grid.GOAL.x;
    this.hq.transform.localY = Grid.GOAL.y;

    this.activeCell = null;
    this._pathFinder = this.getComponent(PathFinder);
    this.updatePaths();
  }

  updatePaths() {
    this._pathFinder.update(this.grid, this.start, Grid.GOAL);
    this.scene.getSystem(IASystem).setPathFinder(this._pathFinder, this.grid_num);

    /*
     * Prints the path taken by the creeps
     */

    //remove old path
    for (let ps of this.pathShowers) {
      ps.destroy();
    }
    this.pathShowers = [];

    //print new path, only if well defined
    if (this.start != undefined && this.start.x != undefined && this.start.y != undefined) {
      var x = this.start.x
      var y = this.start.y
      while (x != Grid.GOAL.x || y != Grid.GOAL.y) {

        var a = this.scene.newPrefab(PathShower);
        a.disableNetworking();
        a.getComponent(PathShowerComp).transform.localX = x;
        a.getComponent(PathShowerComp).transform.localY = y;

        this.pathShowers.push(a);

        var newVals = this._pathFinder.nextFrom(x, y)
        x = newVals.x;
        y = newVals.y;
      }
    }
  }

  onDestroy() {
    super.onDestroy();
    this.cursor.destroy();
  }

  onClick(evt) {
    const pos = this.snapToGrid(evt.x - this.transform.x, evt.y);

    if (this.player.gui) {
      pos.type = this.player.gui.getComponent(GUIComp).nextTower;
      this.createTower(pos);
      RPC.call(this, 'createTower', pos);
    }
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

    const actualPos = this.snapToGrid(pos.x, pos.y);
    if( actualPos.x >= 0 && actualPos.x < Grid.H_CELLS &&
        actualPos.y >= 0 && actualPos.y < Grid.V_CELLS &&
        !this.grid[actualPos.x][actualPos.y]){

      // Checking if it would cut the path
      this.grid[actualPos.x][actualPos.y] = true;
      this._pathFinder.update(this.grid, this.start, Grid.GOAL);
      if(!this._pathFinder.doesAnyPathExists()){
        // If we cannot place a tower (unlikely), restore pathfinder and grid
        this.grid[actualPos.x][actualPos.y] = false;
        this._pathFinder.update(this.grid, this.start, Grid.GOAL);
        return;
      }

      // Selecting tower
      let tower = null;
      switch(pos.type) {
        case 'red':
          tower = this.scene.newPrefab(Tower);
          tower.getComponent(TowerComp).player = this.player;
        break;
        case 'purple':
          tower = this.scene.newPrefab(SniperTower);
          tower.getComponent(SniperTowerComp).player = this.player;
        break;
        default:
          console.log(`Warning: invalid tower type ${pos.type}, using default`);
          /* falls through */
        case 'blue':
          tower = this.scene.newPrefab(LaserTower);
          tower.getComponent(LaserTowerComp).player = this.player;
        break;
      }

      tower.transform.x = actualPos.x + this.transform.x;
      tower.transform.y = actualPos.y;

      this.updatePaths();
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
Grid.GOAL = {x:Grid.H_CELLS-3, y:12};

export default Grid;
