import Phaser from 'phaser';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnTitle');
  }

  create = () => {
    this.add.text(640, 360, 'Clock Machine', {
      fontFamily: 'Amarante',
      fontSize: '72px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);
  }
}