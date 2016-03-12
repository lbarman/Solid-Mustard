import System from '../System.js';
import { Log } from '../Log.js';

export default class GraphicSystem extends System {

  constructor() {
    super();
    this.lastActiveCamera = null;
    this._sprites = [];
  }

  addSprite(sprite) {
    this._sprites.push(sprite);
  }

  removeSprite(sprite) {
    const idx = this._sprites.indexOf(sprite);
    if (idx < 0) {
      Log.warn('Removing an sprite which is not in graphics system');
      return;
    }
    this._sprites.splice(idx, 1);
  }

  get sprites() {
    return this._sprites;
  }
}
