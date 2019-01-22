export default class objAudioManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.bgm = null;
  }

  playSound = (sound, loop) => {
    const _soundRef = this.audioManager.add(sound);
    _soundRef.play('', {
      loop: loop
    });
    return _soundRef;
  }

  stopSound = (ref) => {
    if (ref !== null) {
      ref.stop();
      ref.destroy();
      ref = null;
    }
  }

  setVolume = (ref, volume) => {
    if (ref) {
      ref.setVolume(volume);
    }
  }
}