<template>
  <div id="app">
    <header>
      <button class="menu-toggle" @click="toggleSidebar">
        <span class="menu-line" :class="{ active: showSidebar }" />
        <span class="menu-line" :class="{ active: showSidebar }" />
        <span class="menu-line" :class="{ active: showSidebar }" />
      </button>
      <router-link to="/">
        <h1 class="app-title" @click="showTable = false">My App</h1>

      </router-link>
       <div class="user-profile">
     <img src="./assets/CD.jpg" alt="User Profile" />
      </div>
       <div class="search-container">
      <input type="text" placeholder="Search" v-model="searchQuery" @keyup.enter="requestTracks"/>
      <LetsGo ref="letsgoComponent" @on-play-preview="setPreviewUrl" :search-query="searchQuery" @on-toggle-fullscreen="toggleFullscreen" :show-table="showTable" @request-tracks="requestTracksFromInput"/>




      </div>
    </header>
    <div class="sidebar" :class="{ active: showSidebar }">
      <nav>
        <ul>
        <li>
          <router-link to="/music" @click="toggleSidebar">
             <font-awesome-icon :icon="['fas', 'music']" /> Music
         </router-link>
        </li>
        <li>
          <router-link to="/music" @click="toggleSidebar">
              <a href="#"><font-awesome-icon :icon="['fas', 'podcast']" /> Podcast</a>
        </router-link>
        </li>
        <li>
          <a href="#"><font-awesome-icon icon="book" /> Library</a>
        </li>
        <li>
          <a href="#"><font-awesome-icon icon="user" /> Personal</a>
        </li>
      </ul>
      </nav>
    </div>
    <main>
      <router-view></router-view>
    </main>
    <MediaPlayer ref="mediaPlayerComponent" :podcast="podcast" :audio-preview-url="audioPreviewUrl" @remove-media-player="hideMediaPlayer" />
  </div>
</template>

<script>
import LetsGo from '@/components/LetsGo.vue';
import MediaPlayer from "@/components/MediaPlayer.vue";
export default {
   components: { LetsGo, MediaPlayer },
  data() {
    return {
       showSidebar: false,
       previewUrl: "",
       podcast: null,
       audioPreviewUrl: "",
       searchQuery: "",
       showTable: true,
       showTableHeader: false,
       podcastList: []
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    setPreviewUrl(url, podcast) {
    this.audioPreviewUrl = url;
    this.podcast = podcast;
    },
    async requestTracks() {
    this.$refs.letsgoComponent.$emit("request-tracks");
    this.showTableHeader = true;
  },
  toggleFullscreen() {
    this.$refs.mediaPlayerComponent.toggleFullscreen();
  },
  hideMediaPlayer() {
    this.audioPreviewUrl = "";
    this.podcast = null;
  },
  requestTracksFromInput() {
    this.$refs.letsgoComponent.requestTracks();
  },
  },
};
</script>