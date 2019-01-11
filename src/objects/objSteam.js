import { appWidth, appHeight } from '../gameConfig';

const center = { 
  x: appWidth / 2,
  y: appHeight / 2
};

export default class objSteam {
  constructor(game) {
    this.game = game;
    this.isSteaming = false;

    this.clouds = game.add.particles('sprCloud');

    const _emitterBaseConfig = {
      on: false,
      y: center.y,
      speed: 400,
      lifespan: {min: 1500, max: 2500},
      scale: {start: 0.5, end: 1},
      rotate: {min: -90, max: 90},
      alpha: {start: 0.75, end: 0}
    };

    this.emitterL = this.clouds.createEmitter({
      ..._emitterBaseConfig,
      x: 0,
      angle: {min: -90, max: 90}
    });
    this.emitterR = this.clouds.createEmitter({
      ..._emitterBaseConfig,
      x: appWidth,
      angle: {min: 90, max: 270}
    });
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
    this.game.cameras.main.fade(2000, 255, 255, 255);
  }
}