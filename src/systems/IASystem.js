import System from 'core/System.js';

export default class IASystem extends System {

  constructor() {
    super();
    this.creeps = [];
    this._pathFinders = {};
  }

  addCreep(creep) {
    this.creeps.push(creep);
  }

  removeCreep(creep) {
    var pos = this.creeps.indexOf(creep);
    if(pos >= 0){
      this.creeps = this.creeps.splice(pos, 1);
    }
  }

  setPathFinder(pathFinder, map_num){
    this._pathFinders[map_num] = pathFinder;
  }

  getPathFinder(map_num) {
    return this._pathFinders[map_num];
  }

  getClosestCreep(transform) {

    var closest = null;
    var closestDist = Infinity;
    for (let creep of this.creeps) {
      const d = creep.transform.distanceTo(transform);
      if (d < closestDist) {
        closestDist = d;
        closest = creep;
      }
    }
    return closest;
  }
}
