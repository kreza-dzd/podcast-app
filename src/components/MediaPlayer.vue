<template>
  <div class="media-player-wrapper">
    <div class="media-player-container" :class="{ 'mini-media-player': mini, 'changed-background-color': changedBackgroundColor }" @click.stop="handleContainerClick">
      <div class="media-player" :class="{ 'reduced-size': mini }" :style="mediaPlayerStyle">
        <div v-if="podcast">
          <div class="now-playing">
            <h2>
              <div class="image-container" :class="{ 'mini-image-container': mini }">
                <img v-if="podcast.album?.images && podcast.album.images[0]" :src="podcast.album.images[0].url" alt="" :class="['media-player-img', { 'mini-media-player-img': mini, 'reduced-size': mini }]" :style="mini ? { width: '80px', height: '80px' } : { width: '300px', height: '300px' }">
              </div>
            </h2>
           <h3 class="center-text" v-if="podcast?.artists && podcast.artists[0] && !mini">{{ podcast.artists[0].name }}</h3>

            <h2 class="center-text">{{ podcast.name }}</h2>
          </div>
          <div class="progress-container">
            <span class="current-time">{{ formatDuration(currentTime) }}</span>
            <input v-if="podcast" type="range" min="0" :max="duration" v-model="currentTime" @change="seek" class="progress-bar" />
            <span class="duration">{{ formatDuration(duration) }}</span>
          </div>
          <div class="button-container">
            <button class="button fullscreen-only" @click="previous">
              <font-awesome-icon :icon="['fas', 'fa-backward']" />
            </button>
            <button class="button play-pause" @click="togglePlay">
              <font-awesome-icon :icon="['fas', isPlaying ? 'fa-pause' : 'fa-play']" @click.stop="togglePlay" />
            </button>
            <button class="button fullscreen-only" @click="next">
              <font-awesome-icon :icon="['fas', 'fa-forward']" />
            </button>
            <button v-if="!mini" class="button-remove" @click.stop="handleButtonRemoveClick">
              <font-awesome-icon :icon="['fas', 'chevron-down']" />
            </button>
          </div>
          <audio v-if="audioPreviewUrl" ref="audio" :key="audioPreviewUrl" :src="audioPreviewUrl" @play="isPlaying = true" @pause="isPlaying = false" @loadedmetadata="duration = $event.target.duration * 1000" @timeupdate="updateTime($event)" @ended="handleAudioEnded"></audio>
        </div>
      </div>
    </div>
  </div>
</template>

  
  
  
  <script>
  export default {
    props: {
    
      audioPlayer: {
    type: Object,
    required: true,
  },
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
    computed: {
    mediaPlayerStyle() {
      if (this.mini) {
        return {
          position: 'static',
          top: 'auto',
          left: 'auto',
          width: 'auto',
          height: 'auto',
          background: 'transparent',
          zIndex: 'auto',
        };
      } else {
        return {
          position: this.fullscreen ? 'fixed' : 'static',
          top: this.fullscreen ? '0' : 'auto',
          left: this.fullscreen ? '0' : 'auto',
          width: this.fullscreen ? '100%' : 'auto',
          height: this.fullscreen ? '100%' : 'auto',
          background: this.fullscreen
            ? 'linear-gradient(180deg, #333333 0%, #222222 50%, #111111 100%)'
            : 'transparent',
          zIndex: this.fullscreen ? '9999' : 'auto',
        };
      }
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
      handleContainerClick() {
  if (this.mini) {
    this.removeMediaPlayer();
    this.toggleBackgroundColor();
  }
},
handleButtonRemoveClick() {
  this.removeMediaPlayer();
},





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
  this.currentTime = event.target.currentTime * 1000;
},
      formatDuration(duration, totalDuration = null) {
  if (totalDuration !== null) {
    duration = totalDuration - duration;
  }
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
        console.log(this.audioPreviewUrl);
        this.$nextTick(() => {
          this.playPreview();
          this.duration = 0;
        });
      },
    },
  };

  
  </script>
  
  
  <style scoped>
  .media-player {
    display: flex;
    position: absolute;;
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
    margin-top: -5rem;
    margin-bottom: -5rem;
  }
  .media-player-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    z-index: 1000;
    margin-bottom: 3rem;
  }
  .mini-media-player .media-player {
    padding: 65px;
    box-shadow: none;
    background-color: transparent;
  }
  .media-player-container.mini-media-player .image-container {
    position: absolute;
    top: 65px; 
    left: -150px;  
    width: 50px;
  }
  .media-player-container.mini-media-player {
    background-color: #f4f3f3;
    color: black;
    width: 90%;
    border-radius: 10px;
  }
  .media-player-container.mini-media-player .play-pause {
  position: absolute;
  left: 400px; 
  bottom: 80px;
}
  .media-player-container.mini-media-player .media-player-img {
    display: flex;
    justify-content: space-around;
  }
  .media-player-container.mini-media-player .fullscreen-only {
  display: none;
}
  .image-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
  .media-player-container.mini-media-player .progress-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  
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
    .media-player-container.full-screen-media-player .fullscreen-only {
    display: block;
  }
  }
  </style> 
