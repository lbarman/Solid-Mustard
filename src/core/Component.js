import Collection  from './Collection.js';
import { Log } from './Log.js';
import Types  from './Types.js';

const EVENT_RX = /^on[A-Z].*/;

class Component {
  constructor(id) {
    this.entity = null;
    this._id = id;
    this._enabled = true;
    this._eventHandlers = {};
    for (const f of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (EVENT_RX.test(f)) {
        this._eventHandlers[f.substr(2).toLowerCase()] = this[f].bind(this);
      }
    }
    this._attributesList = {};
  }


  /**
   * Returns true. Useful for duck typing.
   *
   * @return {boolean}  true
   */
  get isComponent() { return true; }

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
    for (const attr of Object.keys(this._attributesList)) {
      const attrVal = this[attr];
      if (this._attributesList[attr] === Types.Component) {
        if (attrVal != null) {
          attrs[attr] = attrVal.entity.id + '/' + attrVal.id;
        } else {
          attrs[attr] = null;
        }
      } else if (this._attributesList[attr] === Types.Collection) {
        attrs[attr] = attrVal.serialize();
      } else {
        attrs[attr] = attrVal;
      }
    }
    return attrs;
  }

  set attributes(attrs) {
    for (const i of Object.keys(attrs)) {
      this[i] = attrs[i];
    }
  }

  _createComponentAttribute(name) {
    // Back Component attribute implementation by a Collection to avoid code duplication
    const collection = new Collection(this);
    const oldProp = this[name];

    // Use the closure to store component and component id hidden from outside
    Object.defineProperty(this, name, {
      get: () => {
        return collection.first();
      },
      set: (comp) => {
        collection.set(0, comp);
      }
    });
    if (oldProp != null) {
      this[name] = oldProp;
    }
  }

  _createCollectionAttribute(name) {
    const collection = new Collection(this);
    const oldProp = this[name];

    Object.defineProperty(this, name, {
      get: () => {
        return collection;
      },
      set: (comps) => {
        collection.setAll(comps);
      }
    });
    collection.setAll(oldProp);
  }

  /**
   * Define a component attribute. This function must only be called in the component's
   * {Component.onCreate} method.
   *
   * This is only relevant for networked games. Any state must be stored in
   * component attributes rather than direct javascript properties.
   *
   * @example
   *
   * class MyComponent extends Component {
   *   onCreate() {
   *     this.createAttribute('life', 3, Types.Int);
   *
   *     this.life = 4; // Life is persisted over the network
   *
   *     this.health = 3; // Health might be lost anytime because it is not an attribute
   *   }
   * }
   *
   * See the manual for more information on component attributes and netorking.
   *
   * @param  {string} name     Name of the attribute to declare
   * @param  {Any} defaultVal Default attribute value. If this[name] is null
   *     or not defined, this[name] is set to defaultVal at creation time.
   * @param  {Type} type       Defines the type for this parameter. See all types
   *     definition in {@link Types}
   */
  createAttribute(name, defaultVal, type) {
    if (type == Types.Component) {
      this._createComponentAttribute(name);
    } else if (type == Types.Collection) {
      this._createCollectionAttribute(name);
    } else if(typeof this[name] === 'undefined') {
      this[name] = defaultVal;
    }
    this._attributesList[name] = type;
  }

  // subclass can override
  get categories() {
    return [];
  }

  get scene() {
    return this.entity.scene;
  }

  get transform() {
    return this.entity.transform;
  }

  get physics() {
    return this.entity.physics;
  }

  getComponent(Comp) {
    return this.entity.getComponent(Comp);
  }

  hasComponent(Comp) {
    return this.entity.hasComponent(Comp);
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


export default Component;
