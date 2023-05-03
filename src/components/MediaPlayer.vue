<template>
<div class="media-player-wrapper">
  <div class="media-player-container" :class="{ 'mini-media-player': mini, 'changed-background-color': changedBackgroundColor }">
    <div class="media-player" :class="{ 'reduced-size': mini }" :style="{
      position: fullscreen ? 'fixed' : 'static',
      top: fullscreen ? '0' : 'auto',
      left: fullscreen ? '0' : 'auto',
      width: fullscreen ? '100%' : 'auto',
      height: fullscreen ? '100%' : 'auto',
      background: fullscreen ? 'linear-gradient(180deg, #333333 0%, #222222 50%, #111111 100%)' : 'transparent',
      zIndex: fullscreen ? '9999' : 'auto'
    }">
  
      <div v-if="podcast">
        <div class="now-playing">
              <h2>
         <img v-if="podcast.album.images[0]" :src="podcast.album.images[0].url" alt="" :class="{ 'reduced-size': mini }" style="width:300px; height:300px">
               </h2>
          <h3 class="center-text">{{ podcast.artists[0].name }}</h3>
          <h2 class="center-text">{{ podcast.name }}</h2>

        </div>
        <div class="progress-container">
          <span class="current-time">{{ formatDuration(currentTime) }}</span>
          <input
            v-if="podcast"
            type="range"
            min="0"
            :max="duration"
            v-model="currentTime"
            @change="seek"
            class="progress-bar"
          />
          <span class="duration">{{ formatDuration(duration) }}</span>
        </div>
        <div class="button-container">
         <button class="button" @click="previous">
  <font-awesome-icon :icon="['fas', 'fa-backward']" />
</button>
<button class="button play-pause" @click="togglePlay">
  <font-awesome-icon :icon="['fas', isPlaying ? 'fa-pause' : 'fa-play']" />
</button>
<button class="button" @click="next">
  <font-awesome-icon :icon="['fas', 'fa-forward']" />
</button>

<button v-if="!mini" class="button-remove" @click="removeMediaPlayer(); toggleBackgroundColor()">
  <font-awesome-icon :icon="['fas', 'chevron-down']" />
</button>
<button v-else class="button-remove" @click="removeMediaPlayer(); toggleBackgroundColor()">
  <font-awesome-icon :icon="['fas', 'chevron-up']" />
</button>








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
      </div>
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
      mini: false,
      changedBackgroundColor: false,
    };
  },
  methods: {
     toggleBackgroundColor() {
    this.changedBackgroundColor = !this.changedBackgroundColor;
  },
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
  if (this.mini) {
    this.fullscreen = true;
  } else {
    this.fullscreen = false;
  }
  this.mini = !this.mini;
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
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
}
.media-player h3 {
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 2rem;
}

.media-player.reduced-size {
  width: 50%;
  transform: scale(0.5);
}

img.reduced-size {
  width: 150px;
  height: 150px;
}

.media-player-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
}



.mini-media-player .media-player {
  padding: 15px;
  box-shadow: none;
  background-color: transparent;
}


.controls {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-text {
  text-align: center;
  width: 100%;
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
  margin-top: 2rem;
}
.button {
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: blueviolet;
  color: #fff;
  display: inline;
  font-size: 12px;
  margin-right: 30px;
  margin-left: 30px;
}
.play-pause {
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: blueviolet;
  color: #fff;
  display: inline;
  margin: 0 5px;
  margin-right: 10px;
  margin-left: 10px;
}
.button-remove {
  height: 25px;
  width: 25px;
  font-size: 18px;
  position: absolute;
   top: 10px;
  left: 30px;
  background-color: transparent;
  color: #fff;
  border: none;
}



@media (max-width: 768px) {
  .media-player {
    padding: 20px;
  }
  .media-player h3 {
    font-size: 18px;
  }
  .button-container {
    margin-top: 1rem;
  }
}
</style> 