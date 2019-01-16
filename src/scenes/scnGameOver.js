import Phaser from 'phaser';
import { appCenter, appWidth, appHeight, transitionTime } from '../gameConfig';

export default class scnGameOver extends Phaser.Scene {
  constructor() {
    super('scnGameOver');
  }

  init = (data) => {
    this.score = data.score;
    this.hours = data.time.hours;
    this.minutes = data.time.minutes;
    this.seconds = data.time.seconds;
  }

  create = () => {
    this.cameras.main.setBackgroundColor('#000');
    this.cameras.main.fadeIn(transitionTime, 255, 255, 255);

    this.add.text(appCenter.x, appHeight * 0.225, 'The End', {
      fontFamily: 'Amarante',
      fontSize: '128px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.add.text(appWidth * 0.25, appHeight * 0.525, `Score: ${this.score}`, {
      fontFamily: 'Amarante',
      fontSize: '64px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);

    this.add.text(appWidth * 0.75, appHeight * 0.525, `Time: ${this.hours}:${this.minutes}:${this.seconds}`, {
      fontFamily: 'Amarante',
      fontSize: '64px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);  

    this.add.text(appCenter.x, appHeight * 0.8, 'Click to restart', {
      fontFamily: 'Amarante',
      fontSize: '96px', 
      fill: '#FFF'
    }).setOrigin(0.5, 0.5);      

    this.input.on('pointerdown', () => {
      this.cameras.main.fadeOut(transitionTime, 0, 0, 0);
      setTimeout(() => this.scene.start('scnMain'), transitionTime + 500);
    });
  }
}