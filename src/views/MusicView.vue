<template>
  <div class="podcast-list">
    <h2>Music</h2>
    <ul>
      <PodcastItem
        v-for="podcast in podcasts"
        :key="podcast.id"
        :podcast="podcast"
        @play="playPodcast"
      />
    </ul>
    <MediaPlayer :podcast="selectedPodcast" :podcastList="podcasts" @play="playPodcast" />
  </div>
</template>

  
  <script>
import PodcastItem from '@/components/PodcastItem.vue';
import MediaPlayer from '@/components/MediaPlayer.vue';
  export default {
    name: 'MusicView',
  mounted() {
    this.$emit('show-media-player', false);
    this.$emit('show-letsgo', false);
  },
  beforeUnmount() {
    this.$emit('show-media-player', true);
    this.$emit('show-letsgo', true);
  },
    components: { PodcastItem, MediaPlayer },

  methods: {
    playPodcast(podcast) {
      this.selectedPodcast = podcast;
    },
  },
  };
  </script>