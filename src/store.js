import { createStore } from 'vuex';

export default createStore({
  state: {
    currentPlayingTrack: null,
    audioPlayer: new Audio(),
    isPlaying: false, // <-- new state property
  },
  mutations: {
    playNewTrack(state, newSource) {
      state.audioPlayer.pause();
      state.audioPlayer.src = newSource;
      state.audioPlayer.play();
      state.isPlaying = true; // <-- add this
    },
    setCurrentPlayingTrack(state, track) {
      state.currentPlayingTrack = track;
    },
    setAudioPlayerSource(state, source) {
      state.audioPlayer.src = source;
    },
    playAudio(state) {
      state.audioPlayer.play();
      state.isPlaying = true; // <-- add this
    },
    pauseAudio(state) {
      state.audioPlayer.pause();
      state.isPlaying = false; // <-- add this
    },
    toggleAudio(state) { // <-- new mutation
      if (state.isPlaying) {
        state.audioPlayer.pause();
        state.isPlaying = false;
      } else {
        state.audioPlayer.play();
        state.isPlaying = true;
      }
    }
  },
});
