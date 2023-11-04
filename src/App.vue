<template>
  <div id="app" :class="$store.state.theme + '-theme'">
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
          <img src="./assets/CD2.jpg" alt="User Profile" />
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
        <div class="theme-switcher">
          <span>Light</span>
          <label class="switch">
            <input type="checkbox" id="theme" :checked="$store.state.theme === 'dark'" @change="$store.commit('setTheme', $event.target.checked ? 'dark' : 'light')">
            <span class="slider round"></span>
          </label>
          <span>Dark</span>
        </div>
      </li>
    </ul>
  </nav>
</div>
<div class="overlay" :class="{ active: $store.state.showSidebar }" @click="toggleSidebar"></div>

    <main>
      <router-view @play="handlePlay" @toggleFullscreen="toggleFullscreen"></router-view>

    </main>
    <MediaPlayer :showMediaPlayer="true" v-if="!$store.state.isSettingsActive" ref="mediaPlayerComponent" :podcast="podcast" :audio-preview-url="audioPreviewUrl" :audio-player="audioElement" @remove-media-player="hideMediaPlayer" :accessToken="accessToken"/>
   

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
:root {
  background-color:  rgb(70, 71, 70);
  color: #F5F5DC;
}

.sidebar {
  position: fixed;
  width: 250px;
  max-width: 80%;
  height: 100%;
  left: 0;
  top: 0;
  padding: 20px;
  background: dimgray;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.25);
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
}


.sidebar.active {
  transform: translateX(0);
}

.overlay {
  pointer-events: none;
}

.overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Theme switcher styles */
.theme-switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Sidebar background color for dark theme */
.dark-theme .sidebar {
  background: #1a1a2e;
  color: #E5E5E5;
}

/* Sidebar background color for light theme */
.light-theme .sidebar {
  background: #F5F5DC;
  color: #000000;
}


.light-theme, .light-theme header, .light-theme main {
  background-color: #F5F5DC;
  color: #000000;
}

.light-theme .menu-line {
  background-color: #000000; 
}

.dark-theme, .dark-theme header, .dark-theme main {
  background-color: rgb(70, 71, 70);
  color: #F5F5DC;
}

.dark-theme .menu-line {
  background-color: #E5E5E5; /* white */
}

body {
  background-color:  rgb(70, 71, 70);
  color: #F5F5DC;
}

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