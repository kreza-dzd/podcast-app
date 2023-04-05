<template>
<div class="media-player">

  <div v-if="podcast">
    <h3>Now Playing: {{ podcast.title }}</h3>
    <div class="button-container">
    <button class="button" @click="previous">Prev</button>
    <button class="button" @click="next">Next</button>
    </div>
    <audio ref="audio" :src="podcast.audioFilePath" controls></audio>
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
  methods: {
    previous() {
      const currentIndex = this.podcastList.findIndex(
        (p) => p.id === this.podcast.id
      );

      if (currentIndex > 0) {
        this.$emit("play", this.podcastList[currentIndex - 1]);
      }
    },
    next() {
      const currentIndex = this.podcastList.findIndex(
        (p) => p.id === this.podcast.id
      );

      if (currentIndex < this.podcastList.length - 1) {
        this.$emit("play", this.podcastList[currentIndex + 1]);
      }
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

button {
  /* Add your play/pause button styles here */
}

input[type="range"] {
 
}

.time {
 
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

}

</style>
