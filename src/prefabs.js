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
import CreepComp from 'components/Creep.js';
import MouseInput from 'components/MouseInput.js';
import GUIComp from 'components/GUI.js';
import PartyController from 'components/PartyController.js';
import Text from 'components/Text.js';
import HeadQuartersComp from 'components/HeadQuarters.js';

import TowerComp from 'components/Tower.js';
import LaserTowerComp from 'components/LaserTower.js';
import SniperTowerComp from 'components/SniperTower.js';

import TowerSprite from 'components/TowerSprite.js';
import LaserTowerSprite from 'components/LaserTowerSprite.js';
import SniperTowerSprite from 'components/SniperTowerSprite.js';

import LaserBeamComp from 'components/LaserBeam.js';
import MultiLaserBeamComp from 'components/MultiLaserBeam.js';
import SniperBeamComp from 'components/SniperBeam.js';

export const Controller = [
  { comp: PartyController }
];

export const Player = [
  { comp: Transform },
  { comp: PlayerComp },
  { comp: Input },
  { comp: CameraComp,
    attrs: {
      width: GridComp.H_CELLS + 1,
      height: GridComp.V_CELLS + 3,
      backgroundColor: '#000'
    }
  }
];

export const Creep = [
  { comp: Transform },
  { comp: CreepComp },
  {
    comp: CircleShape,
    attrs: {
      radius: 0.4,
      strokeStyle: 'yellow',
      stroke: true,
      fill: false,
      lineWidth: 0.1
    }
  },
  {
    comp: Physics,
    attrs: {
      radius: 0.5 // Make radius a bit larger than sprite to maximize odds of hit
    }
  }
];

export const Bullet = [
  { comp: Transform },
  { comp: BulletComp },
  {
    comp: RectangleShape,
    attrs: {
      fillStyle: 'rgba(255, 0, 0, 0.3)',
      fill: true,
      strokeStyle: '#f00',
      stroke: true,
      width: 0.332,
      height: 0.332,
      offsetX: -0.15,
      offsetY: -0.15,
      lineWidth: 0.1
    }
  },
  {
    comp: Physics,
    attrs: {
      radius: 0.332
    }
  }
];

export const Tower = [
  { comp: Transform },
  { comp: TowerComp },
  { comp: TowerSprite }
];

export const LaserTower = [
  { comp: Transform },
  { comp: LaserTowerComp },
  { comp: LaserTowerSprite }
];

export const SniperTower = [
  { comp: Transform },
  { comp: SniperTowerComp },
  { comp: SniperTowerSprite }
];

export const LaserBeam = [
  { comp: Transform },
  { comp: LaserBeamComp },
  { comp: RawSprite }
];

export const MultiLaserBeam = [
  { comp: Transform },
  { comp: MultiLaserBeamComp },
  { comp: RawSprite }
];

export const SniperBeam = [
  { comp: Transform },
  { comp: SniperBeamComp },
  { comp: RawSprite }
];

export const Grid = [
  { comp: Transform },
  { comp: GridComp },
  { comp: RawSprite },
  { comp: MouseInput },
  {
    comp: RectangleShape,
    attrs: {
      width: GridComp.H_CELLS,
      height: GridComp.V_CELLS,
      strokeStyle: 'rgb(0,171,169)',
      stroke: true,
      fill: false,
      lineWidth: 0.1
    }
  }
];

export const GUI = [
  { comp: Transform },
  { comp: GUIComp },
  { comp: MouseInput },
  { comp: RawSprite }
];

export const GUIText = [
  { comp: Transform },
  { comp: Text }
];

export const HeadQuarters = [
  { comp: Transform },
  { comp: HeadQuartersComp },
  { comp : RawSprite },
  {
    comp: Physics,
    attrs: {
      radius: 1.5
    }
  }
];
