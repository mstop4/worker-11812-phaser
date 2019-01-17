import Phaser from 'phaser';
import { appCenter, appHeight, transitionTime } from '../gameConfig';
import objSteam from '../objects/objSteam';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnTitle');
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#687D64');
    this.canClick = false;

    this.steam = new objSteam(this);
    this.steam.startSteam();
    this.steam.setIntensity(0.5);

    this.add.text(appCenter.x, appHeight * 0.25, 'Worker 11812', {
      fontFamily: 'Amarante',
      fontSize: '96px', 
      fill: '#000'
    }).setOrigin(0.5, 0.5);

    this.add.text(appCenter.x, appHeight * 0.75, 'Click to begin', {
      fontFamily: 'Amarante',
      fontSize: '48px', 
      fill: '#000'
    }).setOrigin(0.5, 0.5);

    this.input.on('pointerdown', () => {
      if (this.canClick) {
        this.cameras.main.fadeOut(transitionTime/2, 0, 0, 0);
        setTimeout(() => this.scene.start('scnMain'), transitionTime/2 + 250);
      }
    });

    this.cameras.main.fadeIn(transitionTime, 0, 0, 0);
    setTimeout(() => {
      this.canClick = true;
    }, transitionTime + 250);
  }
}