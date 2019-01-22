module.exports = {
  version: '1.0-beta',
  appWidth: 1280,
  appHeight: 720,

  get appCenter() {
    return {x: this.appWidth / 2, y: this.appHeight / 2};
  },

  themes: [
    {
      textColour: '#FFF',
      linkColour: '#FFF',
      hoverColour: '#ACA'
    },

    {
      textColour: '#000',
      linkColour: '#000',
      hoverColour: '#FFF'
    }
  ]  
};