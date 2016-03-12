import System from '../System.js';
import { Log } from '../Log.js';

export default class PhysicSystem extends System {

  constructor() {
    super();
    this._obj = [];
    this.buoyancy = 0.1;
    this.gravity = 0;
    this._boundaries = {
      left: -Infinity,
      right: Infinity,
      top: -Infinity,
      bottom: Infinity
    };
  }

  addObject(obj) {
    this._obj.push(obj);
  }

  removeObject(obj) {
    const idx = this._obj.indexOf(obj);
    if (idx < 0) {
      Log.warn('Removing an object which is not in physcis system');
      return;
    }
    this._obj.splice(idx, 1);
  }

  get boundaries() {
    return this._boundaries;
  }

  set boundaries(b) {
    if (b.left != null) this._boundaries.left = b.left;
    if (b.right != null) this._boundaries.right = b.right;
    if (b.top != null) this._boundaries.top = b.top;
    if (b.bottom != null) this._boundaries.bottom = b.bottom;
  }

  onUpdate(dt) {
    // Update all objects positions
    for (const obj of this._obj) {
      obj.transform.x += obj.vx * dt;
      obj.transform.y += obj.vy * dt;
      obj.transform.theta += obj.vtheta * dt;
    }

    // Naïve collision detection
    const objLength = this._obj.length;
    let i=0, j=0;
    for (i = 0 ; i < objLength ; i++){
      const o1 = this._obj[i];
      // Test collision with terrain boundaries
      if (   o1.transform.x - o1.radius <= this._boundaries.left
          || o1.transform.x + o1.radius >= this._boundaries.right
          || o1.transform.y - o1.radius <= this._boundaries.top
          || o1.transform.y + o1.radius >= this._boundaries.bottom) {
        // If it is outside the terrain, adjust position and trigger collision
        const oldX = o1.transform.x;
        const oldY = o1.transform.y;

        o1.transform.x = Math.max(
            Math.min(o1.transform.x, this._boundaries.right - o1.radius),
            this._boundaries.left + o1.radius);
        o1.transform.y = Math.max(
            Math.min(o1.transform.y, this._boundaries.bottom - o1.radius),
            this._boundaries.top + o1.radius);

        o1.entity.triggerEvent('collision', {
          vx: (oldX != o1.transform.x) ? o1.vx : 0,
          vy: (oldY != o1.transform.y) ? o1.vy : 0,
          other: null
        });
      } else {
        // Otherwise (if still in terrain), test collision with other objects
        for (j = i+1 ; j < objLength ; j++) {
          const o2 = this._obj[j];
          if (o1.transform.distanceTo(o2.transform) < o1.radius + o2.radius) {
            o1.entity.triggerEvent('collision', {
              vx: o1.vx - o2.vx,
              vy: o1.vy - o2.vy,
              other: o2
            });
            o2.entity.triggerEvent('collision', {
              vx: o2.vx - o1.vx,
              vy: o2.vy - o1.vy,
              other: o1
            });
          }
        }
      }
    }
  }
}
