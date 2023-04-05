<template>
  <li class="podcast-item" @click="play">
    {{ podcast.title }}
  </li>
</template>

<script>
export default {
  props: {
    podcast: {
      type: Object,
      required: true,
   }, 
  },
  methods: {
    play() {
      this.$emit("play", this.podcast);
    },
  },
};
</script>

<style scoped>
.podcast-item {
  /* Add your podcast item styles here */
}
</style>
