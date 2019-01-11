import Phaser from 'phaser';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnLoading');
  }

  preload = () => {
    this.load.image('back', 'assets/sprites/back.png');
    this.load.image('lightOff', 'assets/sprites/lightOff.png');
    this.load.image('lightOn', 'assets/sprites/lightOn.png');
    this.load.image('hand', 'assets/sprites/hand1.png');
    this.load.image('cap', 'assets/sprites/cap.png');
    this.load.image('meter', 'assets/sprites/meter.png');
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create = () => {
    WebFont.load({      //eslint-disable-line no-undef
      google: {
        families: ['Amarante', 'Fondamento']
      },

      active: () => {
        this.scene.start('scnMain');
      }
    });
  }
}