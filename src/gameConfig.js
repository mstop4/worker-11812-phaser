module.exports = {
  version: '1.1.0',
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

  gameOverTime: 3000,

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
      [750, 250],
      [400, 200],
      [200, 100],
      [800, 200],
      [550, 200],
      [350, 150],
      [200, 100],
      [150, 50]
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
      5,
      10,
      10,
      10,
      10,
      10,
      10,
      10
    ]
  }
};