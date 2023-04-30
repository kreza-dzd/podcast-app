<template>
  <div class="mini-media-player">
    <div class="mini-media-info">
      <img v-if="podcast && podcast.album.images[0]" :src="podcast.album.images[0].url" alt="" class="mini-album-art">
      <div>
        <h3 class="mini-title">{{ podcast ? podcast.name : "" }}</h3>
        <h4 class="mini-artist">{{ podcast && podcast.artists[0] ? podcast.artists[0].name : "" }}</h4>
      </div>
    </div>
    <button class="mini-control" @click="previous">
      <font-awesome-icon :icon="['fas', 'fa-step-backward']" />
    </button>
    <button class="mini-control" @click="togglePlay">
      <font-awesome-icon :icon="['fas', isPlaying ? 'fa-pause' : 'fa-play']" />
    </button>
    <button class="mini-control" @click="next">
      <font-awesome-icon :icon="['fas', 'fa-step-forward']" />
    </button>
    <div class="mini-progress-bar">
      <input type="range" min="0" :max="duration" v-model="currentTime" @input="seek" />
    </div>
    <button class="mini-control" @click="expand">
      <font-awesome-icon :icon="['fas', 'fa-expand']" />
    </button>
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
    audioPreviewUrl: {
      type: String,
      required: false,
      default: "",
    },
    audioElement: {
      type: Object,
      required: true,
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
      this.$emit('toggle-play');
    },
    previous() {
      this.$emit('previous');
    },
    next() {
      this.$emit('next');
    },
    expand() {
      this.$emit('expand');
    },
    seek() {
      this.$emit('seek', this.currentTime);
    },
  },
};
</script>

<style scoped>
.mini-media-player {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #222;
  color: #fff;
}

.mini-media-info {
  display: flex;
  align-items: center;
}

.mini-album-art {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.mini-title {
  font-size: 16px;
  margin: 0;
}

.mini-artist {
  font-size: 14px;
  margin: 0;
}

.mini-control {
  background-color: transparent;
  color: #fff;
  border: none;
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
}

.mini-progress-bar {
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
}

input[type="range"] {
  width: 100%;
  height: 5px;
  background-color: blueviolet;
}
</style>
