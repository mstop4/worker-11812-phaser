import Phaser from 'phaser';
import * as gameConfig from '../gameConfig.js';

export class scnMain extends Phaser.Scene {
  preload() {
    this.load.image('sky', 'assets/sprites/space3.png');
    this.load.image('red', 'assets/sprites/red.png');
  }

  create() {
    this.add.image(gameConfig.appWidth/2, gameConfig.appHeight/2, 'sky');

    const lights = this.add.group();

    for (let i=0; i<45; i++) {
      const _rad = (i*8) * (Math.PI / 180); 
      const _x = Math.cos(_rad) * gameConfig.clockRadius;
      const _y = -Math.sin(_rad) * gameConfig.clockRadius;

      lights.create(gameConfig.appWidth/2 + _x, gameConfig.appHeight/2 + _y, 'red');
    }
  }
}