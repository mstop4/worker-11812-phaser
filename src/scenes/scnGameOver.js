import Phaser from 'phaser';
import { appCenter, appWidth, appHeight, themes } from '../gameConfig';
import { setupButton } from '../helpers/button';

const transitionTime = 1000;

export default class scnGameOver extends Phaser.Scene {
  constructor() {
    super('scnGameOver');
  }

  init = (data) => {
    this.score = data.score;
    this.hours = data.time.hours;
    this.minutes = data.time.minutes;
    this.seconds = data.time.seconds;
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#000');
    this.cameras.main.fadeIn(transitionTime, 255, 255, 255);
    this.canClick = false;
    this.startInputTimeout = setTimeout(() => this.canClick = true, transitionTime);

    this.add.text(appCenter.x, appHeight * 0.225, 'The End', {
      fontFamily: 'Fondamento',
      fontSize: '128px', 
      fill: themes.dark.textColour
    }).setOrigin(0.5, 0.5);

    this.add.text(appWidth * 0.25, appHeight * 0.525, `Score: ${this.score}`, {
      fontFamily: 'Fondamento',
      fontSize: '64px', 
      fill: themes.dark.textColour
    }).setOrigin(0.5, 0.5);

    this.add.text(appWidth * 0.75, appHeight * 0.525, `Time: ${this.hours}:${this.minutes}:${this.seconds}`, {
      fontFamily: 'Fondamento',
      fontSize: '64px', 
      fill: themes.dark.textColour
    }).setOrigin(0.5, 0.5);  

    const _retry = this.add.text(appWidth * 0.35, appHeight * 0.8, 'Retry', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes.dark.linkColour
    });

    setupButton(_retry, () => {
      if (this.canClick) {
        this.canClick = false;
        this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
        setTimeout(() => {
          this.scene.start('scnMain');
          this.cleanUp();
        }, transitionTime * 1.5);
      }
    }, themes.dark.linkColour, themes.dark.hoverColour);

    const _menu = this.add.text(appWidth * 0.65, appHeight * 0.8, 'Main Menu', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes.dark.hoverColour
    });

    setupButton(_menu, () => {
      if (this.canClick) {
        this.canClick = false;
        this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
        setTimeout(() => {
          this.scene.start('scnTitle');
          this.cleanUp();
        }, transitionTime * 1.5);
      }
    }, themes.dark.linkColour, themes.dark.hoverColour);
  }

  cleanUp = () => {
    clearTimeout(this.startInputTimeout);
  }
}