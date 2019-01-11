import Phaser from 'phaser';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnLoading');
  }

  preload = () => {
    this.load.image('sprBack', 'assets/sprites/back.png');
    this.load.image('sprLightOff', 'assets/sprites/lightOff.png');
    this.load.image('sprLightOn', 'assets/sprites/lightOn.png');
    this.load.image('sprHand', 'assets/sprites/hand1.png');
    this.load.image('sprCap', 'assets/sprites/cap.png');
    this.load.image('sprMeter', 'assets/sprites/meter.png');

    this.load.audio('sndBuzz', ['assets/audio/buzz.mp3', 'assets/audio/buzz.ogg']);
    this.load.audio('sndShort', ['assets/audio/short.mp3', 'assets/audio/short.ogg']);
    this.load.audio('sndDiffuse', ['assets/audio/diffuse.mp3', 'assets/audio/diffuse.ogg']);

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