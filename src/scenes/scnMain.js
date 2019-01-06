import Phaser from 'phaser';
import * as gameConfig from '../gameConfig.js';

export class scnMain extends Phaser.Scene {

  hourHand = null;
  minuteHand = null;
  secondHand = null;

  constructor() {
    super();
  }

  preload = () => {
    this.load.image('sky', 'assets/sprites/space3.png');
    this.load.image('light', 'assets/sprites/light.png');
    this.load.image('hand', 'assets/sprites/hand1.png');
  }

  create = () => {
    this.add.image(gameConfig.appWidth/2, gameConfig.appHeight/2, 'sky');

    const lights = this.add.group();

    for (let i=0; i<45; i++) {
      const _rad = (90-i*8) * (Math.PI / 180); 
      const _x = Math.cos(_rad) * gameConfig.clockRadius;
      const _y = -Math.sin(_rad) * gameConfig.clockRadius;

      lights.create(gameConfig.appWidth/2 + _x, gameConfig.appHeight/2 + _y, 'light');
    }

    this.hourHand = this.add.image(gameConfig.appWidth/2, gameConfig.appHeight/2, 'hand');
    this.hourHand.setOrigin(0.5, 1);

    this.minuteHand = this.add.image(gameConfig.appWidth/2, gameConfig.appHeight/2, 'hand');
    this.minuteHand.setOrigin(0.5, 1);
    this.minuteHand.angle = 180;

    this.secondHand = this.add.image(gameConfig.appWidth/2, gameConfig.appHeight/2, 'hand');
    this.secondHand.setOrigin(0.5, 1);
    this.secondHand.angle = 90;
  }

  update = () => {
    this.hourHand.angle += 0.1;
    this.minuteHand.angle += 0.1;
    this.secondHand.angle += 0.1;
  }
}