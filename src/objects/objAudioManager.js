export default class objAudioManager {
  constructor(game) {
    this.game = game;
  }

  playSound = (sound, loop) => {
    const _soundRef = this.game.sound.add(sound);
    _soundRef.play('', {
      loop: loop
    });
    return _soundRef;
  }

  stopSound = (ref) => {
    if (ref) {
      ref.stop();
      ref.destroy();
    }
  }
}