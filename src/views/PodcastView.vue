<template>
    <div class="podcast-list">
      <h2>Podcast</h2>
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
      name: 'PodcastView',
      components: { PodcastItem, MediaPlayer },
    data() {
      return {
        podcasts: [
          {
            id: 1,
            title: "Checkie Brown - Roadtrip",
            audioFilePath: "/audio/Checkie Brown - Roadtrip (CB 37).mp3",
          },
          {
            id: 2,
            title: "The Immaculates - Dogbite",
            audioFilePath: "/audio/The Immaculates - Dogbite.mp3",
          },
          {
            id: 3,
            title: "Choklate -Incredible (Live @ KEXP)",
            audioFilePath: "/audio/Choklate - Incredible (Live @ KEXP).mp3",
          },
          {
            id: 4,
            title: "Eastern Blokhedz - Live at Barbés",
            audioFilePath: "/audio/Eastern Blokhedz - Live at Barbés, 12_10_2016.mp3",
          },
          {
            id: 5,
            title: "Wolf Asylum - Koord",
            audioFilePath: "/audio/Wolf Asylum - Koord.mp3",
          },
        ],
        selectedPodcast: null,
      };
    },
    methods: {
      playPodcast(podcast) {
        this.selectedPodcast = podcast;
      },
    },
    };
    </script>