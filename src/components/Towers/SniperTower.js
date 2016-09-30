import Component from 'core/Component.js';
import SniperBeamComp from 'components/Projectiles/SniperBeam.js';
import RectangleShape from 'core/components/RectangleShape.js';
import Types from 'core/Types.js';
import IASystem from 'systems/IASystem.js';
import Creep from 'components/Creep.js';
import Tower from 'components/Towers/Tower.js';

import { SniperBeam } from 'prefabs.js';

export default class SniperTower extends Tower {

  onCreate() {
    super.onCreate();
    this.COOLDOWN = 2000;

    this.currentCoolDown = this.COOLDOWN;
    this.towerRange = 10;
    this.damage = 50;
  }

  fire(creep) {

    creep.decreaseLife(this.damage, this.player);

    let beam = this.scene.newPrefab(SniperBeam, this.parent);

    beam.getComponent(SniperBeamComp).sourceX = this.transform.x + this.width/2;
    beam.getComponent(SniperBeamComp).sourceY = this.transform.y + this.height/2;
    beam.getComponent(SniperBeamComp).targetX = creep.transform.x;
    beam.getComponent(SniperBeamComp).targetY = creep.transform.y;
  }
}
