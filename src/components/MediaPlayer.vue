<template>
  <div class="media-player">
    <div v-if="podcast">
      <h3>Now Playing: {{ podcast.title }}</h3>
      <div class="button-container">
        <button class="button" @click="previous">Prev</button>
        <button class="button play-pause" @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
        <button class="button" @click="next">Next</button>
      </div>
      <input
        v-if="podcast"
        type="range"
        min="0"
        :max="duration"
        v-model="currentTime"
        @change="seek"
        class="progress-bar"
      />
      <audio
        ref="audio"
        :src="podcast.audioFilePath"
        @play="isPlaying = true"
        @pause="isPlaying = false"
        @loadedmetadata="duration = $event.target.duration"
        @timeupdate="updateTime($event)"
      ></audio>
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
    podcastList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isPlaying: false,
      duration: 0,
      currentTime: 0,
    };
  },
  methods: {
    previous() {
      const currentIndex = this.podcastList.findIndex(
        (p) => p.id === this.podcast.id
      );

      if (currentIndex > 0) {
        this.$refs.audio.pause();
        this.isPlaying = false;
        this.$emit("play", this.podcastList[currentIndex - 1]);
      }
    },
    next() {
      const currentIndex = this.podcastList.findIndex(
        (p) => p.id === this.podcast.id
      );

      if (currentIndex < this.podcastList.length - 1) {
        this.$refs.audio.pause();
        this.isPlaying = false;
        this.$emit("play", this.podcastList[currentIndex + 1]);
      }
    },
    togglePlay() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
      updateTime(event) {
    this.currentTime = event.target.currentTime;
  },
  seek() {
    this.$refs.audio.currentTime = this.currentTime;
  },
  },
};
</script>

<style scoped>
.media-player {
  display: flex;
  justify-content: center;
  align-items: center;
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

.progress-bar {
  width: 100%;
  margin-top: 10px;
  appearance: none;
  background-color: #eee;
  height: 5px;
  border-radius: 5px;
  outline: none;
}

.progress-bar::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: blueviolet;
  border-radius: 50%;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: blueviolet;
  color: aquamarine;
  display: inline;
  font-size: 12px;
}

.play-pause {
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: blueviolet;
  color: aquamarine;
  display: inline;
  margin: 0 5px;
}
</style>
