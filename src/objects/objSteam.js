import Phaser from 'phaser';
import { appCenter, appWidth, appHeight, transitionTime } from '../gameConfig';

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
        this.emitterL.setAlpha({start: 0.75, end: 0});
        this.emitterR.setAlpha({start: 0.75, end: 0});
        this.emitterL.setFrequency(1000/30);
        this.emitterR.setFrequency(1000/30);
      } 
      
      else {
        this.emitterL.setAlpha({start: 0.375 * intensity, end: 0});
        this.emitterR.setAlpha({start: 0.375 * intensity, end: 0});

        const _freq = 500 - (500 - 1000/15) * intensity;

        this.emitterL.frequency = _freq;
        this.emitterR.frequency = _freq;

        this.intensityThrottled = true;
        setTimeout(() => this.intensityThrottled = false, 250);
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
    this.scene.cameras.main.fadeOut(transitionTime / 2, 255, 255, 255);
  }

  update = () => {}

  destroy = () => {
    this.clouds.destroy();
    this.clouds = null;
  }
}