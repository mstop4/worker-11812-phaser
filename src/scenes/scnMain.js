import 'phaser';
import * as gameConfig from '../gameConfig.js';

export class scnMain extends Phaser.Scene {
  preload() {
    this.load.image('sky', 'assets/sprites/space3.png');
  }

  create() {
    this.add.image(gameConfig.appWidth/2, gameConfig.appHeight/2, 'sky');
  }
}