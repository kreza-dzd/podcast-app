<template>
  <div id="app">
    <header>
      <button class="menu-toggle" @click="toggleSidebar">
        <span class="menu-line" :class="{ active: showSidebar }" />
        <span class="menu-line" :class="{ active: showSidebar }" />
        <span class="menu-line" :class="{ active: showSidebar }" />
      </button>
      <router-link to="/">
        <h1 class="app-title">My App</h1>
      </router-link>
       <div class="user-profile">
     <img src="./assets/CD.jpg" alt="User Profile" />
      </div>
       <div class="search-container">
        <input type="text" placeholder="Search" />
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
    <LetsGo :on-play-preview="setPreviewUrl"/>
    <MediaPlayer :podcast="podcast" :audio-preview-url="audioPreviewUrl" />
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
       podcastList: []
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    setPreviewUrl(url) {
      this.previewUrl = url;
    },
  },
};
</script>