<template>

  <div class="media-player" v-on:toggle-fullscreen="toggleFullscreen" :style="{
    position: fullscreen ? 'fixed' : 'static',
    top: fullscreen ? '0' : 'auto',
    left: fullscreen ? '0' : 'auto',
    width: fullscreen ? '100%' : 'auto',
    height: fullscreen ? '100%' : 'auto',
    backgroundColor: fullscreen ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
    zIndex: fullscreen ? '9999' : 'auto'
  }">
    <div v-if="podcast">
  <h3>Now Playing: {{ podcast.artists[0].name }}</h3>
  <h3>{{ podcast.name }}</h3>
  <div class="button-container">
    <button class="button" @click="previous">Prev</button>
    <button class="button play-pause" @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
    <button class="button" @click="next">Next</button>
  </div>
  <button class="button remove" @click="removeMediaPlayer">X</button>




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
        v-if="audioPreviewUrl"
        ref="audio"
        :src="audioPreviewUrl"
        @play="isPlaying = true"
        @pause="isPlaying = false"
        @loadedmetadata="duration = $event.target.duration"
        @timeupdate="updateTime($event)"
        @ended="handleAudioEnded"
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
      required: false,
      default: () => [],
    },
    audioPreviewUrl: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      previewDuration: 30,
      fullscreen: false,
    };
  },
  methods: {
    previous() {
      if (!this.podcast || !this.podcastList.length) return;
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
      if (!this.podcast || !this.podcastList.length) return;
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
  if (!this.$refs.audio) return;
  if (this.$refs.audio.paused) {
    this.$refs.audio.play();
  } else {
    this.$refs.audio.pause();
  }
},

    updateTime(event) {
      this.currentTime = event.target.currentTime;
    },
      formatDuration(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  },
    seek() {
      this.$refs.audio.currentTime = this.currentTime;
    },
   playPreview() {
  if (this.$refs.audio && this.audioPreviewUrl) {
    this.$refs.audio.currentTime = 0;
    this.$refs.audio.play();
    setTimeout(() => {
      if (this.$refs.audio) {
        this.$refs.audio.pause();
        this.isPlaying = false;
      }
    }, this.previewDuration * 1000);
  }
},

    toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  },
  removeMediaPlayer() {
  this.fullscreen = false;
  this.$nextTick(() => {
    if (this.$refs.audio) {
      this.$refs.audio.pause();
    }
    this.$emit("remove-media-player");
  })
},
handleAudioEnded() {
  if (this.$refs.audio) {
    this.$refs.audio.pause();
    this.isPlaying = false;
  }
}



  },
  watch: {
    audioPreviewUrl() {
      this.$nextTick(() => {
        this.playPreview();
      });
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
.remove {
  height: 25px;
  width: 25px;
  font-size: 8px;
  position: absolute;
  top: 520px;
  right: 500px;
  background-color: red;
}
.media-player h3 {
  color: white;
  margin-bottom: 4rem;
}



</style>