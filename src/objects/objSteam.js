import Phaser from 'phaser';
import { appCenter, appWidth, appHeight, gameOverTime } from '../gameConfig';

const shakeForce = 0.0075;

const steamConfig = {
  minFreq: 500,
  maxFreq: 1000/15,
  gameOverFreq: 1000/30,
  maxAlpha: 0.375,
  gameOverAlpha: 0.75,
  throttleInterval: 250
};

export default class objSteam {
  constructor(scene) {
    this.scene = scene;
    this.isSteaming = false;
    this.intensityThrottled = false;

    this.clouds = scene.add.particles('sprCloud');

    const _emitterBaseConfig = {
      on: false,
      y: appCenter.y,
      speed: 400,
      lifespan: {min: 1500, max: 2500},
      scale: {start: 0.5, end: 1},
      rotate: {min: -90, max: 90},
      alpha: {start: 0.75, end: 0},
      maxParticles: 50,
      frequency: 1000
    };

    const _emitterDeathZone = {
      source: new Phaser.Geom.Rectangle(0, 0, appWidth, appHeight),
      type: 'onLeave'
    };

    this.emitterL = this.clouds.createEmitter({
      ..._emitterBaseConfig,
      x: 0,
      angle: {min: -90, max: 90}
    }).setDeathZone(_emitterDeathZone);

    this.emitterR = this.clouds.createEmitter({
      ..._emitterBaseConfig,
      x: appWidth,
      angle: {min: 90, max: 270}
    }).setDeathZone(_emitterDeathZone);

    this.setIntensity(0.0, true);
  }

  setIntensity = (intensity, force) => {
    if (!this.intensityThrottled || force) {
      if (intensity === -1) {
        this.emitterL.setAlpha({start: steamConfig.gameOverAlpha, end: 0});
        this.emitterR.setAlpha({start: steamConfig.gameOverAlpha, end: 0});
        this.emitterL.setFrequency(steamConfig.gameOverFreq);
        this.emitterR.setFrequency(steamConfig.gameOverFreq);
      } 
      
      else {
        this.emitterL.setAlpha({start: steamConfig.maxAlpha * intensity, end: 0});
        this.emitterR.setAlpha({start: steamConfig.maxAlpha * intensity, end: 0});

        const _freq = steamConfig.minFreq - (steamConfig.minFreq - steamConfig.maxFreq) * intensity;

        this.emitterL.frequency = _freq;
        this.emitterR.frequency = _freq;

        this.intensityThrottled = true;
        setTimeout(() => this.intensityThrottled = false, steamConfig.throttleInterval);
      }
    }
  }

  startSteam = () => {
    this.emitterL.start();
    this.emitterR.start();
    this.isSteaming = true;
  }

  stopSteam = () => {
    this.emitterL.stop();
    this.emitterR.stop();    
    this.isSteaming = false;
  }

  fadeOut = () => {
    this.scene.cameras.main.shake(gameOverTime - 1000, shakeForce);
    this.scene.cameras.main.fadeOut(gameOverTime - 1000, 255, 255, 255);
  }

  update = () => {}

  destroy = () => {
    this.clouds.destroy();
    this.clouds = null;
  }
}