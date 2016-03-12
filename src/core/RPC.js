import { Log } from './Log.js';
import game from './Game.js';

class RPC {

  init(codec) {
    this.codec = codec;
    codec.onRPC((scene, entity, component, method, data) => this.onRemote(scene, entity, component, method, data));
  }

  call(component, method, data) {
    this.codec.sendRPC(component.scene.id, component.entity.id, component.id, method, data);
  }

  onRemote(scene, entity, component, method, data) {
    const sc = game.getScene(scene);
    if (sc == null) return;
    const ent = sc.model.getEntity(entity);
    if (ent == null) return;
    const comp = ent.components[component];
    if (comp == null) return;
    comp[method].call(comp, data);
  }
}

export default new RPC();
