import { appHeight } from '../gameConfig';
import { formatTime } from '../helpers/math';

export default class objUI {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.time = 0;
    this.timeBuffer = 0;
    this.refTime = 0;
    this.timerRunning = false;

    this.scoreLabel = scene.add.text(12, 12, 'Score', {
      fontFamily: 'Fondamento',
      fontSize: '24px', 
      fill: '#000'
    });

    this.scoreValue = scene.add.bitmapText(8, 32, 'fntMetroNums', this.score);

    this.timeLabel = scene.add.text(12, appHeight-12, 'Time', {
      fontFamily: 'Fondamento',
      fontSize: '24px', 
      fill: '#000'
    }).setOrigin(0,1.0);

    this.timeValue = scene.add.bitmapText(8, appHeight-36, 'fntMetroNums', '0:00:00').setOrigin(0,1.0);
  }

  pauseTimer = () => {
    this.timeBuffer = Date.now() - this.refTime;
  }

  resumeTimer = () => {
    this.refTime = Date.now();
  }

  updateTimer = () => {
    if (this.timerRunning) {
      this.time = Math.floor((Date.now() - this.refTime + this.timeBuffer) / 1000);
      const _formattedTime = formatTime(this.time);
      this.timeValue.setText(`${_formattedTime.hours}:${_formattedTime.minutes}:${_formattedTime.seconds}`);
    }
  }

  updateScore = (delta) => {
    this.score += delta;
    this.scoreValue.setText(this.score);
  }

  startGame = () => {
    this.refTime = Date.now();
    this.timerRunning = true;
  }
}