import { appHeight } from '../gameConfig';
import { formatTime } from '../helpers/math';

export default class objUI {
  constructor(game) {
    this.game = game;
    this.score = 0;
    this.time = 0;
    this.startTime = Date.now();

    this.scoreLabel = game.add.text(12, 12, 'Score', {
      fontFamily: 'Fondamento',
      fontSize: '24px', 
      fill: '#000'
    });

    this.scoreValue = game.add.bitmapText(8, 32, 'fntMetroNums', this.score);

    this.timeLabel = game.add.text(12, appHeight-12, 'Time', {
      fontFamily: 'Fondamento',
      fontSize: '24px', 
      fill: '#000'
    }).setOrigin(0,1.0);

    this.timeValue = game.add.bitmapText(8, appHeight-36, 'fntMetroNums', this.time).setOrigin(0,1.0);
  }

  updateTimer = () => {
    this.time = Math.floor((Date.now() - this.startTime) / 1000);
    const _formattedTime = formatTime(this.time);
    this.timeValue.setText(`${_formattedTime.hours}:${_formattedTime.minutes}:${_formattedTime.seconds}`);
  }

  updateScore = (delta) => {
    this.score += delta;
    this.scoreValue.setText(this.score);
  }
}