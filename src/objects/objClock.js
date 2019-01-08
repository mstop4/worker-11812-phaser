import { pointLineDist } from '../helpers/geometry'; 

const clickRadius = 32;
const lightRadius = 300;
const labelRadius = 340;

export class objClock {
  constructor(game, x, y) {
    this.x = x;
    this.y = y;

    // Lights

    this.lightStates = [];
    this.lightLabels = [];
    this.lights = game.add.group();

    for (let i=0; i<46; i++) {
      const _rad = (90-i*360/46) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * lightRadius;
      const _offset_y = -Math.sin(_rad) * lightRadius;

      const _light = this.lights.create(x + _offset_x, y + _offset_y, 'lightOff');
      _light.angle = i*360/46;
      this.lightStates[i] = 0;
    }

    this.lights.children.entries[0].setTexture('lightOn');
    //console.log(this.lightLabels);

    // Hands

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

      if (_minDist <= clickRadius) {
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

  createLabels = (game) => {
    for (let i=0; i<46; i++) {
      const _rad = (90-i*360/46) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * labelRadius;
      const _offset_y = -Math.sin(_rad) * labelRadius;
      let text;

      switch (i) {
      case 0:
        text = 'II';
        break;
      case 1:
        text = 'III';
        break;
      case 45:
        text = 'I';
        break;
      default:
        text = i-1;
      }

      this.lightLabels[i] = game.add.text(this.x + _offset_x, this.y + _offset_y, text, {
        fontFamily: 'Amarante',
        fontSize: '24px', 
        fill: '#FFF'
      });
      this.lightLabels[i].setOrigin(0.5, 0.5).setAngle(i*360/46);
    }
  }
}