export default class objAudioManager {
  constructor(scene) {
    this.scene = scene;
    this.bgm = null;
  }

  playSound = (sound, loop) => {
    const _soundRef = this.scene.sound.add(sound);
    _soundRef.play('', {
      loop: loop
    });
    return _soundRef;
  }

  stopSound = (ref) => {
    if (ref !== null) {
      ref.stop();
      ref.destroy();
    }
  }

  setVolume = (ref, volume) => {
    if (ref) {
      ref.setVolume(volume);
    }
  }
}