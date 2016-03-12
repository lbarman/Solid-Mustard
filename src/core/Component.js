import { Log } from './Log.js';
import Types from './Types.js';

const EVENT_RX = /^on[A-Z].*/;

export default class Component {
  constructor(entity, id) {
    this._entity = entity;
    this._enabled = true;
    this._id = id;
    this._eventHandlers = {};
    for (const f of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (EVENT_RX.test(f)) {
        this._eventHandlers[f.substr(2).toLowerCase()] = this[f].bind(this);
      }
    }
    this._attributesList = {};
  }

  onCreate() {}
  onDestroy() {}
  onUpdate() {}

  get enabled() {
    return this._enabled;
  }

  get id() {
    return this._id;
  }

  get eventHandlers() {
    return this._eventHandlers;
  }

  get attributes() {
    var attrs = {};
    for (const attr of Object.keys(this.attributesList)) {
      const attrVal = this[attr];
      if (Types.isComponent(this.attributesList[attr])) {
        if (attrVal != null) {
          attrs[attr] = attrVal.entity.id + '/' + attrVal.id;
        } else {
          attrs[attr] = null;
        }
      } else {
        attrs[attr] = attrVal;
      }
    }
    return attrs;
  }

  get attributesList() {
    return this._attributesList;
  }

  set attributes(attrs) {
    for (const i of Object.keys(attrs)) {
      this[i] = attrs[i];
    }
  }

  _createComponentAttribute(name) {
    const oldProp = this[name];
    // Use the closure to store component and component id hidden from outside
    var compId = null;
    var entId = null;
    var compRef = null;
    Object.defineProperty(this, name, {
      get: () => {
        if (compRef === null) {
          const entity = this.scene.model.getEntity(entId);
          if (entity != null) {
            compRef = entity.components[compId] || null;
          }
        } else if (compRef.entity.destroyed === true) {
          compId = compRef = entId = null;
        }
        return compRef;
      },
      set: (comp) => {
         if (typeof comp === 'string') {
          var parts = comp.split('/');
          entId = parts[0];
          compId = parts[1];
          compRef = null;
        } else if (comp !== null && typeof comp === 'object') {
          entId = comp.entity.id;
          compId = comp.id;
          compRef = comp;
        } else {
          compId = compRef = entId = null;
        }
      }
    });
    if (oldProp != null) {
      this[name] = oldProp;
    }
  }

  createAttribute(name, defaultVal, type) {
    if (Types.isComponent(type)) {
      this._createComponentAttribute(name);
    } else if(typeof this[name] === 'undefined') {
      this[name] = defaultVal;
    }
    this._attributesList[name] = type;
  }

  // subclass can override
  get categories() {
    return [];
  }

  get entity() {
    return this._entity;
  }

  get scene() {
    return this._entity.scene;
  }

  get transform() {
    return this._entity.transform;
  }

  get physics() {
    return this._entity.physics;
  }

  getComponent(Comp) {
    return this._entity.getComponent(Comp);
  }

  destroy() {
    this.entity.destroy();
  }

  disable() {
    this._enabled = false;
  }

  enable() {
    this._enabled = true;
  }
}
