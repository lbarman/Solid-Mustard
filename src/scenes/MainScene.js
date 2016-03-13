import Scene from 'core/Scene.js';
import Types from 'core/Types.js';

import PartyController from 'components/PartyController.js';
import PhysicSystem from 'core/systems/PhysicSystem.js';
import IASystem from 'systems/IASystem.js';

import { Creep, Grid, Controller } from 'prefabs.js';

import GridComp from 'components/Grid.js';

export default class MainScene extends Scene {

  onCreate() {
    super.onCreate();

    const physics = new PhysicSystem();
    this.addSystem(physics);

    const ia = new IASystem();
    this.addSystem(ia);

    this.createAttribute('controller', null, Types.Component(PartyController));
    this.controller = this.newPrefab(Controller).getComponent(PartyController);

    this._grids = [];
  }

  /**
   * Allocates a new grid in the scene, appending it to the right of the last player.
   * Returns the `Grid` component attached to the newly created grid.
   */
  makeGrid() {
    const grid = this.newPrefab(Grid).getComponent(GridComp);
    grid.grid_num = this._grids.length;
    grid.transform.x = grid.H_CELLS * grid.grid_num;

    grid.start = {x:0, y:4};
    grid.updatePaths();


    this._grids.push(grid);

    return grid;
  }

  spawnCreeps() {
    for (let g of this._grids) {
      var creepEnt = this.newPrefab(Creep);
      creepEnt.transform.x = g.transform.x + g.start.x + 0.5;
      creepEnt.transform.y = g.transform.y + g.start.y + 0.5;
    }
  }

}
