module.exports = {
  appWidth: 1280,
  appHeight: 720,

  get appCenter() {
    return {x: this.appWidth / 2, y: this.appHeight / 2};
  }
};