

/**
 * A collection of components. This should not be created by user code, a Collection
 * instance is automatically available on attributes of type {@link Types}.Collection.
 *
 * If an entity has been destroyed ({@link Component#destroy}), then trying to access one
 * of its component _via_ a collection yields `null`.
 *
 * eg. (TODO: put this in a test case)
 * ```
 * collection.set(2, comp);
 * comp.destroy();
 * collection.get(2); // Returns null
 * ```
 *
 * About iteration: It is possible to iterate over collections using the for ... of syntax.
 * Elements should not be removed nor added to the collection while it is being iterated over.
 *
 * @see {@link Component#createAttribute}
 *
 * @example
 *
 * class MyComponent extends Component() {
 *
 *   onCreate() {
 *     this.createAttribute('trees', [], Types.Collection);
 *     // this.trees is now an instance of Collection
 *   }
 *
 *   plantTree() {
 *     this.trees.push(this.scene.newPrefab(Tree).getComponent(Sapling))
 *   }
 *
 *   printForest() {
 *     for (let tree of this.trees) {
 *       console.log(tree);
 *     }
 *   }
 * }
 */
export default class Collection {

  constructor(parent) {
    if (!parent || !parent.isComponent) {
      throw new Error(`Invalid Collection constructor parameter.
        notice: user code should not try to instanciate Collection.`);
    }
    this._parent = parent;
    this._components = [];
    this._componentsIds = [];
  }

  /**
   * @private
   *
   * Serialize this collection to be sent on the network.
   *
   * @return {Array} An array of "entity_id/component_id" strings
   */
  serialize() {
    const length = this.length;
    const out = new Array(length);
    for (let i = 0 ; i < length ; i++) {
      const comp = this._componentsIds[i];
      out[i] = comp.e + '/' + comp.c;
    }
    return out;
  }

  /**
   * Appends a component to the end of the collection.
   *
   * @param  {Component|string} comp Component to insert
   */
  push(comp) {
    this.set(this.length, comp);
  }

  /**
   * Removes the last component in the collection.
   *
   * @return {type}  description
   */
  pop() {
    this._componentsIds.pop();
    return this._components.pop();
  }


  /**
   * Sets all elements of the collection according to the provided array. Any previous
   * reference is removed from the collection.
   *
   * @param  {Component[]} data An array describing the new contents of this collection.
   */
  setAll(data) {
    this.clear();
    if (data == null) return;
    for (let comp of data) {
      this.push(comp);
    }
  }


  /**
   * Sets the element at position `pos`, replacing any previous reference at this position.
   *
   * @param  {number} pos  Index of the element to set
   * @param  {Component|string} comp The component to set. Can take a string for
   *     internal bookkeeping but users should only pass Components.
   */
  set(pos, comp) {

    if (comp == null) {
      this._components[pos] = null;
      this._componentsIds[pos] = {e: null, c: null};
    } else if (typeof comp === 'string') {
      var parts = comp.split('/');
      this._componentsIds[pos] = {
        e: parts[0],
        c: parts[1]
      };
      this._components[pos] = null; // Load lazily
    } else if (comp.isComponent) {
      this._componentsIds[pos] = {
        e: comp.entity.id,
        c: comp.id
      };
      this._components[pos] = comp;
    } else {
      throw new Error(`Trying to set element ${pos} to something that is not a component.`);
    }
  }


  /**
   * Returns the component at index `pos`.
   *
   * @param  {number} pos Index of the element to retreive
   * @return {Component} The component at index `pos` or null if that component
   *     was attached to a destroyed entity.
   */
  get(pos) {

    if (pos < 0 || pos > this.length) {
      throw new Error(`Out-of-bounds collection access (at position ${pos}, length=${this.length})`);
    }

    // Trying to fetch component
    if (this._components[pos] == null) {
      const ids = this._componentsIds[pos];
      if (ids != null) {
        const entity = this._parent.scene.model.getEntity(ids.e);
        if (entity != null) {
          this._components[pos] = entity.components[ids.c] || null;
        }
      }
    }

    // Destroyed components should not be returned
    if (this._components[pos] != null && this._components[pos].entity.destroyed === true) {
      this._components[pos] = null;
      this._componentsIds[pos] = null;
    }

    return this._components[pos];
  }


  /**
   * Removes the element at index `pos`.
   *
   * @param  {number} pos Index of the element to remove.
   */
  remove(pos) {
    this._components.splice(pos, -1);
    this._componentsIds.splice(pos, -1);
  }


  /**
   * Get the first element.
   *
   * @return {Component}  the first element in the collection or null if it's empty.
   */
  first() {
    return this.get(0);
  }

  /**
   * Get the last element.
   *
   * @return {Component}  the last element in the collection or null if it's empty.
   */
  last() {
    if (this.length <= 0) return null;
    return this.get(this.length - 1);
  }

  /**
   * The number of elements contained in the collection.
   *
   * Note that destroyed components are included in the count.
   */
  get length() {
    return this._components.length;
  }

  /**
   * Removes all elements in the collection, effectively setting {@link Collection#length} to 0.
   */
  clear() {
    this._components.length = 0;
    this._componentsIds.length = 0;
  }

  // TODO: implement these: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype
  // (need to test)

  *[Symbol.iterator]() {
    const length = this.length;
    for (let i = 0 ; i < length ; i++) {
      yield this.get(i);
    }
  }
}
