module.exports = {
  version: '1.0.2',
  appWidth: 1280,
  appHeight: 720,

  get appCenter() {
    return {x: this.appWidth / 2, y: this.appHeight / 2};
  },

  themes: {
    dark: {
      textColour: '#FFF',
      linkColour: '#FFF',
      hoverColour: '#ACA'
    },

    light: {
      textColour: '#000',
      linkColour: '#000',
      hoverColour: '#FFF'
    }
  },

  gameRules: {
    flashBulbDelta: 0.2,
    spBulbDelta: -52.1,
    bulbDeactivateTime: 45,
    bulbCriticalTime: 90,

    numLevels: 8,
    pointsToLevelUp: [
      5,
      10,
      10,
      20,
      20,
      20,
      20,
      Infinity
    ],

    bulbDelayTime: [      // in ms
      [800, 1000],
      [500, 700],
      [300, 500],
      [900, 1100],
      [700, 900],
      [500, 700],
      [400, 600],
      [300, 500]
    ],

    numBulbsActive: [
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      2
    ],

    spBulbDelayTurns: [
      2,
      5,
      5,
      10,
      10,
      10,
      10,
      10
    ]
  }
};