import Phaser from 'phaser';

import { scnLoading } from './scenes/scnLoading';
import { scnMain } from './scenes/scnMain';
import * as gameConfig from './gameConfig.js';

const config = {
  type: Phaser.AUTO,
  width: gameConfig.appWidth,
  height: gameConfig.appHeight,
  scene: [
    scnLoading,
    scnMain
  ]
};

new Phaser.Game(config);