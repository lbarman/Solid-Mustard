import System from 'core/System.js';

export default class IASystem extends System {

  constructor() {
    super();
    this.creeps = [];
  }

  addCreep(creep) {
    this.creeps.push(creep);
  }

  removeCreep(creep) {
    var pos = this.creeps.indexOf(creep);
    if(pos > 0){
      this.creeps = this.creeps.splice(pos, 1);
    }
  }

  updateGrid(newGrid){
    this.grid = newGrid;
  }
}
