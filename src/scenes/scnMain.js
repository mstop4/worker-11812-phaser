import Phaser from 'phaser';
import * as gameConfig from '../gameConfig';
import { objClock } from '../objects/objClock';

export class scnMain extends Phaser.Scene {

  static center = { 
    x: gameConfig.appWidth / 2,
    y: gameConfig.appHeight / 2
  }

  constructor() {
    super();
    this.clock = null;
  }

  preload = () => {
    this.load.image('back', 'assets/sprites/back.png');
    this.load.image('lightOff', 'assets/sprites/lightOff.png');
    this.load.image('lightOn', 'assets/sprites/lightOn.png');
    this.load.image('hand', 'assets/sprites/hand1.png');
    this.load.image('cap', 'assets/sprites/cap.png');
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create = () => {
    this.add.image(scnMain.center.x, scnMain.center.y, 'back');
    this.clock = new objClock(this, scnMain.center.x, scnMain.center.y);

    WebFont.load({      //eslint-disable-line no-undef
      google: {
        families: ['Amarante']
      },

      active: () => {
        this.clock.createLabels(this);
      }
    });
  }

  update = () => {
    this.clock.checkHands();
  }
}