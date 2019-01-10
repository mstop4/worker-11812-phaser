import Phaser from 'phaser';
import * as gameConfig from '../gameConfig';
import { objClock } from '../objects/objClock';
import { objMeter } from '../objects/objMeter';
import { objUI } from '../objects/objUI';

export class scnMain extends Phaser.Scene {

  static center = { 
    x: gameConfig.appWidth / 2,
    y: gameConfig.appHeight / 2
  }

  constructor() {
    super('scnMain');
    this.clock = null;
    this.meter = null;
    this.ui = null;
  }

  create = () => {
    this.input.addPointer();
    this.add.image(scnMain.center.x, scnMain.center.y, 'back');
    this.clock = new objClock(this, scnMain.center.x, scnMain.center.y);
    this.meter = new objMeter(this, 1200, scnMain.center.y);
    this.ui = new objUI(this);
  }

  update = () => {
    this.clock.checkHands();
  }

  updateScore = (delta) => {
    this.ui.updateScore(delta);
  }

  updateMeter = (delta) => {
    this.meter.updateMeter(delta);
  }
}