import Phaser from 'phaser';
import { appCenter, appHeight, themes } from '../gameConfig';
import { setupButton } from '../helpers/button';

const transitionTime = 1000;

export default class scnHowToPlay extends Phaser.Scene {
  constructor() {
    super('scnHowToPlay');
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#687D64');
    this.cameras.main.fadeIn(transitionTime, 0, 0, 0);
    this.canClick = false;
    setTimeout(() => this.canClick = true, transitionTime);

    this.add.text(appCenter.x, appHeight * 0.1, '1. ', {
      fontFamily: 'Fondamento',
      fontSize: '36px', 
      fill: themes[1].textColour
    }).setOrigin(0.5, 0);

    const _menu = this.add.text(appCenter.x, appHeight * 0.9, 'Back to Main Menu', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes[1].linkColour
    }).setOrigin(0.5, 0);

    setupButton(_menu, () => {
      if (this.canClick) {
        this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
        setTimeout(() => this.scene.start('scnTitle'), transitionTime * 1.5);
      }
    }, themes[1].linkColour, themes[1].hoverColour);
  }
}