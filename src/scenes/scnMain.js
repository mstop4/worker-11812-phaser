import Phaser from 'phaser';
import { appWidth, appHeight } from '../gameConfig';

import objAudioManager from '../objects/objAudioManager';
import objClock from '../objects/objClock';
import objMeter from '../objects/objMeter';
import objUI from '../objects/objUI';
import objSteam from '../objects/objSteam';

const center = { 
  x: appWidth / 2,
  y: appHeight / 2
};

export default class scnMain extends Phaser.Scene {

  constructor() {
    super('scnMain');
  }

  create = () => {
    this.input.addPointer();
    this.cameras.main.setBackgroundColor('#687D64');
    
    this.gameOver = false;
    this.audioManager = new objAudioManager(this);
    this.clock = new objClock(this, center.x - 112, center.y);
    this.meter = new objMeter(this, 1080, center.y + 16);
    this.ui = new objUI(this);
    this.steam = new objSteam(this);

    this.audioManager.playSound('musMain', true);
  }

  update = () => {
    if (!this.gameOver) {
      this.clock.checkHands();
      this.ui.updateTimer();
    }
  }

  setGameOver = () => {
    this.gameOver = true;
  }
}