export class objClock {

  constructor(game, x, y, radius) {
    this.lmbDown = false;
    this.lights = game.add.group();

    for (let i=0; i<45; i++) {
      const _rad = (90-i*8) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * radius;
      const _offset_y = -Math.sin(_rad) * radius;

      this.lights.create(x + _offset_x, y + _offset_y, 'light');
    }

    this.hourHand = game.add.image(x, y, 'hand');
    this.hourHand.setOrigin(0, 0.5);

    this.minuteHand = game.add.image(x, y, 'hand');
    this.minuteHand.setOrigin(0, 0.5);
    this.minuteHand.angle = 180;

    this.secondHand = game.add.image(x, y, 'hand');
    this.secondHand.setOrigin(0, 0.5);
    this.secondHand.angle = 90;

    game.input.on('pointerdown', () => {
      this.lmbDown = true;
    });

    game.input.on('pointerup', () => {
      this.lmbDown = false;
    });

    game.input.on('pointermove', (pointer) => {
      if (this.lmbDown) {
        this.secondHand.angle = Math.atan2(pointer.y-y, pointer.x-x) * (180 / Math.PI);
      }
    });
  }

  update = () => {
    this.hourHand.angle += 0.1;
    this.minuteHand.angle += 0.1;
  }
}