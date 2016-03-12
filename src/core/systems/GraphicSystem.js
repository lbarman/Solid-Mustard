import System from '../System.js';
import { Log } from '../Log.js';

export default class GraphicSystem extends System {

  constructor() {
    super();
    this._sprites = [];
  }

  addSprite(sprite) {
    this._sprites.push(sprite);
    Log.info(`Graphics: push sprite (length: ${this._sprites.length})`);
  }

  removeSprite(sprite) {
    const idx = this._sprites.indexOf(sprite);
    if (idx < 0) {
      Log.warn('Removing an sprite which is not in graphics system');
      return;
    }
    this._sprites.splice(idx, 1);
    Log.info(`Graphics: pop sprite (length: ${this._sprites.length})`);
  }

  get sprites() {
    return this._sprites;
  }
}
