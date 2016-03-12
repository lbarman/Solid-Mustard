import Component from 'core/Component.js';
import GraphicSystem from 'core/systems/GraphicSystem.js';

/* global window */

export default class MouseInput extends Component {

  onCreate() {
    this._clickListener = (evt) => this.handleClick(evt);
    this._mouseMoveListener = (evt) => this.handleMouseMove(evt);
    if (this.enabled === true) {
      this._bindHandlers();
    }

    this._graphicSystem = this.scene.getSystem(GraphicSystem);
  }

  _convertNativeEvent(evt) {
    const activeCam = this._graphicSystem.lastActiveCamera;
    var coords = {x: 0, y: 0};
    if (activeCam != null) {
      coords = activeCam.transformCoordinates(evt.clientX, evt.clientY);
    }
    return {
      type: evt.type,
      x: coords.x,
      y: coords.y,
      nativeEvent: evt
    };
  }

  _inputAvailable() {
    return typeof window !== 'undefined';
  }

  handleClick(evt) {
    this.entity.triggerEvent('click', this._convertNativeEvent(evt));
  }

  handleMouseMove(evt) {
    this.entity.triggerEvent('mousemove', this._convertNativeEvent(evt));
  }

  _bindHandlers() {
    if (this._inputAvailable() === true) {
      window.addEventListener('click', this._clickListener);
      window.addEventListener('mousemove', this._mouseMoveListener);
    }
  }

  _unbindHandlers() {
    if (this._inputAvailable() === true) {
      window.removeEventListener('click', this._clickListener);
      window.removeEventListener('mousemove', this._mouseMoveListener);
    }
  }

  onDestroy() {
    this._unbindHandlers();
  }

  disable() {
    super.disable();
    this._unbindHandlers();
  }

  enable() {
    super.enable();
    this._bindHandlers();
  }
}
