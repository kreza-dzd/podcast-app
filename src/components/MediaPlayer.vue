<template>
  <div v-if="podcast" class="media-player">
    <h3>Now Playing: {{ podcast.title }}</h3>
    <audio ref="audioElement" :src="podcast.audioFilePath" @timeupdate="updateProgress"></audio>
    <div class="controls">
      <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
      <input type="range" min="0" :max="duration" v-model="currentTime" @input="seek">
      <div class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    podcast: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    };
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.audioElement.pause();
      } else {
        this.$refs.audioElement.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    updateProgress() {
      this.currentTime = this.$refs.audioElement.currentTime;
      this.duration = this.$refs.audioElement.duration;
    },
    seek() {
      this.$refs.audioElement.currentTime = this.currentTime;
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
  },
};
</script>

<style scoped>
.media-player {
  /* Add your media player container styles here */
}

.media-player h3 {
  font-size: 20px;
  font-weight: 400;
  color: #333;
  margin-top: 20px;
}


.controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  /* Add your play/pause button styles here */
}

input[type="range"] {
 
}

.time {
 
}

</style>
