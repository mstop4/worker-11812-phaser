import Phaser from 'phaser';
import { appCenter, appHeight, themes } from '../gameConfig';
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
    this.startInputTimeout = setTimeout(() => this.canClick = true, transitionTime);

    this.add.text(appCenter.x, appHeight * 0.075, 'Programming & Art: M.S.T.O.P.', {
      fontFamily: 'Fondamento',
      fontSize: '56px', 
      fill: themes[0].linkColour
    }).setOrigin(0.5, 0);

    this.add.text(appCenter.x, appHeight * 0.23, 'Music:', {
      fontFamily: 'Fondamento',
      fontSize: '56px', 
      fill: themes[0].textColour
    }).setOrigin(0.5, 0);

    this.add.text(appCenter.x, appHeight * 0.23 + 72, '"Night in the City"\n"No End in Sight"', {
      fontFamily: 'Fondamento',
      fontSize: '40px', 
      fill: themes[0].textColour
    }).setOrigin(0.5, 0);

    this.add.text(appCenter.x, appHeight * 0.48, 'by: Purple Planet Music', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes[0].textColour,
      align: 'center'
    }).setOrigin(0.5, 0);

    const _pp = this.add.text(appCenter.x, appHeight * 0.48 + 80, 'https://www.purple-planet.com/', {
      fontFamily: 'Fondamento',
      fontSize: '40px', 
      fill: themes[0].linkColour
    }).setOrigin(0.5, 0);

    setupButton(_pp, () => {
      if (this.canClick) {
        window.open('https://www.purple-planet.com/', '_blank');
      }
    }, themes[0].linkColour, themes[0].hoverColour);

    const _phaser = this.add.text(appCenter.x, appHeight * 0.75, 'Made with Phaser 3', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes[0].linkColour
    }).setOrigin(0.5, 0);

    setupButton(_phaser, () => {
      if (this.canClick) {
        window.open('https://phaser.io/', '_blank');
      }
    }, themes[0].linkColour, themes[0].hoverColour);

    const _menu = this.add.text(appCenter.x, appHeight * 0.9, 'Back to Main Menu', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes[0].linkColour
    }).setOrigin(0.5, 0);

    setupButton(_menu, () => {
      if (this.canClick) {
        this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
        setTimeout(() => {
          this.scene.start('scnTitle');
          this.cleanUp();
        }, transitionTime * 1.5);
      }
    }, themes[0].linkColour, themes[0].hoverColour);
  }

  cleanUp = () => {
    clearTimeout(this.startInputTimeout);
  }
}