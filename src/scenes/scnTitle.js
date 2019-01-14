import Phaser from 'phaser';
import { appCenter } from '../gameConfig';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnTitle');
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#687D64');

    this.add.text(appCenter.x, appCenter.y, 'Clock Machine', {
      fontFamily: 'Amarante',
      fontSize: '72px', 
      fill: '#000'
    }).setOrigin(0.5, 0.5);

    this.input.on('pointerdown', () => {
      this.scene.start('scnMain');
    });
  }
}