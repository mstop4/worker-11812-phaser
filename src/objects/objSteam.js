import Phaser from 'phaser';
import { appWidth, appHeight } from '../gameConfig';

const center = { 
  x: appWidth / 2,
  y: appHeight / 2
};

export default class objSteam {
  constructor(scene) {
    this.scene = scene;
    this.isSteaming = false;

    this.clouds = scene.add.particles('sprCloud');

    const _emitterBaseConfig = {
      on: false,
      y: center.y,
      speed: 400,
      lifespan: {min: 1500, max: 2500},
      scale: {start: 0.5, end: 1},
      rotate: {min: -90, max: 90},
      alpha: {start: 0.75, end: 0},
      maxParticles: 50,
      frequency: 1000/15
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

    this.setIntensity(0);
  }

  setIntensity = (intensity) => {
    if (intensity === -1) {
      this.emitterL.setAlpha({start: 0.75, end: 0});
      this.emitterR.setAlpha({start: 0.75, end: 0});
      this.emitterL.setFrequency(1000/30);
      this.emitterR.setFrequency(1000/30);
    } 
    
    else {
      this.emitterL.setAlpha({start: 0.375 * intensity, end: 0});
      this.emitterR.setAlpha({start: 0.375 * intensity, end: 0});

      //const _freq = 1000 - (1000 - 1000/30) * intensity;

      //this.emitterL.setFrequency(_freq);
      //this.emitterR.setFrequency(_freq);
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
    this.scene.cameras.main.fade(2000, 255, 255, 255);
  }
}