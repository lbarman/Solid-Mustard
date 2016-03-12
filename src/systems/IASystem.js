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

  updatePathFinder(pathFinder){
    console.log("hops", JSON.stringify(this.pathFinder && this.pathFinder.nextHop) == JSON.stringify(pathFinder.nextHop))
    this.pathFinder = pathFinder;
  }

  getClosestCreep(x, y) {

    if(this.creeps.length > 0)
    {
      return this.creeps[0];
    }
    return null;
  }
}
