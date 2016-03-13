import Component from 'core/Component.js';
import MultiLaserBeamComp from 'components/MultiLaserBeam.js';
import RectangleShape from 'core/components/RectangleShape.js';
import Types from '../core/Types.js';
import IASystem from '../systems/IASystem.js';
import Creep from 'components/Creep.js';
import Tower from 'components/Tower.js';

import { LaserBeam, MultiLaserBeam } from 'prefabs.js';

export default class LaserTower extends Tower {

  onCreate() {
    this.LONGCOOLDOWN = 2000;
    this.COOLDOWN = 4000;

    this.currentCoolDown = this.COOLDOWN;
    this.towerRange = 5;
    this.damage = 100;
  }

  onUpdate(dt) {

    //update cooldown
    this.currentCoolDown -= dt;

    if(this.currentCoolDown < 0)
    {
      this.currentCoolDown = this.COOLDOWN;

      //GET CREEP
      if(this.targetCreep == null){
        this.targetCreep = this.scene.getSystem(IASystem).getClosestCreep(this.transform.x, this.transform.y);
      }

      if(this.targetCreep == null || this.targetCreep.transform.distanceTo(this.transform) > this.towerRange){
        this.currentCoolDown = this.LONGCOOLDOWN;
      }else {
        this.fire(this.targetCreep);
      }
    }
  }

  decreaseCooldown() {

  }

  fire(creep) {

    creep.decreaseLife(this.damage, this.player);

    let beam = this.scene.newPrefab(MultiLaserBeam, this.parent);

    beam.getComponent(MultiLaserBeamComp).sourceX = this.transform.x + this.width/2;
    beam.getComponent(MultiLaserBeamComp).sourceY = this.transform.y + this.height/2;
    beam.getComponent(MultiLaserBeamComp).targetCreep = creep;
  }
}
