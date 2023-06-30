import { createStore } from 'vuex';

export default createStore({
  state: {
    currentPlayingTrack: null,
    audioPlayer: new Audio(),
  },
  mutations: {
    playNewTrack(state, newSource) {
      state.audioPlayer.pause();
      state.audioPlayer.src = newSource;
      state.audioPlayer.play();
    },
    setCurrentPlayingTrack(state, track) {
      state.currentPlayingTrack = track;
    },
    setAudioPlayerSource(state, source) {
      state.audioPlayer.src = source;
    },
    playAudio(state) {
      state.audioPlayer.play();
    },
    pauseAudio(state) {
      state.audioPlayer.pause();
    },
  },
});
