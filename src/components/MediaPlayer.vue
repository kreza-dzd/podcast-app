<template>
  <div v-if="podcast">
    <h3>Now Playing: {{ podcast.title }}</h3>
    <audio :src="podcast.audioFilePath" controls></audio>
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
};
</script>

<style scoped>
/* Add your media player styles here */
</style>
