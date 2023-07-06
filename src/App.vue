<template>
  <div id="app">
    <header v-if="!$store.state.isSettingsActive">
      <button class="menu-toggle" @click="toggleSidebar">
  <span class="menu-line" :class="{ active: $store.state.showSidebar }" />
  <span class="menu-line" :class="{ active: $store.state.showSidebar }" />
  <span class="menu-line" :class="{ active: $store.state.showSidebar }" />
</button>

        <router-link to="/">
          <h1 class="app-title-container" @click="showTable = false; clearInputField()">
          <span class="app-title">My App</span>
        </h1>
        </router-link>
        <div class="user-profile">
          <img src="./assets/CD.jpg" alt="User Profile" />
        </div>
       <div class="search-container">
      <input type="text" placeholder="" v-model="searchQuery" @keyup.enter="requestTracks"/>
      <LetsGo ref="letsgoComponent" @on-play-preview="setPreviewUrl" :search-query="searchQuery" @toggleFullscreen="toggleFullscreen" :show-table="showTable" @request-tracks="requestTracksFromInput" @show-table="showTable = true" @play="handlePlay"/>




      </div>
    </header>
    <div class="sidebar" :class="{ active: $store.state.showSidebar }" v-if="!$store.state.isSettingsActive">
      <nav>
        <ul>
        <li>
          <router-link to="/music" @click="toggleSidebar">
             <font-awesome-icon :icon="['fas', 'music']" /> Music
         </router-link>
        </li>
        <li>
          <router-link to="/music" @click="toggleSidebar">
              <a href="#"><font-awesome-icon :icon="['fas', 'podcast']" /> Podcasts</a>
        </router-link>
        </li>
        <li>
          <a href="#"><font-awesome-icon icon="book" /> Library</a>
        </li>
        <li>
       <router-link to="/settings">
         <font-awesome-icon icon="user" /> Settings
       </router-link>
        </li>


      </ul>
      </nav>
    </div>
    <main>
      <router-view @play="handlePlay" @toggleFullscreen="toggleFullscreen"></router-view>

    </main>
    <MediaPlayer v-if="!$store.state.isSettingsActive" ref="mediaPlayerComponent" :podcast="podcast" :audio-preview-url="audioPreviewUrl" :audio-player="audioElement" @remove-media-player="hideMediaPlayer" :accessToken="accessToken"/>
   

  </div>
</template>

<script>
import LetsGo from '@/components/LetsGo.vue';
import MediaPlayer from "@/components/MediaPlayer.vue";



export default {
  components: { LetsGo, MediaPlayer},
  data() {
    return {
      showSidebar: false,
      previewUrl: "",
      podcast: null,
      audioPreviewUrl: "",
      searchQuery: "",
      showTable: true,
      showTableHeader: false,
      audioElement: new Audio(),
      accessToken: null,
      podcastList: []
    };
  },
  methods: {
 
    handlePlay(playlist) {
    this.setPreviewUrl(playlist.preview_url, playlist);  
  },
    clearInputField() {
      this.searchQuery = "";
    },
    toggleSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR');
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
    playSelectedPlaylist(previewUrl) {
      if (!previewUrl) {
        console.error('No preview URL available for this playlist');
        return;
      }
      this.audioElement.pause();

      this.audioElement.src = previewUrl;
      this.audioElement.play();

      this.setPreviewUrl(previewUrl, null);
    },
  },
};
</script>

<style scoped>
#app {
  background-color: rgb(70, 71, 70);
}

header {
  padding-top: 1em;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  color: darkblue;
  font-size: 20px;
}

.search-button:focus {
  outline: none;
}

.search-button:hover {
  color: #ccc; /* You can choose your preferred hover color */
}

.app-title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-title {
  color: blueviolet;
  margin-top: 0rem;
  background-color: white;
  display: inline-block;
  border-radius: 5px;
  padding: 5px;
}

.router-link-active {
  text-decoration: none;
  color: inherit;
}
</style>
