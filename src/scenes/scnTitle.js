import Phaser from 'phaser';
import { appCenter, appWidth, appHeight, transitionTime } from '../gameConfig';
import { setupButton } from '../helpers/button';
import objSteam from '../objects/objSimpleSteam';
import objAudioManager from '../objects/objAudioManager';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnTitle');
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#687D64');
    this.canClick = false;
    this.sceneOver = false;

    this.steam = new objSteam(this);
    this.steam.startSteam();
    this.steam.setIntensity(0.5, true);
    this.audioManager = new objAudioManager(this);

    this.bgm = this.audioManager.playSound('musTitle', true);
    this.bgmVolume = 1;

    this.add.text(appCenter.x, appHeight * 0.25, 'Worker 11812', {
      fontFamily: 'Fondamento',
      fontSize: '96px', 
      fill: '#000'
    }).setOrigin(0.5, 0.5);

    const _start = this.add.text(appCenter.x, appHeight * 0.6, 'Begin', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: '#000'
    });

    const _howToPlay = this.add.text(appWidth * 0.35, appHeight * 0.75, 'How to Play', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: '#000'
    });

    const _credits = this.add.text(appWidth * 0.65, appHeight * 0.75, 'Credits', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: '#000'
    });

    setupButton(_start, () => {
      if (this.canClick) {
        this.sceneOver = true;
        this.cameras.main.fadeOut(transitionTime/2, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnMain');
        }, transitionTime/2 + 250);
      }
    });

    setupButton(_howToPlay, () => {
      if (this.canClick) {
        this.sceneOver = true;
        this.cameras.main.fadeOut(transitionTime/4, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnMain');
        }, transitionTime/2 + 250);
      }
    });

    setupButton(_credits, () => {
      if (this.canClick) {
        this.sceneOver = true;
        this.cameras.main.fadeOut(transitionTime/4, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnMain');
        }, transitionTime/2 + 250);
      }
    });

    this.cameras.main.fadeIn(transitionTime, 0, 0, 0);
    setTimeout(() => {
      this.canClick = true;
    }, transitionTime + 250);
  }

  update = () => {
    this.steam.update();

    if (this.sceneOver) {
      if (this.bgmVolume > 0) {
        this.audioManager.setVolume(this.bgm, this.bgmVolume);
        this.bgmVolume = Math.max(0, this.bgmVolume - 1/60);
      }
    }
  }

  destroy = () => {
    this.audioManager.stopSound(this.bgm);
    this.steam = null;
    this.audioManager = null;
  }
}