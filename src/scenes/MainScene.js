import Scene from 'core/Scene.js';

import PhysicSystem from 'core/systems/PhysicSystem.js';
import IASystem from 'systems/IASystem.js';

import { WorldBoundaries, Camera, Grid, Creep} from 'prefabs.js';

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
    this.newPrefab(Grid);
    this.newPrefab(Creep)

  }

}
