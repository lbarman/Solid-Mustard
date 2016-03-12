import { uid } from './utils.js';
import { Log } from './Log.js';
import Physics from './components/Physics.js';

export default class Entity {

  constructor(scene, id = null) {
    this._components = {};
    this._scene = scene;
    this._parent = null;
    this._parentId = null;
    this._id = (id !== null) ? id : uid();
    this._compIdCounter = 0;
    this._isSynchronized = true;
    this._transform = null;
    this._handlers = {};
    this._destroyed = false;
  }

  get parent() {
    if (this._parent == null) {
      this._parent = this.scene.model.getEntity(this._parentId);
    }
    return this._parent;
  }

  set parent(arg) {
    if (typeof arg === 'string') {
      this._parent = null;
      this._parentId = arg;
    } else if (arg !== null && typeof arg === 'object') {
      var entity = arg.entity || entity; // Links to entity even if component is passed
      this._parent = arg;
      this._parentId = arg.id;
    } else {
      this._parent = null;
      this._parentId = null;
    }
  }

  get id() {
    return this._id;
  }

  get components() {
    return this._components;
  }

  get isSynchronized() {
    return this._isSynchronized;
  }

  get scene() {
    return this._scene;
  }

  get transform() {
    return this._transform;
  }

  get physics() {
    return this.getComponent(Physics);
  }

  get destroyed() {
    return this._destroyed;
  }

  enableNetworking() {
    this._isSynchronized = true;
  }

  disableNetworking() {
    this._isSynchronized = false;
  }

  triggerEvent(evt, data) {
    if (this._handlers[evt] != null) {
      for (const h of this._handlers[evt]) {
        h(data);
      }
    }
  }

  addComponent(Comp, id = null) {
    var comp_id = (id == null) ? uid() : id;
    var comp = new Comp(this, comp_id);
    this._components[comp_id] = comp;
    this._registerComponentHandlers(comp);

    // Special case optimization for extremely common components
    if (Comp.name === 'Transform') {
      this._transform = comp;
    }
    return comp;
  }

  addComponents(Comps) {
    for (let Comp of Comps) {
      this.addComponent(Comp);
    }
  }

  _registerComponentHandlers(comp) {
    for (const evt of Object.keys(comp.eventHandlers)) {
      this._addEventHandler(evt, comp.eventHandlers[evt]);
    }
  }

  _addEventHandler(evt, fn) {
    if (typeof this._handlers[evt] === 'undefined') {
      this._handlers[evt] = [];
    }
    this._handlers[evt].push(fn);
  }

  removeComponent(id) {
    throw new Error('Removing components is not supported');
    // Cannot remove component for now because we would need to remove associated event handlers

    // const comp = this._components[id];
    // if (comp === this._transform) {
    //   this._transform = null;
    // }
    // delete this._components[id];
  }

  destroy() {
    this._destroyed = true;
  }

  getComponent(Type) {
    var name = Type;
    if (typeof Type !== 'string') {
      name = Type.name;
    }
    name = name.toLowerCase();
    for (const i of Object.keys(this._components)) {
      const comp = this._components[i];
      if (comp.constructor.name.toLowerCase() === name) {
        return comp;
      }
    }
  }

  onCreate() {
    for (let i of Object.keys(this._components)) {
      const component = this._components[i];
      this._components[i].onCreate();
    }
  }

  onDestroy() {
    for (let i of Object.keys(this._components)) {
      const component = this._components[i];
      this._components[i].onDestroy();
    }
  }


  onUpdate(dt) {
    for (let i of Object.keys(this._components)) {
      const component = this._components[i];
      if (component.enabled) {
        this._components[i].onUpdate(dt);
      }
    }
  }
}
