import Entity from './Entity.js';
import game from './Game.js';
import { Log } from './Log.js';

export default class GameModel {

  constructor(scene) {
    this._scene = scene;
    this._entities = {};
    this._targetState = null;
  }

  /*
   * Inserts an entity into this model
   */
  addEntity(entity) {
    this._entities[entity.id] = entity;
  }

  removeEntity(entity) {
    delete this._entities[entity.id];
  }

  get entities() {
    return this._entities;
  }

  getEntity(id) {
    return this._entities[id] || null;
  }

  /*
   * Returns a serializable representation of this model at this moment
   */
  takeSnapshot() {
    const snap = {};
    for (const i of Object.keys(this._entities)) {
      const ent = this._entities[i];
      if (!ent.isSynchronized) {
        continue;
      }
      const serialized = {};
      for (const key of Object.keys(ent.components)) {
        const component = ent.components[key];
        serialized[key] = {
          name: component.constructor.name,
          attrs: component.attributes
        };
      }
      snap[ent.id] = {
        parent: (ent.parent == null) ? null : ent.parent.id,
        comps: serialized
      };
    }
    return snap;
  }

  /*
   * Updates this model using the provided diff
   */
  applyDiff(diff) {

  }

  /*
   * Transforms this model into the model described by the snapshot while trying to
   * reuse as much of the existing entities as possible
   */
  applySnapshot(snap) {
    const oldEntities = this._entities;
    this._entities = {};
    const collectedComps = [];

    const entitiesCreated = [];

    // Update entities or create them if necessary
    for (const i of Object.keys(snap)) {
      let entity = null;
      const snap_components = snap[i].comps;

      if(i in oldEntities) {
        entity = oldEntities[i];
        delete oldEntities[i];
      } else {
        entity = new Entity(this._scene, i);
        entitiesCreated.push(i);
      }

      const components = entity.components;

      this._entities[i] = entity;

      entity.parent = snap[i].parent;

      // Recycle existing components and purge those which disappeared
      for (const comp_id of Object.keys(components)) {
        if (comp_id in snap_components) {
          collectedComps.push(comp_id);
        } else {
          entity.removeComponent(comp_id);
        }
      }

      // Create new components if needed
      for (const comp_id of Object.keys(snap_components)) {
        var comp = entity.components[comp_id];
        if (comp == null) {
          comp = entity.addComponent(game.getComponent(snap_components[comp_id].name), comp_id);
        }
        comp.attributes = snap_components[comp_id].attrs;
      }

      collectedComps.length = 0;
    }

    // Update components
    // We do this in a second pass because of state consistency: i.e. we cannot update
    // references if they point to something which does not exist yet.
    // TODO: can we get rid of this loop?
    for (const i of Object.keys(snap)) {
      let entity = this._entities[i];
      if (entitiesCreated.indexOf(i) >= 0) {
        entity.onCreate();
      }
    }

    // Remove other entities
    for (const i of Object.keys(oldEntities)) {
      oldEntities[i].onDestroy();
    }
  }


  update(dt) {
    // Logique:
    //
    // Si j'ai un target state (qui a été donné grace a un diff/snap) dont le timestamp est
    // postérieur au timestamp local actuel, alors je regarde s'il existe des entities
    // qui ne sont pas affectés par le target state (ie. ceux qui ont été créés localement
    // et donc ne sont pas updatés par le serveur). Si c'est le cas, je simule ces entities.
    // J'interpole les attributes pour les autres entities.
    //
    if (this._targetState === null) {
      for (const i of Object.keys(this._entities)) {
        this._entities[i].onUpdate(dt);
      }
    } else {
      // TODO
    }
  }


}
