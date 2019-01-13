import Phaser from 'phaser';
import { appCenter } from '../gameConfig';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnTitle');
  }

  create = () => {
    this.add.text(appCenter.x, appCenter.y, 'Clock Machine', {
      fontFamily: 'Amarante',
      fontSize: '72px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.input.on('pointerdown', () => {
      console.log("asds");
      this.scene.start('scnMain');
    });
  }
}