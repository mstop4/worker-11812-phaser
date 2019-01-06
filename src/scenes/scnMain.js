import Phaser from 'phaser';
import * as gameConfig from '../gameConfig.js';

export class scnMain extends Phaser.Scene {

  static screenCenter = { 
    x: gameConfig.appWidth / 2,
    y: gameConfig.appHeight / 2
  }

  constructor() {
    super();
    this.hourHand = null;
    this.minuteHand = null;
    this.secondHand = null;
  }

  preload = () => {
    this.load.image('sky', 'assets/sprites/space3.png');
    this.load.image('light', 'assets/sprites/light.png');
    this.load.image('hand', 'assets/sprites/hand1.png');
  }

  create = () => {
    this.add.image(scnMain.screenCenter.x, scnMain.screenCenter.y, 'sky');

    const lights = this.add.group();

    for (let i=0; i<45; i++) {
      const _rad = (90-i*8) * (Math.PI / 180); 
      const _x = Math.cos(_rad) * gameConfig.clockRadius;
      const _y = -Math.sin(_rad) * gameConfig.clockRadius;

      lights.create(scnMain.screenCenter.x + _x, scnMain.screenCenter.y + _y, 'light');
    }

    this.hourHand = this.add.image(scnMain.screenCenter.x, scnMain.screenCenter.y, 'hand');
    this.hourHand.setOrigin(0, 0.5);

    this.minuteHand = this.add.image(scnMain.screenCenter.x, scnMain.screenCenter.y, 'hand');
    this.minuteHand.setOrigin(0, 0.5);
    this.minuteHand.angle = 180;

    this.secondHand = this.add.image(scnMain.screenCenter.x, scnMain.screenCenter.y, 'hand');
    this.secondHand.setOrigin(0, 0.5);
    this.secondHand.angle = 90;
  }

  update = () => {
    this.hourHand.angle += 0.1;
    this.minuteHand.angle += 0.1;

    const mouseX = this.input.x;
    const mouseY = this.input.y;

    this.secondHand.angle = Math.atan2(mouseY-scnMain.screenCenter.y, mouseX-scnMain.screenCenter.x) * (180 / Math.PI);
  }
}