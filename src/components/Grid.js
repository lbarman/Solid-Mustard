import Component from 'core/Component.js';
import RPC from 'core/RPC.js';
import { Tower, SniperTower, LaserTower, HeadQuarters } from 'prefabs.js';
import IASystem from 'systems/IASystem.js';
import PathFinder from 'utils/PathFinder.js';
import TowerSprite from 'components/TowerSprite.js';
import TowerComp from 'components/Tower.js';
import SniperTowerComp from 'components/SniperTower.js';
import LaserTowerComp from 'components/LaserTower.js';
import GUIComp from 'components/GUI.js';
import Types from 'core/Types.js';

import Player from 'components/Player.js';

import HeadQuartersComp from 'components/HeadQuarters.js';

class Grid extends Component {

  onCreate() {

    super.onCreate();
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
    this.createAttribute('player', null, Types.Component(Player));
    this.createAttribute('hq', null, Types.Component(HeadQuartersComp));

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
    this.updatePaths();
  }

  updatePaths(){
    var pathFinder = new PathFinder(this.grid, this.start, Grid.GOAL);
    this.scene.getSystem(IASystem).setPathFinder(pathFinder, this.grid_num);
  }

  onDestroy() {
    super.onDestroy();
    this.cursor.destroy();
  }

  onClick(evt) {
    const pos = this.snapToGrid(evt.x - this.transform.x, evt.y);
    pos.type = this.player.gui.getComponent(GUIComp).nextTower;
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

    const actualPos = this.snapToGrid(pos.x, pos.y);
    if( actualPos.x >= 0 && actualPos.x < Grid.H_CELLS &&
        actualPos.y >= 0 && actualPos.y < Grid.V_CELLS &&
        !this.grid[actualPos.x][actualPos.y]){

      var testPaths = new PathFinder(this.grid, this.start, Grid.GOAL);
      if(testPaths.doesAnyPathExists()){

        let tower = null;

        if(pos.type == "red") {
          tower = this.scene.newPrefab(Tower);
          tower.getComponent(TowerComp).player = this.player;
        }
        else if(pos.type == "purple") {
          tower = this.scene.newPrefab(SniperTower);
          tower.getComponent(SniperTowerComp).player = this.player;
        }
        else if(pos.type == "blue") {
          tower = this.scene.newPrefab(LaserTower);
          tower.getComponent(LaserTowerComp).player = this.player;
        }

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
Grid.GOAL = {x:Grid.H_CELLS-3, y:12};

export default Grid;
