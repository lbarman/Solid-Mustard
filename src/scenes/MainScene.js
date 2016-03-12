import Scene from 'core/Scene.js';

import PhysicSystem from 'core/systems/PhysicSystem.js';

import { WorldBoundaries, Camera } from 'prefabs.js';

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

    this.newPrefab(WorldBoundaries);
    this.newPrefab(Camera);

  }

}
