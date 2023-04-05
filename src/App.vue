<template>
  <div id="app">
    <div class="sidebar">
      <!-- Add your sidebar content here -->
    </div>
    <main>
      <PodcastList />
    </main>
  </div>
</template>

<script>
import PodcastList from './components/PodcastList.vue';

export default {
  components: {
    PodcastList,
  },
};
</script>

<style>
/* Add your global styles here, including layout, colors, typography, etc. */
</style>
