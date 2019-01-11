export default class objMeter {
  constructor(game, x, y) {
    /*this.game = game;
    this.x = x;
    this.y = y;*/
    this.progress = 0;
    this.maxProgress = 640;

    this.meter = game.add.image(x, y, 'meter');
    this.meter.setCrop(0, 640 - this.progress, 64, this.progress);
  }

  updateMeter = (delta) => {
    this.progress = Math.min(this.progress + delta, this.maxProgress);
    this.meter.setCrop(0, 640 - this.progress, 64, this.progress);
  }
}