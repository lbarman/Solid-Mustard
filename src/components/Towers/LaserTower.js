import Component from 'core/Component.js';
import MultiLaserBeamComp from 'components/Projectiles/MultiLaserBeam.js';
import RectangleShape from 'core/components/RectangleShape.js';
import Types from '../core/Types.js';
import Creep from 'components/Creep.js';
import Tower from 'components/Towers/Tower.js';

import { LaserBeam, MultiLaserBeam } from 'prefabs.js';

export default class LaserTower extends Tower {

  onCreate() {

    super.onCreate();

    this.COOLDOWN = 500;

    this.currentCoolDown = this.COOLDOWN;
    this.towerRange = 5;
    this.damage = 20;
  }

  fire(creep) {

    let beam = this.scene.newPrefab(MultiLaserBeam, this.parent).getComponent(MultiLaserBeamComp);

    beam.sourceX = this.transform.x + this.width/2;
    beam.sourceY = this.transform.y + this.height/2;
    beam.target = creep;
    beam.player = this.player;
    beam.damage = this.damage;
  }
}
