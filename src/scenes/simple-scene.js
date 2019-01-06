import Phaser from 'phaser';

export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('sky', 'assets/sprites/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/sprites/red.png');
  }

  create() {
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    const logo = this.add.image(400, 100, 'logo');

    //logo.setVelocity(100, 200);
    //logo.setBounce(1, 1);
    //logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}