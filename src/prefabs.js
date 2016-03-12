import Transform from 'core/components/Transform.js';
import RawSprite from 'core/components/RawSprite.js';
import Physics from 'core/components/Physics.js';
import Input from 'core/components/Input.js';
import RectangleShape from 'core/components/RectangleShape.js';
import CircleShape from 'core/components/CircleShape.js';
import CameraComp from 'core/components/Camera.js';

import PlayerComp from 'components/Player.js';
import BulletComp from 'components/Bullet.js';
import PawnComp from 'components/Pawn.js';


export const Player = [
  { comp: PlayerComp },
  { comp: Input }
];

export const Pawn = [
  { comp: Transform },
  { comp: PawnComp },
  { comp: RawSprite },
  { comp: Input },
  // { comp: CameraComp },
  {
    comp: Physics,
    attrs: {
      'radius': 6
    }
  }
];

export const WorldBoundaries = [
  { comp: Transform },
  {
    comp: RectangleShape,
    attrs: {
      width: 800,
      height: 600,
      strokeStyle: '#0f0',
      stroke: true,
      fill: false
    }
  }
];

export const Camera = [
  {
    comp: Transform,
    attrs: {
      x: 400,
      y: 300
    }
  },
  { comp: CameraComp,
    attrs: {
      backgroundColor: '#000'
    }
  }
];

export const Bullet = [
  { comp: Transform },
  { comp: BulletComp },
  { comp: CircleShape },
  { comp: Physics}
];
