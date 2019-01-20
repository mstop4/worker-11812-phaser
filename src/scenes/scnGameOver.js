import Phaser from 'phaser';
import { appCenter, appWidth, appHeight } from '../gameConfig';
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
    setTimeout(() => this.canClick = true, transitionTime);

    this.add.text(appCenter.x, appHeight * 0.225, 'The End', {
      fontFamily: 'Fondamento',
      fontSize: '128px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.add.text(appWidth * 0.25, appHeight * 0.525, `Score: ${this.score}`, {
      fontFamily: 'Fondamento',
      fontSize: '64px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.add.text(appWidth * 0.75, appHeight * 0.525, `Time: ${this.hours}:${this.minutes}:${this.seconds}`, {
      fontFamily: 'Fondamento',
      fontSize: '64px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);  

    const _retry = this.add.text(appWidth * 0.35, appHeight * 0.8, 'Retry', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: '#FFF'
    });

    setupButton(_retry, () => {
      if (this.canClick) {
        this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
        setTimeout(() => this.scene.start('scnMain'), transitionTime * 1.5);
      }
    }, '#FFF', '#ACA');

    const _menu = this.add.text(appWidth * 0.65, appHeight * 0.8, 'Main Menu', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: '#FFF'
    });

    setupButton(_menu, () => {
      if (this.canClick) {
        this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
        setTimeout(() => this.scene.start('scnTitle'), transitionTime * 1.5);
      }
    }, '#FFF', '#ACA');
  }
}