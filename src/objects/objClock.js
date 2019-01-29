import Phaser from 'phaser';
import { angleDifference, intRandomRange } from '../helpers/math';
import { gameRules } from '../gameConfig';

import objBulbEffect from './objBulbEffect';

const clockConfig = {
  lightRadius: 290,
  labelRadius: 325,
  numLights: 46,
  numHands: 3,
  handPointingThreshold: 3,
};

const lightState = {
  off: 0,
  on: 1,
  flash: 2,
  onSp: 3,
  flashSp: 4
};

export default class objClock {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.level = 0;
    this.turnsUntilSp = gameRules.spBulbDelayTurns[this.level] + intRandomRange(0, gameRules.spBulbDelayTurns[this.level]);
    this.pointsToLevelUp = gameRules.pointsToLevelUp[this.level];

    this.scene.add.image(x, y, 'sprClockBack');
    this.createLights();
    //this.createLabels();
    this.createHands();
    this.bulbEffects = new objBulbEffect(scene);
  }

  createLights = () => {
    this.lightStates = [];
    this.lightShutoffTimers = [];
    this.lightCriticalTimers = [];
    this.lightEmitterIndex = [];
    this.usedLights = [-1];
    this.freeLights = [];

    this.lights = this.scene.add.group();

    for (let i=0; i<clockConfig.numLights; i++) {
      const _rad = (90-i*360/clockConfig.numLights) * (Math.PI / 180); 
      const _offset_x = Math.cos(_rad) * clockConfig.lightRadius;
      const _offset_y = -Math.sin(_rad) * clockConfig.lightRadius;

      const _light = this.lights.create(this.x + _offset_x, this.y + _offset_y, 'sprLightOff');
      _light.angle = i*360/clockConfig.numLights;

      this.lightStates.push(0);
      this.freeLights.push(i);
      this.lightShutoffTimers.push(-1);
      this.lightCriticalTimers.push(-1);
      this.lightEmitterIndex.push(-1);
    }
  }

  createHands = () => {
    this.handAngles = [0, 90, 180];
    this.hands = [];

    const _collisonArea = new Phaser.Geom.Rectangle(0, -15, 280, 49);

    for (var i=0; i<clockConfig.numHands; i++) {
      this.hands[i] = this.scene.add.image(this.x, this.y, 'sprHand').setInteractive(_collisonArea, Phaser.Geom.Rectangle.Contains);
      this.hands[i].setOrigin((40-25)/300, 0.5);
      this.hands[i].angle = this.handAngles[i];
      this.hands[i].id = i;

      this.scene.input.setDraggable(this.hands[i]);

      this.scene.input.on('gameobjectover', (pointer, obj) => {
        if (!this.scene.gameOver) {
          obj.setTexture('sprHandS');
        }
      });

      this.scene.input.on('gameobjectout', (pointer, obj) => {
        if (!this.scene.gameOver) {
          obj.setTexture('sprHand');
        }
      });

      this.scene.input.on('drag', (pointer, obj) => {
        if (!this.scene.gameOver) {
          this.handAngles[obj.id] = Math.atan2(pointer.y - this.y, pointer.x - this.x) * (180 / Math.PI);
          this.handAngles[obj.id] = this.handAngles[obj.id] < 0 ? this.handAngles[obj.id] + 360 : this.handAngles[obj.id];
          obj.angle = this.handAngles[obj.id];
        }
      });
    }

    this.scene.add.image(this.x, this.y, 'sprCap');
    this.scene.children.bringToTop(this.hands[clockConfig.numHands-1]);
  }

  // createLabels = () => {
  //   this.lightLabels = [];

  //   for (let i=0; i<clockConfig.numLights; i++) {
  //     const _rad = (90-i*360/clockConfig.numLights) * (Math.PI / 180); 
  //     const _offset_x = Math.cos(_rad) * clockConfig.labelRadius;
  //     const _offset_y = -Math.sin(_rad) * clockConfig.labelRadius;
  //     let _text;

  //     switch (i) {
  //     case 0:
  //       _text = 'II';
  //       break;
  //     case 1:
  //       _text = 'III';
  //       break;
  //     case 45:
  //       _text = 'I';
  //       break;
  //     default:
  //       _text = i-1;
  //     }

  //     this.lightLabels[i] = this.scene.add.text(this.x + _offset_x, this.y + _offset_y, _text, {
  //       fontFamily: 'Amarante',
  //       fontSize: '20px', 
  //       fill: '#000'
  //     });
  //     this.lightLabels[i].setOrigin(0.5, 0.5).setAngle(i*360/clockConfig.numLights);
  //   }
  // }

  startGame = () => {
    for (let i=0; i<gameRules.numBulbsActive[this.level]; i++) {
      setTimeout(() => {
        this.toggleLight(this.getFreeLight(), lightState.on);
      }, gameRules.bulbDelayTime[this.level][0] + i*250 + intRandomRange(0, gameRules.bulbDelayTime[this.level][1]));
    }
  }

  toggleLight = (index, state) => {
    if (state >= lightState.off && state <= lightState.flashSp) {
      this.lightStates[index] = state;

      switch (state) {

      case lightState.off: {
        const _light = this.lights.getFirstNth(index+1, true);
        _light.setTexture('sprLightOff');
        _light.anims.stop(null, true);
        this.lightShutoffTimers[index] = -1;
        this.lightCriticalTimers[index] = -1;
        break;
      }

      case lightState.on:
        this.lights.getFirstNth(index+1, true).setTexture('sprLightOn');
        this.lightShutoffTimers[index] = gameRules.bulbDeactivateTime;
        this.lightCriticalTimers[index] = gameRules.bulbCriticalTime;
        break;

      case lightState.flash:
        this.lights.getFirstNth(index+1, true).play('anLightFlash', true);
        break;

      case lightState.onSp:
        this.lights.getFirstNth(index+1, true).setTexture('sprLightOnSp');
        this.lightShutoffTimers[index] = gameRules.bulbDeactivateTime;
        this.lightCriticalTimers[index] = gameRules.bulbCriticalTime;
        break;

      case lightState.flashSp:
        this.lights.getFirstNth(index+1, true).play('anLightFlashSp', true);
        break;

      }
    }
  }

  checkHands = () => {
    let meterDelta = 0;

    for (let i=0; i<clockConfig.numLights; i++) {
      const _lightInst = this.lights.getFirstNth(i+1, true);

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

      case lightState.onSp:
        this.lightCriticalTimers[i]--;
        
        if (this.lightCriticalTimers[i] === 0) {
          this.lightCriticalTimers[i] = -1;
          this.toggleLight(i, lightState.flashSp);
        }
        break;

      case lightState.flash:
      case lightState.flashSp:
        meterDelta = gameRules.flashBulbDelta;
        break;

      }

      const _curAngle = (270+i*360/clockConfig.numLights) % 360;
      let _has_hand = false;

      for (let j=0; j<clockConfig.numHands; j++) {
        if (Math.abs(angleDifference(this.handAngles[j], _curAngle)) <= clockConfig.handPointingThreshold) {
          this.lightShutoffTimers[i]--;

          if (this.lightShutoffTimers[i] <= 0) {
            if (this.lightStates[i] >= lightState.onSp) {
              this.scene.meter.updateMeter(gameRules.spBulbDelta);
            }

            this.toggleLight(i, lightState.off);
            this.restockFreeLight();
            this.lightEmitterIndex[i] = this.bulbEffects.stopStayEmitter(this.lightEmitterIndex[i]);
            this.bulbEffects.pulseDoneEmitter(_lightInst.x, _lightInst.y);

            // Score and Level Up
            this.scene.ui.updateScore(1);
            this.pointsToLevelUp--;

            if (this.pointsToLevelUp <= 0) {
              this.level = this.level < gameRules.numLevels ? this.level + 1 : this.level;
              this.pointsToLevelUp = gameRules.pointsToLevelUp[this.level];

              const _numNewLightsActive = gameRules.numBulbsActive[this.level] - gameRules.numBulbsActive[this.level-1];
              for (let k = 0; k < _numNewLightsActive; k++) {
                setTimeout(() => {
                  this.toggleLight(this.getFreeLight(), lightState.on);
                }, gameRules.bulbDelayTime[this.level][0] + k*250 + intRandomRange(0, gameRules.bulbDelayTime[this.level][1]));
              }
            }

            // Generate Special Bulb
            if (this.turnsUntilSp <= 0) {
              this.turnsUntilSp = gameRules.spBulbDelayTurns[this.level] + intRandomRange(0, gameRules.spBulbDelayTurns[this.level]);

              setTimeout(() => {
                this.toggleLight(this.getFreeLight(), lightState.onSp);
              }, gameRules.bulbDelayTime[this.level][0] + intRandomRange(0, gameRules.bulbDelayTime[this.level][1]));
            }
            
            else {
              this.turnsUntilSp--;

              setTimeout(() => {
                this.toggleLight(this.getFreeLight(), lightState.on);
              }, gameRules.bulbDelayTime[this.level][0] + intRandomRange(0, gameRules.bulbDelayTime[this.level][1]));
            }
          }

          else {
            if (this.lightEmitterIndex[i] === -1) {
              this.lightEmitterIndex[i] = this.bulbEffects.startStayEmitter(_lightInst.x, _lightInst.y);
            }
          }

          _has_hand = true;
          break;
        }
      }

      if (!_has_hand && this.lightEmitterIndex[i] != -1) {
        this.lightEmitterIndex[i] = this.bulbEffects.stopStayEmitter(this.lightEmitterIndex[i]);
      }
    }

    this.scene.meter.updateMeter(meterDelta);
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

  destroy = () => {
    this.lights = null;
    this.hands = null;
    this.bulbEffects.destroy();
    this.bulbEffects = null;
  }
}