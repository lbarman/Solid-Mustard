import Scene from 'core/Scene.js';

import PhysicSystem from 'core/systems/PhysicSystem.js';
import IASystem from 'systems/IASystem.js';

import { Creep, Grid } from 'prefabs.js';

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

    this._grids = [];
  }

  /**
   * Allocates a new grid in the scene, appending it to the right of the last player.
   * Returns the `Grid` component attached to the newly created grid.
   */
  makeGrid() {

    const grid = this.newPrefab(Grid);
    const gridComp = grid.getComponent(GridComp);
    grid.transform.x = gridComp.H_CELLS * this._grids.length;

    gridComp.start = {x:0, y:4};
    gridComp.end = {x:gridComp.H_CELLS-1, y:12};
    gridComp.updatePaths();

    var creepEnt = this.newPrefab(Creep);
    creepEnt.transform.x = gridComp.start.x + 0.5;
    creepEnt.transform.y = gridComp.start.y + 0.5;

    return gridComp;
  }

}
