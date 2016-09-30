import BulletComp  from 'components/Projectiles/Bullet.js';
import Component  from 'core/Component.js';
import { Bullet } from 'prefabs.js';
import Types  from 'core/Types.js';
import IASystem  from 'systems/IASystem.js';


export default class Tower extends Component {

  onCreate() {
    this.COOLDOWN = 700;
    this.COST = 100;

    this.createAttribute('currentCoolDown', this.COOLDOWN, Types.Float);
    this.createAttribute('width', 1, Types.Float);
    this.createAttribute('height', 1, Types.Float);
    this.createAttribute('targetCreep', null, Types.Component);
    this.createAttribute('towerRange', 5, Types.Float);
    this.createAttribute('player', null, Types.Component);
    this.createAttribute('cost', this.COST, Types.Int)

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
