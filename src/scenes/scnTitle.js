import Phaser from 'phaser';
import { appCenter, appHeight, transitionTime } from '../gameConfig';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnTitle');
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#000');

    this.add.text(appCenter.x, appHeight * 0.25, 'Worker 11812', {
      fontFamily: 'Amarante',
      fontSize: '96px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.add.text(appCenter.x, appHeight * 0.75, 'Click to begin', {
      fontFamily: 'Amarante',
      fontSize: '48px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.input.on('pointerdown', () => {
      this.cameras.main.fadeOut(transitionTime/2, 0, 0, 0);
      setTimeout(() => this.scene.start('scnMain'), transitionTime/2 + 250);
    });
  }
}