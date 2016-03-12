import game from '../Game.js';

import Shape from './Shape.js';
import CircleShape from './CircleShape.js';
import RectangleShape from './RectangleShape.js';
import RawSprite from './RawSprite.js';
import Transform from './Transform.js';
import Camera from './Camera.js';
import Sprite from './Sprite.js';
import Input from './Input.js';
import Physics from './Physics.js';

game.registerComponent(Shape);
game.registerComponent(CircleShape);
game.registerComponent(RectangleShape);
game.registerComponent(RawSprite);
game.registerComponent(Transform);
game.registerComponent(Camera);
game.registerComponent(Sprite);
game.registerComponent(Input);
game.registerComponent(Physics);
