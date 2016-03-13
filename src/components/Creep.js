import Component from 'core/Component.js';
import IASystem from 'systems/IASystem.js';
import Grid from 'components/Grid.js';
import Types from 'core/Types.js';

export default class Creep extends Component {

  onCreate() {
    this.SPEED = 2.0;
    this.life = 2000;
    this.iaSystem = this.scene.getSystem(IASystem);
    this.iaSystem.addCreep(this);

    this.createAttribute('damage', 1, Types.Int);
  }

  getGridNum() {
    return Math.floor(this.transform.x / Grid.H_CELLS);
  }

  getGridCoords() {
    return {
      x: Math.round(this.transform.x - 0.5) % Grid.H_CELLS,
      y: Math.round(this.transform.y - 0.5)
    };
  }

  onUpdate(dt) {
    const gridNum = this.getGridNum();
    const pathFinder = this.iaSystem.getPathFinder(gridNum);
    // Protect agains uninitialized PF
    if (pathFinder == null) return;

    if(!this.nextGoal){
      var current = this.getGridCoords();
      this.nextGoal = pathFinder.nextFrom(current.x, current.y);
      this.nextGoal.x += gridNum * Grid.H_CELLS;
    }
    var dx = this.nextGoal.x + 0.5 - this.transform.x;
    var dy = this.nextGoal.y + 0.5 - this.transform.y;
    var distToGoal = Math.sqrt(dx*dx + dy*dy);
    var move = (dt/1000.0)*this.SPEED;
    if (distToGoal > 0) {
      dx = move*dx/distToGoal;
      dy = move*dy/distToGoal;
    }
    this.transform.x += dx;
    this.transform.y += dy;
    if(distToGoal < move){
      var end = pathFinder.end;
      if(this.nextGoal.x == end.x && this.nextGoal.y == end.y){
        this.destroy();
      }
      this.nextGoal = undefined;
    }
  }

  onDestroy(){
    this.iaSystem.removeCreep(this);
  }

  decreaseLife(amount){
    this.life -= amount;
    if(this.life < 0){
      this.destroy();
    }
  }
}
