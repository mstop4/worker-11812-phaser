const meterConfig = {
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
    this.actualProgress = 0;
    this.maxProgress = meterConfig.zeroPoint - meterConfig.maxPoint;
    this.isFlashing = false;

    scene.add.image(x, y + 13, 'sprMeterHalf');
    scene.add.image(x, y, 'sprMeterBack');
    scene.add.image(x - 216, y - 264, 'sprZap');
    scene.add.image(x + 216, y - 264, 'sprZap').setScale(-1.0, 1.0);
    scene.add.image(x - 120, y - 56, 'sprZap2');
    scene.add.image(x + 120, y - 56, 'sprZap2').setScale(-1.0, 1.0);
    this.meterFront = scene.add.sprite(x + meterConfig.x, y + meterConfig.y, 'sprMeterFront1');
    this.meterFront.setCrop(0, meterConfig.zeroPoint, 64, meterConfig.height);
  }

  updateMeter = (delta) => {
    this.actualProgress = Math.max(Math.min(this.actualProgress  + delta, this.maxProgress), 0);
  }

  update = () => {
    const _diff = this.actualProgress - this.progress;

    if (Math.abs(_diff) < 1) {
      this.progress = this.actualProgress;
    }

    else {
      this.progress += _diff / 8;
    }

    this.meterFront.setCrop(0, meterConfig.zeroPoint - this.progress, 64, meterConfig.height);

    if (this.progress >= this.maxProgress && !this.scene.sceneOver) {
      this.scene.setGameOver();
      this.scene.steam.setIntensity(-1, true);
      setTimeout(this.scene.steam.fadeOut, 500);
    }

    else {
      const _ratio = Math.min(this.progress / (meterConfig.zeroPoint - meterConfig.hundredPoint), 1);

      if (_ratio >= 1.0 && !this.isFlashing) {
        this.meterFront.play('anMeterFlash', true);
        this.isFlashing = true;
      }

      else if (_ratio < 1.0 && this.isFlashing) {
        this.meterFront.setTexture('sprMeterFront1');
        this.meterFront.anims.stop(null, true);
        this.isFlashing = false;
      }

      if (_ratio >= 0.5) {
        if (!this.scene.steam.isSteaming) {
          this.scene.steam.startSteam();
        }

        this.scene.steam.setIntensity((_ratio - 0.5) * 2, false);
      }

      else if (_ratio < 0.5) {
        if (this.scene.steam.isSteaming) {
          this.scene.steam.stopSteam();
        }
      }
    }
  }
}