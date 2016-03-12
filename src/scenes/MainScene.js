import Scene from 'core/Scene.js';

import PhysicSystem from 'core/systems/PhysicSystem.js';
import IASystem from 'systems/IASystem.js';

import { WorldBoundaries, Camera, Grid, Creep} from 'prefabs.js';
import GridComp from 'components/Grid.js';

export default class MainScene extends Scene {

  onCreate() {
    super.onCreate();

    const physics = new PhysicSystem();
    physics.boundaries = {
      left: 0,
      right: 800,
      top: 0,
      bottom: 600
    };
    this.addSystem(physics);

    const ia = new IASystem();
    this.addSystem(ia);

    this.newPrefab(WorldBoundaries);
    this.newPrefab(Camera);
    var grid = this.newPrefab(Grid).getComponent(GridComp);
    grid.start = {x:0, y:4};
    grid.end = {x:grid.H_CELLS-1, y:12};
    grid.updatePaths();

    var creepEnt = this.newPrefab(Creep);
    creepEnt.transform.x = grid.start.x + 0.5;
    creepEnt.transform.y = grid.start.y + 0.5;
  }

}
