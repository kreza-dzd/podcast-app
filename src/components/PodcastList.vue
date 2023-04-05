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
    <MediaPlayer :podcast="selectedPodcast" :podcastList="podcasts" />
  </div>
</template>

<script>
import PodcastItem from "./PodcastItem.vue";
import MediaPlayer from "./MediaPlayer.vue";

export default {
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
        // Add more podcast samples as needed
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

<style scoped>
.podcast-list {
  /* Add your podcast list styles here */
}
</style>
