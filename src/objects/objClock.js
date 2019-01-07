import { pointLineDist } from '../helpers/geometry'; 

export class objClock {

  static clickRadius = 32;

  constructor(game, x, y, radius) {
    this.handSelected = -1;
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

    game.input.on('pointerdown', (pointer) => {
      const _secHandEndX = x + Math.cos(this.secondHand.angle * (Math.PI / 180)) * 360;
      const _secHandEndY = y + Math.sin(this.secondHand.angle * (Math.PI / 180)) * 360;
      const _secHandDist = pointLineDist(x, y, _secHandEndX, _secHandEndY, pointer.x, pointer.y);

      const _minHandEndX = x + Math.cos(this.minuteHand.angle * (Math.PI / 180)) * 360;
      const _minHandEndY = y + Math.sin(this.minuteHand.angle * (Math.PI / 180)) * 360;
      const _minHandDist = pointLineDist(x, y, _minHandEndX, _minHandEndY, pointer.x, pointer.y);

      const _hrHandEndX = x + Math.cos(this.hourHand.angle * (Math.PI / 180)) * 360;
      const _hrHandEndY = y + Math.sin(this.hourHand.angle * (Math.PI / 180)) * 360;
      const _hrHandDist = pointLineDist(x, y, _hrHandEndX, _hrHandEndY, pointer.x, pointer.y);

      const _minDist = Math.min(_secHandDist, _minHandDist, _hrHandDist);

      if (_minDist <= objClock.clickRadius) {
        if (_minDist === _secHandDist) {
          this.handSelected = 0;
        }
        else if (_minDist === _minHandDist) {
          this.handSelected = 1;
        }
        else {
          this.handSelected = 2;
        }
      }
      else {
        this.handSelected = -1;
      }
    });

    game.input.on('pointerup', () => {
      this.handSelected = -1;
    });

    game.input.on('pointermove', (pointer) => {
      switch (this.handSelected) {

      case 0:
        this.secondHand.angle = Math.atan2(pointer.y-y, pointer.x-x) * (180 / Math.PI);
        break;

      case 1:
        this.minuteHand.angle = Math.atan2(pointer.y-y, pointer.x-x) * (180 / Math.PI);
        break;

      case 2:
        this.hourHand.angle = Math.atan2(pointer.y-y, pointer.x-x) * (180 / Math.PI);
        break;
      }
    });
  }

  update = () => {
    //this.hourHand.angle += 0.1;
    //this.minuteHand.angle += 0.1;
  }
}