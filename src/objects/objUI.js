export default class objUI {
  constructor(game) {
    this.game = game;
    this.score = 0;

    this.scoreText = game.add.text(16, 16, `Score\n${this.score}`, {
      fontFamily: 'Fondamento',
      fontSize: '48px', 
      fill: '#000'
    });
  }

  updateScore = (delta) => {
    this.score += delta;
    this.scoreText.setText(`Score\n${this.score}`);
  }
}