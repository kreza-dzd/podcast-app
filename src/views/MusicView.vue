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
      <MediaPlayer :podcast="selectedPodcast" :podcastList="podcasts" @play="playPodcast" :audioPlayer="audioPlayer"  />
    </div>
  </template>
  
    
  <script>
  import PodcastItem from '@/components/PodcastItem.vue';
  import MediaPlayer from '@/components/MediaPlayer.vue';
  export default {
    name: 'MusicView',
    props: {
      podcasts: Array,  // expecting an array prop named podcasts
    },
    data() {
      return {

      selectedPodcast: null,
      audioPlayer: new Audio(),
      }
    },
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
  
  