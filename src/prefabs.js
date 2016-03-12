import Transform from 'core/components/Transform.js';
import RawSprite from 'core/components/RawSprite.js';
import Physics from 'core/components/Physics.js';
import Input from 'core/components/Input.js';
import RectangleShape from 'core/components/RectangleShape.js';
import CircleShape from 'core/components/CircleShape.js';
import CameraComp from 'core/components/Camera.js';

import GridComp from 'components/Grid.js';
import PlayerComp from 'components/Player.js';
import BulletComp from 'components/Bullet.js';
import PawnComp from 'components/Pawn.js';
import TowerComp from 'components/Tower.js';
import LaserBeamComp from 'components/LaserBeam.js';


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

export const Tower = [
  { comp: Transform },
  { comp: TowerComp },
  { comp: RawSprite }
];

export const WorldBoundaries = [
  { comp: Transform },
  {
    comp: RectangleShape,
    attrs: {
      width: 32,
      height: 18,
      strokeStyle: '#0f0',
      stroke: true,
      fill: false,
      lineWidth: 0.1
    }
  }
];

export const Camera = [
  {
    comp: Transform,
    attrs: {
      x: 16,
      y: 9
    }
  },
  { comp: CameraComp,
    attrs: {
      width: 33,
      height: 19,
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


export const LaserBeam = [
  { comp: Transform },
  { comp: LaserBeamComp },
  { comp: RawSprite }
];

export const Grid = [
  { comp: GridComp },
  { comp: RawSprite }
];
