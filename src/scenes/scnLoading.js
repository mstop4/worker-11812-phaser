import Phaser from 'phaser';
import { appCenter, transitionTime } from '../gameConfig';

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnLoading');
  }

  preload = () => {
    this.add.text(appCenter.x, appCenter.y, 'Loading...', {
      fontFamily: 'Georgia',
      fontSize: '96px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.load.image('sprClockBack', 'assets/sprites/back.png');
    this.load.image('sprLightOff', 'assets/sprites/lightOff.png');
    this.load.image('sprLightOffSp', 'assets/sprites/lightOffSp.png');
    this.load.image('sprLightOn', 'assets/sprites/lightOn.png');
    this.load.image('sprLightOnSp', 'assets/sprites/lightOnSp.png');
    this.load.image('sprHand', 'assets/sprites/hand1.png');
    this.load.image('sprCap', 'assets/sprites/cap.png');
    this.load.image('sprMeterBack', 'assets/sprites/meter.png');
    this.load.image('sprMeterFront1', 'assets/sprites/meter2.png');
    this.load.image('sprMeterFront2', 'assets/sprites/meter3.png');
    this.load.image('sprMeterHalf', 'assets/sprites/meter4.png');
    this.load.image('sprZap', 'assets/sprites/zap.png');
    this.load.image('sprZap2', 'assets/sprites/zap2.png');
    //this.load.image('sprCloud', 'assets/sprites/cloud.png');
    this.load.image('sprCloudBack', 'assets/sprites/simplecloud.png');
    this.load.bitmapFont('fntMetroNums', 'assets/fonts/digits.png', 'assets/fonts/digits.xml');

    this.load.audio('musMain', ['assets/audio/music/bgm.mp3']);

    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create = () => {
    this.anims.create({
      key: 'anLightFlash',
      frames: [
        { key: 'sprLightOff' },
        { key: 'sprLightOn' },
      ],
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'anLightFlashSp',
      frames: [
        { key: 'sprLightOffSp' },
        { key: 'sprLightOnSp' },
      ],
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'anMeterFlash',
      frames: [
        { key: 'sprMeterFront1' },
        { key: 'sprMeterFront2' },
      ],
      frameRate: 12,
      repeat: -1
    });

    WebFont.load({      //eslint-disable-line no-undef
      google: {
        families: ['Amarante', 'Fondamento']
      },

      active: () => {
        this.cameras.main.fadeOut(transitionTime / 2, 0, 0, 0);
        setTimeout(() => {
          this.scene.start('scnTitle');
        }, transitionTime / 2 + 250);
      }
    });
  }
}