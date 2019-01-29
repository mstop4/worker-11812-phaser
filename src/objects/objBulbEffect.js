const stayParticleConfig = {
  on: false,
  frequency: 250,
  alpha: { start: 0.5, end: 0},
  lifespan: 1000,
  scale: {start: 0, end: 0.5},
  maxParticles: 5
};

const doneParticleConfig = {
  on: true,
  frequency: -1,
  alpha: { start: 0.5, end: 0},
  lifespan: 1000,
  scale: {start: 0, end: 1}
};

const max_emitters = 3;

export default class objBulbEffect {
  constructor(scene) {
    this.scene = scene;
    this.emitterStay = [];
    this.emitterDone = null;
    
    this.glow = scene.add.particles('sprGlow');

    for (let i = 0; i < max_emitters; i++) {
      this.emitterStay.push(this.glow.createEmitter({
        ...stayParticleConfig,
        x: 0,
        y: 0
      }));  
    }

    this.emitterDone = this.glow.createEmitter({
      ...doneParticleConfig,
      x: 100,
      y: 100
    });   
  }

  startStayEmitter = (x, y) => {
    for (let i = 0; i < max_emitters; i++) {
      if (!this.emitterStay[i].on) {
        this.emitterStay[i].setPosition(x, y);
        this.emitterStay[i].start();

        return i;
      }
    }

    return -1;
  }

  stopStayEmitter = (index) => {
    if (index > 0 && index < max_emitters) {
      this.emitterStay[index].stop();
      return -1;
    }

    return index;
  }

  pulseDoneEmitter = (x, y) => {
    this.emitterDone.explode(1, x, y);
  }

  destroy = () => {
    this.emitterStay = null;
    this.emitterDone = null;
  }
}