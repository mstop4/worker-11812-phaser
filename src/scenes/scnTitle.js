import Phaser from 'phaser';
import { appCenter, appWidth, appHeight, themes } from '../gameConfig';
import { setupButton } from '../helpers/button';
import objSteam from '../objects/objSimpleSteam';
import objAudioManager from '../objects/objAudioManager';

const startTransitionTime = 1000;
const subMenuTransitionTime = 500;

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
      fill: themes[1].textColour
    }).setOrigin(0.5, 0.5);

    const _start = this.add.text(appCenter.x, appHeight * 0.6, 'Begin', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes[1].linkColour
    });

    const _howToPlay = this.add.text(appWidth * 0.35, appHeight * 0.75, 'How to Play', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes[1].linkColour
    });

    const _credits = this.add.text(appWidth * 0.65, appHeight * 0.75, 'Credits', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes[1].linkColour
    });

    setupButton(_start, () => {
      if (this.canClick) {
        this.sceneOver = true;
        this.cameras.main.fadeOut(startTransitionTime, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnMain');
        }, startTransitionTime * 1.25);
      }
    }, themes[1].linkColour, themes[1].hoverColour);

    setupButton(_howToPlay, () => {
      if (this.canClick) {
        this.sceneOver = true;
        this.cameras.main.fadeOut(subMenuTransitionTime, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnMain');
        }, subMenuTransitionTime * 1.5);
      }
    }, themes[1].linkColour, themes[1].hoverColour);

    setupButton(_credits, () => {
      if (this.canClick) {
        this.sceneOver = true;
        this.cameras.main.fadeOut(subMenuTransitionTime, 0, 0, 0);
        setTimeout(() => {
          this.destroy();
          this.scene.start('scnCredits');
        }, subMenuTransitionTime * 1.5);
      }
    }, themes[1].linkColour, themes[1].hoverColour);

    this.cameras.main.fadeIn(startTransitionTime, 0, 0, 0);
    setTimeout(() => {
      this.canClick = true;
    }, startTransitionTime * 1.25);
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