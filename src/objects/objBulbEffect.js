import Phaser from 'phaser';

const stayParticleConfig = {
  frequency: 250,
  alpha: { start: 0.5, end: 0},
  lifespan: 1000,
  scale: {start: 0, end: 0.5},
};
const doneParticleConfig = {
  frequency: -1,
  alpha: { start: 0.5, end: 0},
  lifespan: 1000,
  scale: {start: 0, end: 1},
};

export default class objSteam {
  constructor(scene) {
    this.scene = scene;
    this.emitterStay = [];
    this.emitterDone = [];
    this.emitterStaySp = [];
    this.emitterDoneSp = [];
    
    this.glow = scene.add.particles('sprGlow');

    this.emitterStay this.glow.
  }
}