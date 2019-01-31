/// @desc  A lightweight version of objSteam that uses a tiled background instead of particles. Has the same interfaces as objSteam, making them easily swappable.

import { appCenter, appWidth, appHeight, gameOverTime } from '../gameConfig';

const cloudConfig = {
  xMax: 1279,
  yMax: 720,
  xSpeed: 1,
  ySpeed: 0.5,
  shakeMargin: 32,
  throttleInterval: 125
};

const shakeForce = 0.0075;

export default class objSimpleSteam {
  constructor(scene) {
    this.scene = scene;
    this.isSteaming = false;
    this.intensityThrottled = false;

    this.clouds = scene.add.tileSprite(appCenter.x, appCenter.y, appWidth + cloudConfig.shakeMargin, appHeight + cloudConfig.shakeMargin, 'sprCloudBack');
    this.clouds.setVisible(false);
    if (this.scene.clock) {
      this.scene.clock.face.setVisible(false);
    }
    this.setIntensity(0.0, true);
  }

  setIntensity = (intensity, force) => {
    if (!this.intensityThrottled || force) {
      if (intensity === -1) {
        this.clouds.setAlpha(1.0);
        if (this.scene.clock) {
          this.scene.clock.face.setAlpha(1.0);
        }
      } 
      
      else {
        this.clouds.setAlpha(intensity);
        if (this.scene.clock) {
          this.scene.clock.face.setAlpha(intensity);
        }

        this.intensityThrottled = true;
        setTimeout(() => this.intensityThrottled = false, cloudConfig.throttleInterval);
      }
    }
  }

  startSteam = () => {
    this.clouds.setVisible(true);
    if (this.scene.clock) {
      this.scene.clock.face.setVisible(true);
    }
    this.isSteaming = true;
  }

  stopSteam = () => {
    this.clouds.setVisible(false); 
    if (this.scene.clock) {
      this.scene.clock.face.setVisible(false);
    }  
    this.isSteaming = false;
  }

  fadeOut = () => {
    this.scene.cameras.main.shake(gameOverTime - 1000, shakeForce);
    this.scene.cameras.main.fadeOut(gameOverTime - 1000, 255, 255, 255);
  }

  update = () => {
    this.clouds.tilePositionX = (this.clouds.tilePositionX + cloudConfig.xSpeed) % cloudConfig.xMax;
    this.clouds.tilePositionY = (this.clouds.tilePositionY + cloudConfig.ySpeed) % cloudConfig.yMax;
  }

  destroy = () => {
    this.clouds.destroy();
    this.clouds = null;
  }
}