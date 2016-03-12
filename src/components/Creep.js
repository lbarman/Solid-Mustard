import Component from 'core/Component.js';
import IASystem from 'systems/IASystem.js';

export default class Creep extends Component {

  onCreate() {
    this.SPEED = 1.0;
    this.life = 10000;
    this.iaSystem = this.scene.getSystem(IASystem);
    this.iaSystem.addCreep(this);
  }

  onUpdate(dt) {
    // Protect agains uninitialized PF
    const pathFinder = this.iaSystem.pathFinder;
    if (pathFinder == null) return;

    if(!this.nextGoal){
      var currentX = Math.round(this.transform.x - 0.5);
      var currentY = Math.round(this.transform.y - 0.5);
      this.nextGoal = pathFinder.nextFrom(currentX, currentY);
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
