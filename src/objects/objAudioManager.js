export default class objAudioManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.trackList = {
      musMain: audioManager.add('musMain'),
      musTitle: audioManager.add('musTitle')
    };
  }

  playMusic = (music, loop) => {
    this.trackList[music].play('', {
      loop: loop
    });
  }

  stopMusic = (music) => {
    this.trackList[music].stop();
  }

  setVolume = (music, volume) => {
    this.trackList[music].setVolume(volume);
  }
}