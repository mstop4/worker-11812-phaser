const setupButton = (obj, onClick, colour, hoverColour) => {
  obj.setOrigin(0.5, 0.5);
  obj.setInteractive();
  obj.on('pointerdown', onClick);

  obj.on('pointerover', () => {
    obj.setColor(hoverColour);
  });

  obj.on('pointerout', () => {
    obj.setColor(colour);
  });
};

module.exports = {
  setupButton
};