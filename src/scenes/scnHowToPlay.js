import Phaser from 'phaser';
import { appCenter, appWidth, appHeight, themes } from '../gameConfig';
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
    this.startInputTimeout = setTimeout(() => this.canClick = true, transitionTime);

    this.add.text(appCenter.x, 64, 'How to Operate', {
      fontFamily: 'Fondamento',
      fontSize: '64px', 
      fill: themes.light.textColour
    }).setOrigin(0.5, 0.5);

    this.add.text(16, 240, '1. Move the hands of the\ndial over active lights to\nturn them off.', {
      fontFamily: 'Fondamento',
      fontSize: '36px', 
      fill: themes.light.textColour
    }).setOrigin(0, 0.5);

    this.add.image(appCenter.x - 108, 240, 'sprFigure1').setOrigin(0.5, 0.5);

    this.add.text(appCenter.x + 8, 240, '2. Don\'t let the lights flash,\nthat will increase the\npressure meter.', {
      fontFamily: 'Fondamento',
      fontSize: '36px', 
      fill: themes.light.textColour
    }).setOrigin(0, 0.5);

    this.fig2 = this.add.sprite(appWidth - 16, 240, 'sprFigure4').setOrigin(1.0, 0.5).play('anFigure2', true);
    this.fig2anim = true;
    this.fig2Timeout = setTimeout(this.toggleFig2, 2000);

    this.add.text(16, appCenter.y + 124, '3. Don\'t let the pressure\nmeter go critical, or the\nconsequences will be dire.', {
      fontFamily: 'Fondamento',
      fontSize: '36px', 
      fill: themes.light.textColour
    }).setOrigin(0, 0.5);

    this.add.sprite(appCenter.x - 108, appCenter.y + 124, 'sprFigure5a').setOrigin(0.5, 0.5).play('anFigure5');

    this.add.text(appCenter.x + 8, appCenter.y + 124, '4. Turning off special blue\nlights will relieve some\nof the pressure.', {
      fontFamily: 'Fondamento',
      fontSize: '36px', 
      fill: themes.light.textColour
    }).setOrigin(0, 0.5);

    this.add.image(appWidth - 16, appCenter.y + 124, 'sprFigure3').setOrigin(1.0, 0.5);

    const _menu = this.add.text(appCenter.x, appHeight * 0.925, 'Back to Main Menu', {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: themes.light.linkColour
    }).setOrigin(0.5, 0);

    setupButton(_menu, () => {
      if (this.canClick) {
        this.canClick = false;
        this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
        setTimeout(() => {
          this.scene.start('scnTitle');
          this.cleanUp();
        }, transitionTime * 1.5);
      }
    }, themes.light.linkColour, themes.light.hoverColour);
  }

  toggleFig2 = () => {
    this.fig2anim = !this.fig2anim;

    if (this.fig2anim) {
      this.fig2.play('anFigure2', true);
    }

    else {
      this.fig2.setTexture('sprFigure4');
      this.fig2.anims.stop(null, true);
    }

    this.fig2Timeout = setTimeout(this.toggleFig2, 2000);
  }

  cleanUp = () => {
    clearTimeout(this.startInputTimeout);
    clearTimeout(this.fig2Timeout);
  }
}