import Entity from './Entity.js';
import GameModel from './GameModel.js';
import { uid } from './utils.js';
import { Log } from './Log.js';
import GraphicSystem from './systems/GraphicSystem.js';


/**
 * Base class for game scenes.
 *
 * A scene allows to isolate different parts of the game. For instance a menu
 * could be a scene, a game level can be a scene.
 *
 * Entities and components from different scenes cannot interact.
 *
 * Most basic games will only require a single scene class.
 *
 * ## Usage
 *
 * Scenes should be created as subclasses of this class in the /scenes folder.
 * They should implement {@link Scene#onCreate} to populate themselves with entities.
 *
 * @example
 * export default class MainScene extends Scene {
 *   onCreate() {
 *     super.onCreate();
 *     this.newPrefab(Camera);
 *   }
 * }
 */
export default class Scene {

  constructor(id = null) {
    this._model = new GameModel(this);
    this._id = (id != null) ? id : uid();
    this._systems = [];
  }

  /**
   * Called upon scene instantiation.
   *
   * Subclasses should override this method and call super.onCreate().
   *
   * Default implementation adds a Graphic system to the scene
   *
   * @protected
   */
  onCreate() {
    this.addSystem(new GraphicSystem());
  }

  /**
   * Called once per game loop
   *
   * Subclasses overriding this method **must** call super.onUpdate(dt)
   * @protected
   */
  onUpdate(dt) {
    for (const sys of this._systems) {
      sys.onUpdate(dt);
    }
    this._model.update(dt);
    for (const i of Object.keys(this._model.entities)) {
      const entity = this._model.entities[i];
      if (entity.destroyed) {
        entity.onDestroy();
        this.model.removeEntity(entity);
      }
    }
  }

  getSystem(Type) {
    for (const i of Object.keys(this._systems)) {
      const sys = this._systems[i];
      if (sys.constructor.name === Type.name) {
        return sys;
      }
    }
  }

  addSystem(system) {
    this._systems.push(system);
  }

  get id() {
    return this._id;
  }

  get model() {
    return this._model;
  }

  get entities() {
    return this._model.entities;
  }

  /**
   * @private
   */
  newEntity(parent = null) {
    const entity = new Entity(this);
    entity.parent = parent;
    this._model.addEntity(entity);
    return entity;
  }


  /**
   * Creates a new entity in this scene with comps attached.
   *
   * note: DO NOT USE THIS METHOD. Use {@link Scene#newPrefab} instead.  
   * (The reason is that dependencies may not be properly loaded on the
   * client when using this method)
   *
   * @private
   * @param  {Component#constructor[]} comps         description
   * @param  {Entity} [parent=null] The parent entity
   * @return {Entity} The instantiated entity
   */
  newEntityWithComponents(comps, parent = null) {
    const entity = this.newEntity(parent);
    entity.addComponents(comps);
    entity.onCreate();
    return entity;
  }


  /**
   * Instantiate a new prefab in this scene
   *
   * @param  {Object} prefab The prefab to instantiate.
   * @param  {Entity} [parent=null] The parent of the new entity
   * @return {type} The newly created entity
   */
  newPrefab(prefab, parent = null) {
    const entity = this.newEntity(parent);
    for (const compDef of prefab) {
      const comp = entity.addComponent(compDef.comp);
      for (const i in compDef.attrs) {
        comp[i] = compDef.attrs[i];
      }
    }
    entity.onCreate();
    return entity;
  }

  /**
   * @private
   */
  destroy(entity) {
    entity.onDestroy();
    this._model.removeEntity(entity);
  }

}
