import Phaser from 'phaser';
import * as gameConfig from '../gameConfig';
import { objClock } from '../objects/objClock';

export class scnMain extends Phaser.Scene {

  static center = { 
    x: gameConfig.appWidth / 2,
    y: gameConfig.appHeight / 2
  }

  constructor() {
    super();
    this.clock = null;
  }

  preload = () => {
    this.load.image('sky', 'assets/sprites/space3.png');
    this.load.image('lightOff', 'assets/sprites/lightOff.png');
    this.load.image('lightOn', 'assets/sprites/lightOn.png');
    this.load.image('hand', 'assets/sprites/hand1.png');
  }

  create = () => {
    this.add.image(scnMain.center.x, scnMain.center.y, 'sky');
    this.clock = new objClock(this, scnMain.center.x, scnMain.center.y, 300);
  }

  update = () => {
    this.clock.update();
  }
}