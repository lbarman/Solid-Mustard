import Component from 'core/Component.js';
import LaserBeamComp from 'components/LaserBeam.js';
import RectangleShape from 'core/components/RectangleShape.js';
import Types from '../core/Types.js';
import IASystem from '../systems/IASystem.js';
import Creep from 'components/Creep.js';
import Player from 'components/Player.js';
import BulletComp from 'components/Bullet.js';

import { Bullet } from 'prefabs.js';


export default class Tower extends Component {

  onCreate() {
    this.COOLDOWN = 700;

    this.createAttribute('currentCoolDown', this.COOLDOWN, Types.Float);
    this.createAttribute('width', 1, Types.Float);
    this.createAttribute('height', 1, Types.Float);
    this.createAttribute('targetCreep', null, Types.Component(Creep));
    this.createAttribute('towerRange', 5, Types.Float);
    this.createAttribute('player', null, Types.Component(Player));

    this.createAttribute('damage', 30, Types.Float);
  }

  onUpdate(dt) {

    //update cooldown
    this.currentCoolDown -= dt;

    if(this.currentCoolDown < 0)
    {
      this.currentCoolDown = this.COOLDOWN;

      //GET CREEP
      this.targetCreep = this.scene.getSystem(IASystem).getClosestCreep(this.transform);

      if(this.targetCreep != null && this.targetCreep.transform.distanceTo(this.transform) <= this.towerRange){
        this.fire(this.targetCreep);
      }
    }
  }

  decreaseCooldown() {

  }

  fire(creep) {
    const bullet = this.scene.newPrefab(Bullet).getComponent(BulletComp);

    bullet.player = this.player;
    bullet.damage = this.damage;

    bullet.transform.x = this.transform.x + this.width/2;
    bullet.transform.y = this.transform.y + this.height/2;

    const dx = creep.transform.x - bullet.transform.x;
    const dy = creep.transform.y - bullet.transform.y;
    const l = Math.sqrt(dx*dx+dy*dy);
    bullet.physics.vx = BulletComp.SPEED * dx / l;
    bullet.physics.vy = BulletComp.SPEED * dy / l;
  }
}
