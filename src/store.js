import { createStore } from 'vuex';

export default createStore({
  state: {
    currentPlayingTrack: null,
    audioPlayer: new Audio(),
    isPlaying: false,
    isSettingsActive: false,
    showSidebar: false,
  },
  mutations: {
    TOGGLE_SIDEBAR(state) {
      state.showSidebar = !state.showSidebar;
    },
    SET_SETTINGS_ACTIVE(state, value) {
      state.isSettingsActive = value;
    },
    setCurrentPlayingTrack(state, track) {
      state.currentPlayingTrack = track;
    },
    setAudioPlayerSource(state, source) {
      state.audioPlayer.src = source;
    },
    setPlayingState(state, playing) {
      state.isPlaying = playing;
    },
  },
  actions: {
    playNewTrack({ state, commit }, newSource) {
      state.audioPlayer.src = newSource;
      var playPromise = state.audioPlayer.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          commit('setPlayingState', true);
        })
        .catch(() => {
          commit('setPlayingState', false);
        });
      }
    },
    resumeAudio({ state, commit }) {
      var playPromise = state.audioPlayer.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          commit('setPlayingState', true);
        })
        .catch(() => {
          commit('setPlayingState', false);
        });
      }
    },
    pauseAudio({ state, commit }) {
      state.audioPlayer.pause();
      commit('setPlayingState', false);
    },
    toggleAudio({ state, dispatch }) {
      if (state.isPlaying) {
        dispatch('pauseAudio');
      } else {
        dispatch('resumeAudio');
      }
    }
  },
});
