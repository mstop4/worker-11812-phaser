const meterFrontInfo = {
  x: 0,
  y: 3,
  width: 56,
  height: 616,
  zeroPoint: 580,
  hundredPoint: 59,
  maxPoint: 0
};

export default class objMeter {
  constructor(game, x, y) {
    this.game = game;
    /*this.x = x;
    this.y = y;*/
    this.progress = 0;
    this.maxProgress = meterFrontInfo.zeroPoint - meterFrontInfo.maxPoint;

    this.meterBack = game.add.image(x, y, 'sprMeterBack');
    this.meterFront = game.add.image(x + meterFrontInfo.x, y + meterFrontInfo.y, 'sprMeterFront');
    this.meterFront.setCrop(0, meterFrontInfo.zeroPoint, 64, meterFrontInfo.height);
  }

  updateMeter = (delta) => {
    this.progress = Math.min(this.progress + delta, this.maxProgress);
    this.meterFront.setCrop(0, meterFrontInfo.zeroPoint - this.progress, 64, meterFrontInfo.height);

    if (this.progress === this.maxProgress && !this.game.steam.isSteaming) {
      this.game.setGameOver();
      this.game.steam.startSteam();
      setTimeout(this.game.steam.fadeOut, 1000);
    }
  }
}