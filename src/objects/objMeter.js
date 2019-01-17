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
  constructor(scene, x, y) {
    this.scene = scene;
    this.progress = 0;
    this.maxProgress = meterFrontInfo.zeroPoint - meterFrontInfo.maxPoint;
    this.isFlashing = false;

    scene.add.image(x, y + 13, 'sprMeterHalf');
    scene.add.image(x, y, 'sprMeterBack');
    scene.add.image(x - 216, y - 264, 'sprZap');
    scene.add.image(x + 216, y - 264, 'sprZap').setScale(-1.0, 1.0);
    scene.add.image(x - 120, y - 56, 'sprZap2');
    scene.add.image(x + 120, y - 56, 'sprZap2').setScale(-1.0, 1.0);
    this.meterFront = scene.add.sprite(x + meterFrontInfo.x, y + meterFrontInfo.y, 'sprMeterFront1');
    this.meterFront.setCrop(0, meterFrontInfo.zeroPoint, 64, meterFrontInfo.height);
  }

  updateMeter = (delta) => {
    this.progress = Math.min(this.progress + delta, this.maxProgress);
    this.meterFront.setCrop(0, meterFrontInfo.zeroPoint - this.progress, 64, meterFrontInfo.height);

    if (this.progress >= this.maxProgress) {
      this.scene.setGameOver();
      this.scene.steam.setIntensity(-1);
      setTimeout(this.scene.steam.fadeOut, 1000);
    }

    else {
      const _ratio = Math.min(this.progress / (meterFrontInfo.zeroPoint - meterFrontInfo.hundredPoint), 1);

      if (_ratio >= 1.0 && !this.isFlashing) {
        this.meterFront.play('meterFlash', true);
        this.isFlashing = true;
      }

      if (_ratio >= 0.5) {
        if (!this.scene.steam.isSteaming) {
          this.scene.steam.startSteam();
        }

        this.scene.steam.setIntensity((_ratio - 0.5) * 2);
      }
    }
  }
}