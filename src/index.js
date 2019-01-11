import Phaser from 'phaser';
import GameScalePlugin from 'phaser-plugin-game-scale';

import scnLoading from './scenes/scnLoading';
import scnMain from './scenes/scnMain';
import * as gameConfig from './gameConfig.js';

const config = {
  type: Phaser.AUTO,
  scene: [
    scnLoading,
    scnMain
  ],
  height: gameConfig.appHeight,
  width: gameConfig.appWidth,
  plugins: {
    global: [{
      key: 'GameScalePlugin',
      plugin: GameScalePlugin,
      mapping: 'gameScale',
      data: {
        debounce: false,
        debounceDelay: 50,   // Debounce interval, in ms
        maxHeight: gameConfig.appHeight,
        maxWidth: gameConfig.appWidth,
        minHeight: 0,
        minWidth: 0,
        mode: 'fit',
        resizeCameras: true, // Resize each scene camera when resizing the game
        snap: null,          // Snap interval, in px
      }
    }]
  }
};

new Phaser.Game(config);