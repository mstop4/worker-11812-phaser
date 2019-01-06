import 'phaser';

import { scnMain } from './scenes/scnMain';
import * as gameConfig from './gameConfig.js';

const config = {
  type: Phaser.AUTO,
  width: gameConfig.appWidth,
  height: gameConfig.appHeight,
  scene: scnMain
};

new Phaser.Game(config);