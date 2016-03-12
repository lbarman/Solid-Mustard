import Component from '../Component.js';
import GraphicSystem from '../systems/GraphicSystem.js';


/**
 * Base class for all graphic components.
 *
 * Components extending Sprite should implement {@link Sprite#draw} to draw something
 * to screen.
 */
export default class Sprite extends Component {

  onCreate() {
    super.onCreate();

    this._graphicSystem = this.scene.getSystem(GraphicSystem);
    this._graphicSystem.addSprite(this);
  }

  onDestroy() {
    super.onDestroy();
    this._graphicSystem.removeSprite(this);
  }

  /**
   * Screen refresh handler.
   *
   * Subclasses should implement this function to draw something to the screen e
   * very time the screen is refreshed.
   *
   * note: The screen is typically refreshed 60 times a second which means that this method will
   * be invoked a lot. You must make sure that no heavy computation happens in here.
   */
  draw(ctx) {}
}
