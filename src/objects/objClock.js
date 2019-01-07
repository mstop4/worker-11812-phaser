import { pointLineDist } from '../helpers/geometry'; 

export class objClock {

  static clickRadius = 32;

  constructor(game, x, y, radius) {
    this.lights = game.add.group();

    for (let i=0; i<45; i++) {
      const _rad = (90-i*8) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * radius;
      const _offset_y = -Math.sin(_rad) * radius;

      this.lights.create(x + _offset_x, y + _offset_y, 'lightOff');
    }

    this.lights.children.entries[0].setTexture('lightOn');

    this.handSelected = -1;
    this.handAngles = [0, 90, 180];
    this.hands = [];

    for (var i=0; i<3; i++) {
      this.hands[i] = game.add.image(x, y, 'hand');
      this.hands[i].setOrigin(0, 0.5);
      this.hands[i].angle = this.handAngles[i];
    }

    game.input.on('pointerdown', (pointer) => {
      // Find and select closest hand
      const _handsDist = [];

      for (var i=0; i<3; i++) {
        const _endX = x + Math.cos(this.hands[i].angle * (Math.PI / 180)) * 360;
        const _endY = y + Math.sin(this.hands[i].angle * (Math.PI / 180)) * 360;
        _handsDist[i] = pointLineDist(x, y, _endX, _endY, pointer.x, pointer.y);
      }

      const _minDist = Math.min(..._handsDist);

      if (_minDist <= objClock.clickRadius) {
        this.handSelected = _handsDist.indexOf(_minDist);
      }
      else {
        this.handSelected = -1;
      }
    });

    game.input.on('pointerup', () => {
      this.handSelected = -1;
    });

    game.input.on('pointermove', (pointer) => {
      if (this.handSelected > -1) {
        this.handAngles[this.handSelected] = Math.atan2(pointer.y-y, pointer.x-x) * (180 / Math.PI);
        this.hands[this.handSelected].angle = this.handAngles[this.handSelected];
      }
    });
  }

  update = () => {
  }
}