import Component from 'core/Component.js';
import LaserBeamComp from 'components/LaserBeam.js';
import RectangleShape from 'core/components/RectangleShape.js';
import Types from '../core/Types.js';
import IASystem from '../systems/IASystem.js';
import Creep from 'components/Creep.js';

import { LaserBeam } from 'prefabs.js';

export default class Tower extends Component {

  onCreate() {
    this.LONGCOOLDOWN = 2000;
    this.COOLDOWN = 200;

    this.currentCoolDown = this.COOLDOWN;
    this.createAttribute('width', 1, Types.Float);
    this.createAttribute('height', 1, Types.Float);
    this.createAttribute('targetCreep', null, Types.Component(Creep));
    this.createAttribute('towerRange', 5, Types.Float);

    this.createAttribute('displayRadius', true, Types.Boolean);
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
        this.fire(this.targetCreep.transform.x, this.targetCreep.transform.y);
      }
    }
  }


  onDraw(ctx) {

    //start drawing
    ctx.save();

    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.theta);

    //radius
    if(this.displayRadius) {
           /*
      var centerX = this.width 
      var centerY = canvas.height / 2;
      var radius = 70;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();

      */
    }


    ctx.beginPath();

    //red body
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; 
    ctx.lineWidth = 1;
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.width, 0);
    ctx.lineTo(0 + this.width, 0 + this.height);
    ctx.lineTo(0, 0 + this.height);
    ctx.closePath();
    ctx.fill();

    //stronger border
    ctx.strokeStyle = 'rgba(255, 0, 0, 1)'; 
    ctx.lineWidth = 0.05;
    ctx.moveTo(0, 0);
    ctx.lineTo(0 + this.width, 0);
    ctx.lineTo(0 + this.width, 0 + this.height);
    ctx.lineTo(0, 0 + this.height);
    ctx.closePath();
    ctx.stroke();

    //black border
    let i = this.width / 3;

    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';

    ctx.lineWidth = 0.05;
    ctx.moveTo(i, i);
    ctx.lineTo(this.width-i, i);
    ctx.lineTo(0 + this.width - i, 0 + this.height - i);
    ctx.lineTo(0+i, 0 + this.height -i);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  decreaseCooldown() {

  }

  fire(x, y) {
    let beam = this.scene.newPrefab(LaserBeam, this.parent);

    beam.getComponent(LaserBeamComp).sourceX = this.transform.x + this.width/2;
    beam.getComponent(LaserBeamComp).sourceY = this.transform.y + this.height/2;
    beam.getComponent(LaserBeamComp).targetX = x;
    beam.getComponent(LaserBeamComp).targetY = y;
  }
}
