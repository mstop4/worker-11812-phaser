import Phaser from 'phaser';
import { appCenter, gameOverTime } from '../gameConfig';
import { formatTime } from '../helpers/math';

import objClock from '../objects/objClock';
import objMeter from '../objects/objMeter';
import objUI from '../objects/objUI';
import objSteam from '../objects/objSimpleSteam';

const transitionTime = 1000;
const musicTrack = 'musMain';

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
    this.meter = new objMeter(this, 1080, appCenter.y);
    this.clock = new objClock(this, appCenter.x - 120, appCenter.y);
    this.steam = new objSteam(this);
    this.ui = new objUI(this);

    this.bgmVolume = 1;
    this.AM.playMusic(musicTrack, true);
    this.AM.setVolume(musicTrack, this.bgmVolume);

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
        this.AM.setVolume(musicTrack, this.bgmVolume);
        this.bgmVolume = Math.max(0, this.bgmVolume - 1/(gameOverTime*0.06));
      }
    }
  }

  setGameOver = () => {
    this.sceneOver = true;
    setTimeout(() => {
      this.AM.stopMusic(musicTrack);
      this.scene.start('scnGameOver', {score: this.ui.score, time: formatTime(this.ui.time)});
    }, gameOverTime);
  }
}