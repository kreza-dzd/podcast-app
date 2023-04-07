<template>
  <div id="app">
    <div class="sidebar">
      <!-- Add your sidebar content here -->
    </div>
    <main>
      <header>
        <h1 class="app-title">My App</h1>
      </header>
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

.app-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20px 0;
}

</style>
