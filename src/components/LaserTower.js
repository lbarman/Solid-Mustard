import Component from 'core/Component.js';
import MultiLaserBeamComp from 'components/MultiLaserBeam.js';
import RectangleShape from 'core/components/RectangleShape.js';
import Types from '../core/Types.js';
import Creep from 'components/Creep.js';
import Tower from 'components/Tower.js';

import { LaserBeam, MultiLaserBeam } from 'prefabs.js';

export default class LaserTower extends Tower {

  onCreate() {

    super.onCreate();

    this.LONGCOOLDOWN = 2000;
    this.COOLDOWN = 4000;

    this.currentCoolDown = this.COOLDOWN;
    this.towerRange = 5;
    this.damage = 100;
  }

  fire(creep) {

    creep.decreaseLife(this.damage, this.player);

    let beam = this.scene.newPrefab(MultiLaserBeam, this.parent);

    beam.getComponent(MultiLaserBeamComp).sourceX = this.transform.x + this.width/2;
    beam.getComponent(MultiLaserBeamComp).sourceY = this.transform.y + this.height/2;
    beam.getComponent(MultiLaserBeamComp).targetCreep = creep;
  }
}
