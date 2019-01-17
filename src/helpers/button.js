const setupButton = (obj, onClick) => {
  obj.setOrigin(0.5, 0.5);
  obj.setInteractive();
  obj.on('pointerdown', onClick);

  obj.on('pointerover', () => {
    obj.setColor('#FFF');
  });

  obj.on('pointerout', () => {
    obj.setColor('#000');
  });
};

module.exports = {
  setupButton
};