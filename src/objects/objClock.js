import { pointLineDist } from '../helpers/geometry'; 

const clickRadius = 32;
const lightRadius = 310;
const labelRadius = 345;
const numLights = 46;

export class objClock {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.createLights();
    this.createHands();
    this.createInputHandlers();
  }

  update = () => {
  }

  createLights = () => {
    this.game.anims.create({
      key: 'flash',
      frames: [
        { key: 'lightOff' },
        { key: 'lightOn' },
      ],
      frameRate: 12,
      repeat: -1
    });

    this.lightStates = [];
    this.lightLabels = [];
    this.lights = this.game.add.group();

    for (let i=0; i<numLights; i++) {
      const _rad = (90-i*360/numLights) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * lightRadius;
      const _offset_y = -Math.sin(_rad) * lightRadius;

      const _light = this.lights.create(this.x + _offset_x, this.y + _offset_y, 'lightOff');
      _light.angle = i*360/numLights;
      this.lightStates[i] = 0;
    }

    setTimeout(() => this.turnOnLight(1), 1000);
  }

  createHands = () => {
    this.handSelected = -1;
    this.handAngles = [0, 90, 180];
    this.hands = [];

    for (var i=0; i<3; i++) {
      this.hands[i] = this.game.add.image(this.x, this.y, 'hand');
      this.hands[i].setOrigin((40-25)/300, 0.5);
      this.hands[i].angle = this.handAngles[i];
    }

    this.game.add.image(this.x, this.y, 'cap');
    this.game.children.bringToTop(this.hands[2]);
  }

  createLabels = () => {
    for (let i=0; i<numLights; i++) {
      const _rad = (90-i*360/numLights) * (Math.PI / 180); 
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

      this.lightLabels[i] = this.game.add.text(this.x + _offset_x, this.y + _offset_y, text, {
        fontFamily: 'Amarante',
        fontSize: '20px', 
        fill: '#000'
      });
      this.lightLabels[i].setOrigin(0.5, 0.5).setAngle(i*360/numLights);
    }
  }

  createInputHandlers = () => {
    this.game.input.on('pointerdown', (pointer) => {
      // Find and select closest hand
      const _handsDist = [];

      for (var i=0; i<3; i++) {
        const _endX = this.x + Math.cos(this.hands[i].angle * (Math.PI / 180)) * 360;
        const _endY = this.y + Math.sin(this.hands[i].angle * (Math.PI / 180)) * 360;
        _handsDist[i] = pointLineDist(this.x, this.y, _endX, _endY, pointer.x, pointer.y);
      }

      const _minDist = Math.min(..._handsDist);

      if (_minDist <= clickRadius) {
        this.handSelected = _handsDist.indexOf(_minDist);
      }
      else {
        this.handSelected = -1;
      }
    });

    this.game.input.on('pointerup', () => {
      this.handSelected = -1;
    });

    this.game.input.on('pointermove', (pointer) => {
      if (this.handSelected > -1) {
        this.handAngles[this.handSelected] = Math.atan2(pointer.y - this.y, pointer.x - this.x) * (180 / Math.PI);
        this.hands[this.handSelected].angle = this.handAngles[this.handSelected];
      }
    });
  }

  turnOnLight = (index) => {
    this.lights.getFirstNth(index, true).play('flash');
  }
}