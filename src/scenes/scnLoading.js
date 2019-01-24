import Phaser from 'phaser';
import { appCenter, themes } from '../gameConfig';
import objAudioManager from '../objects/objAudioManager';
import * as WebFont from 'webfontloader';
window.WebFont = WebFont;

const transitionTime = 1000;

export default class scnLoading extends Phaser.Scene {
  constructor() {
    super('scnLoading');
  }

  preload = () => {
    this.add.text(appCenter.x, appCenter.y, 'Loading...', {
      fontFamily: 'Georgia',
      fontSize: '96px', 
      fill: themes.dark.textColour
    }).setOrigin(0.5, 0.5);

    this.load.image('sprClockBack', 'assets/sprites/back.png');
    this.load.image('sprLightOff', 'assets/sprites/lightOff.png');
    this.load.image('sprLightOffSp', 'assets/sprites/lightOffSp.png');
    this.load.image('sprLightOn', 'assets/sprites/lightOn.png');
    this.load.image('sprLightOnSp', 'assets/sprites/lightOnSp.png');
    this.load.image('sprHand', 'assets/sprites/hand1.png');
    this.load.image('sprHandS', 'assets/sprites/hand2.png');
    this.load.image('sprCap', 'assets/sprites/cap.png');
    this.load.image('sprMeterBack', 'assets/sprites/meter.png');
    this.load.image('sprMeterFront1', 'assets/sprites/meter2.png');
    this.load.image('sprMeterFront2', 'assets/sprites/meter3.png');
    this.load.image('sprMeterHalf', 'assets/sprites/meter4.png');
    this.load.image('sprZap', 'assets/sprites/zap.png');
    this.load.image('sprZap2', 'assets/sprites/zap2.png');
    //this.load.image('sprCloud', 'assets/sprites/cloud.png');
    this.load.image('sprCloudBack', 'assets/sprites/simplecloud.png');
    this.load.image('sprFigure1', 'assets/sprites/figure-1.png');
    this.load.image('sprFigure2a', 'assets/sprites/figure-2a.png');
    this.load.image('sprFigure2b', 'assets/sprites/figure-2b.png');
    this.load.image('sprFigure3', 'assets/sprites/figure-3.png');
    this.load.image('sprFigure4', 'assets/sprites/figure-4.png');
    this.load.image('sprFigure5a', 'assets/sprites/figure-5a.png');
    this.load.image('sprFigure5b', 'assets/sprites/figure-5b.png');

    this.load.bitmapFont('fntMetroNums', 'assets/fonts/digits.png', 'assets/fonts/digits.xml');

    this.load.audio('musMain', ['assets/audio/music/bgm.ogg', 'assets/audio/music/bgm.mp3']);
    this.load.audio('musTitle', ['assets/audio/music/bgm2.ogg', 'assets/audio/music/bgm2.mp3']);
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

    this.anims.create({
      key: 'anFigure2',
      frames: [
        { key: 'sprFigure2a' },
        { key: 'sprFigure2b' },
      ],
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'anFigure5',
      frames: [
        { key: 'sprFigure5a' },
        { key: 'sprFigure5b' },
      ],
      frameRate: 12,
      repeat: -1
    });

    this.game.audioManager = new objAudioManager(this.sound);

    WebFont.load({      //eslint-disable-line no-undef
      google: {
        families: ['Fondamento']
      },

      active: () => {
        this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
        setTimeout(() => {
          this.scene.start('scnTitle');
        }, transitionTime * 1.25);
      }
    });
  }
}