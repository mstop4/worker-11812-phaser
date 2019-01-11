import Phaser from 'phaser';
import { appWidth, appHeight } from '../gameConfig';
import objAudioManager from '../objects/objAudioManager';
import objClock from '../objects/objClock';
import objMeter from '../objects/objMeter';
import objUI from '../objects/objUI';

const center = { 
  x: appWidth / 2,
  y: appHeight / 2
};

export default class scnMain extends Phaser.Scene {

  constructor() {
    super('scnMain');
    this.clock = null;
    this.meter = null;
    this.ui = null;
  }

  create = () => {
    this.input.addPointer();
    this.add.image(center.x, center.y, 'sprBack');
    this.audioManager = new objAudioManager(this);
    this.clock = new objClock(this, center.x, center.y);
    this.meter = new objMeter(this, 1200, center.y);
    this.ui = new objUI(this);
  }

  update = () => {
    this.clock.checkHands();
  }
}