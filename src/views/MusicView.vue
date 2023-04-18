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
    components: { PodcastItem, MediaPlayer },

  methods: {
    playPodcast(podcast) {
      this.selectedPodcast = podcast;
    },
  },
  };
  </script>