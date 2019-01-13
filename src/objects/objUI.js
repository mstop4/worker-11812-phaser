import { appHeight } from '../gameConfig';

export default class objUI {
  constructor(game) {
    this.game = game;
    this.score = 999999;
    this.time = 0;

    this.scoreLabel = game.add.text(12, 12, 'Score', {
      fontFamily: 'Fondamento',
      fontSize: '36px', 
      fill: '#000'
    });

    this.scoreValue = game.add.text(16, 48, this.score, {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: '#000'
    });

    this.timeLabel = game.add.text(12, appHeight-12, 'Time', {
      fontFamily: 'Fondamento',
      fontSize: '36px', 
      fill: '#FFF'
    }).setOrigin(0,1.0);

    this.timeValue = game.add.text(12, appHeight-52, this.time, {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: '#FFF'
    }).setOrigin(0,1.0);
  }

  updateScore = (delta) => {
    this.score += delta;
    this.scoreValue.setText(this.score);
  }
}