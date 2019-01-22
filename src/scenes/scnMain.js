import Phaser from 'phaser';
import { appWidth, appHeight } from '../gameConfig';
import { formatTime } from '../helpers/math';

import objClock from '../objects/objClock';
import objMeter from '../objects/objMeter';
import objUI from '../objects/objUI';
import objSteam from '../objects/objSimpleSteam';

const center = { 
  x: appWidth / 2,
  y: appHeight / 2
};

const transitionTime = 1000;

export default class scnMain extends Phaser.Scene {

  constructor() {
    super('scnMain');
    this.isPaused = false;
  }

  create = () => {
    this.input.addPointer();
    this.cameras.main.setBackgroundColor('#687D64');
    
    this.sceneOver = false;
    this.AM = this.game.audioManager;
    this.meter = new objMeter(this, 1080, center.y);
    this.clock = new objClock(this, center.x - 120, center.y);
    this.steam = new objSteam(this);
    this.ui = new objUI(this);

    this.AM.bgm = this.AM.playSound('musMain', true);
    this.bgmVolume = 1;

    this.sys.game.events.on('hidden', () => {
      this.scene.sleep();
      this.ui.pauseTimer();
    });

    this.sys.game.events.on('visible', () => {
      this.scene.wake();
      this.ui.resumeTimer();
    });    

    this.cameras.main.fadeIn(transitionTime, 0, 0, 0);
    setTimeout(() => {
      this.clock.startGame();
      this.ui.startGame();
    }, transitionTime);
  }

  update = () => {
    this.steam.update();

    if (!this.sceneOver) {
      this.clock.checkHands();
      this.ui.updateTimer();
      this.meter.update();
    }

    else {
      if (this.bgmVolume > 0) {
        this.AM.setVolume(this.AM.bgm, this.bgmVolume);
        this.bgmVolume = Math.max(0, this.bgmVolume - 1/(2*60));
      }
    }
  }

  setGameOver = () => {
    this.sceneOver = true;
    setTimeout(() => {
      this.AM.stopSound(this.AM.bgm);
      this.scene.start('scnGameOver', {score: this.ui.score, time: formatTime(this.ui.time)});
    }, 2500);
  }
}