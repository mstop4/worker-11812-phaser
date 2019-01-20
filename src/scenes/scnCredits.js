import Phaser from 'phaser';
import { appCenter, appWidth, appHeight } from '../gameConfig';
import { setupButton } from '../helpers/button';

const transitionTime = 1000;

export default class scnGameOver extends Phaser.Scene {
  constructor() {
    super('scnCredits');
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#000000');
    this.cameras.main.fadeIn(transitionTime, 0, 0, 0);
    this.canClick = false;
    setTimeout(() => this.canClick = true, transitionTime);

    this.add.text(appCenter.x, appHeight * 0.225, 'Credits', {
      fontFamily: 'Fondamento',
      fontSize: '128px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    const _menu = this.add.text(appCenter.x, appHeight * 0.8, 'Main Menu', {
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