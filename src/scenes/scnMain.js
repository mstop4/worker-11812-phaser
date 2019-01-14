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
    this.isPaused = false;
  }

  create = () => {
    this.anims.create({
      key: 'flash',
      frames: [
        { key: 'sprLightOff' },
        { key: 'sprLightOn' },
      ],
      frameRate: 12,
      repeat: -1
    });

    this.input.addPointer();
    this.cameras.main.setBackgroundColor('#687D64');
    
    this.sceneOver = false;
    this.audioManager = new objAudioManager(this);
    this.clock = new objClock(this, center.x - 112, center.y);
    this.meter = new objMeter(this, 1080, center.y);
    this.ui = new objUI(this);
    this.steam = new objSteam(this);

    this.bgm = this.audioManager.playSound('musMain', true);

    this.sys.game.events.on('hidden', () => {
      this.scene.sleep();
      this.ui.pauseTimer();
    });

    this.sys.game.events.on('visible', () => {
      this.scene.wake();
      this.ui.resumeTimer();
    });    
  }

  update = () => {
    if (!this.sceneOver) {
      this.clock.checkHands();
      this.ui.updateTimer();
    }
  }

  setGameOver = () => {
    this.sceneOver = true;
    setTimeout(() => {
      this.audioManager.stopSound(this.bgm);
      this.scene.start('scnTitle');
    }, 5000);
  }
}