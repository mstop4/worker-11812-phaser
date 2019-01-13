import Phaser from 'phaser';
import { angleDifference, intRandomRange } from '../helpers/math'; 

const lightRadius = 290;
const labelRadius = 325;
const numLights = 46;
const numHands = 3;
const handPointingThreshold = 3;

const lightState = {
  off: 0,
  on: 1,
  flash: 2
};

export default class objClock {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.game.add.image(x, y, 'sprBack');
    this.createLights();
    this.createLabels();
    this.createHands();
  }

  createLights = () => {
    this.game.anims.create({
      key: 'flash',
      frames: [
        { key: 'sprLightOff' },
        { key: 'sprLightOn' },
      ],
      frameRate: 12,
      repeat: -1
    });

    this.lightStates = [];
    this.lightShutoffTimers = [];
    this.lightCriticalTimers = [];
    this.usedLights = [-1];
    this.freeLights = [];

    this.lightShutoffTime = 45;
    this.lightCriticalTime = 75;

    this.lights = this.game.add.group();

    for (let i=0; i<numLights; i++) {
      const _rad = (90-i*360/numLights) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * lightRadius;
      const _offset_y = -Math.sin(_rad) * lightRadius;

      const _light = this.lights.create(this.x + _offset_x, this.y + _offset_y, 'sprLightOff');
      _light.angle = i*360/numLights;

      this.lightStates.push(0);
      this.freeLights.push(i);
      this.lightShutoffTimers.push(-1);
      this.lightCriticalTimers.push(-1);
    }

    for (let i=0; i<2; i++) {
      setTimeout(() => {
        this.toggleLight(this.getFreeLight(), lightState.on);
      }, 500 + i*250 + intRandomRange(0, 500));
    }
  }

  createHands = () => {
    this.handAngles = [0, 90, 180];
    this.hands = [];

    const _collisonArea = new Phaser.Geom.Rectangle(0, -20, 320, 61);

    for (var i=0; i<numHands; i++) {
      this.hands[i] = this.game.add.image(this.x, this.y, 'sprHand').setInteractive(_collisonArea, Phaser.Geom.Rectangle.Contains);
      this.hands[i].setOrigin((40-25)/300, 0.5);
      this.hands[i].angle = this.handAngles[i];
      this.hands[i].id = i;

      this.game.input.setDraggable(this.hands[i]);

      this.game.input.on('gameobjectover', (pointer, obj) => {
        if (!this.game.gameOver) {
          obj.setTint(0xFF0000);
        }
      });

      this.game.input.on('gameobjectout', (pointer, obj) => {
        if (!this.game.gameOver) {
          obj.clearTint();
        }
      });

      this.game.input.on('drag', (pointer, obj) => {
        if (!this.game.gameOver) {
          this.handAngles[obj.id] = Math.atan2(pointer.y - this.y, pointer.x - this.x) * (180 / Math.PI);
          this.handAngles[obj.id] = this.handAngles[obj.id] < 0 ? this.handAngles[obj.id] + 360 : this.handAngles[obj.id];
          obj.angle = this.handAngles[obj.id];
        }
      });
    }

    this.game.add.image(this.x, this.y, 'sprCap');
    this.game.children.bringToTop(this.hands[numHands-1]);
  }

  createLabels = () => {
    this.lightLabels = [];

    for (let i=0; i<numLights; i++) {
      const _rad = (90-i*360/numLights) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * labelRadius;
      const _offset_y = -Math.sin(_rad) * labelRadius;
      let _text;

      switch (i) {
      case 0:
        _text = 'II';
        break;
      case 1:
        _text = 'III';
        break;
      case 45:
        _text = 'I';
        break;
      default:
        _text = i-1;
      }

      this.lightLabels[i] = this.game.add.text(this.x + _offset_x, this.y + _offset_y, _text, {
        fontFamily: 'Amarante',
        fontSize: '20px', 
        fill: '#000'
      });
      this.lightLabels[i].setOrigin(0.5, 0.5).setAngle(i*360/numLights);
    }
  }

  toggleLight = (index, state) => {
    if (state >= 0 && state <= 2) {
      this.lightStates[index] = state;

      switch (state) {

      case 0: {
        const _light = this.lights.getFirstNth(index+1, true);
        _light.setTexture('sprLightOff');
        _light.anims.stop(null, true);
        this.lightShutoffTimers[index] = -1;
        this.lightCriticalTimers[index] = -1;
        break;
      }

      case 1: {
        this.lights.getFirstNth(index+1, true).setTexture('sprLightOn');
        this.lightShutoffTimers[index] = this.lightShutoffTime;
        this.lightCriticalTimers[index] = this.lightCriticalTime;
        break;
      }

      case 2: {
        this.lights.getFirstNth(index+1, true).play('flash', true);
        break;
      }
      }
    }
  }

  checkHands = () => {
    let meterDelta = 0;

    for (let i=0; i<numLights; i++) {

      switch (this.lightStates[i]) {
      case lightState.off:
        continue;

      case lightState.on:
        this.lightCriticalTimers[i]--;
        
        if (this.lightCriticalTimers[i] === 0) {
          this.lightCriticalTimers[i] = -1;
          this.toggleLight(i, lightState.flash);
        }
        break;

      case lightState.flash:
        meterDelta += 0.1;
        break;
      }

      const _curAngle = (270+i*360/numLights) % 360;

      for (let j=0; j<numHands; j++) {
        if (Math.abs(angleDifference(this.handAngles[j], _curAngle)) <= handPointingThreshold) {
          this.lightShutoffTimers[i]--;

          if (this.lightShutoffTimers[i] === 0) {
            this.toggleLight(i, lightState.off);
            this.game.ui.updateScore(1);
            this.restockFreeLight();

            setTimeout(() => {
              this.toggleLight(this.getFreeLight(), lightState.on);
            }, 500 + intRandomRange(0, 500));

          }

          break;
        }
      }

      this.game.meter.updateMeter(meterDelta);
    }
  }

  getFreeLight = () => {
    if (this.freeLights.length < 1) return -1;

    const _i = intRandomRange(0, this.freeLights.length);
    const _used = this.freeLights.splice(_i, 1);
    this.usedLights.push(_used[0]);
    return _used[0];
  }

  restockFreeLight = () => {
    const _free = this.usedLights.shift();

    if (_free > -1) {
      this.freeLights.push(_free);
    }
  }
}