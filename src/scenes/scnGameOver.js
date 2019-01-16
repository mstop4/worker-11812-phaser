import Phaser from 'phaser';
import { appCenter } from '../gameConfig';

export default class scnGameOver extends Phaser.Scene {
  constructor() {
    super('scnGameOver');
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#000');

    this.add.text(appCenter.x, appCenter.y, 'Moloch!!', {
      fontFamily: 'Amarante',
      fontSize: '72px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.input.on('pointerdown', () => {
      this.scene.start('scnTitle');
    });
  }
}