<template>
  <div>
    <button @click="requestTracks">Search for a track</button>

    <table v-show="showTable">
      <thead v-if="showTableHeader">
        <tr>
          <th>Artist</th>
          <th>Track</th>
          <th>Duration</th>
          <th>Album</th>
          <th>Album Image</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in state.tracks"
          :key="index"
          :class="{ 'even-row': index % 2 === 1 }"
          @click="handleTrackClick(item)"
        >
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.name }}</td>
          <td>{{ formatDuration(item.duration_ms) }}</td>
          <td>{{ item.album.name }}</td>
          <td>
            <img
              v-if="item.album.images[0]"
              :src="item.album.images[0].url"
              :alt="item.album"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <FeaturedView 
  @playPreview="setPreviewUrl" 
  @play="playSelectedPlaylist" 
  @toggleFullscreen="toggleFullscreen"
  />
  <NewView
  @playPreview="setPreviewUrl" 
  @play="playSelectedPlaylist" 
  @toggleFullscreen="toggleFullscreen"
  />

</template>

<script setup>
import { defineProps, reactive, defineExpose, defineEmits,ref } from 'vue';
import FeaturedView from '@/components/FeaturedView.vue';
import NewView from '@/components/NewView.vue';


const emit = defineEmits([
  'show-table', 
  'on-play-preview', 
  'toggleFullscreen', 
  'request-tracks', 
  'play',
  'remove-media-player',
  'toggle-play',
  'playPreview' 
]);





let showSidebar = ref(false);
let featuredPlaylists = ref([]);
let audioPreviewUrl = ref(null);
let podcast = ref(null);

const clientId = '17e41028c79e4f128a873410a112bd0e';
const clientSecret = 'de2b9acdd949438588e2a21958897c3f';

const encodedAuth = btoa(`${clientId}:${clientSecret}`);

const state = reactive({
  tracks: [],
});

const togglePlay = () => {
  emit('toggle-play');
}

const toggleFullscreen = () => {
  emit('toggleFullscreen');
}


const playSelectedPlaylist = (playlist) => {
  emit('play', playlist);
}



const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
}

const setPreviewUrl = (url, podcastInstance) => {
  audioPreviewUrl.value = url;
  podcast.value = podcastInstance;
}

const handleTrackClick = (item) => {
  console.log(item); 
  emit('on-play-preview', item.preview_url, item); 
  emit('toggleFullscreen'); 
}


const props = defineProps({
  searchQuery: String,
  showTable: Boolean,
  showTableHeader: Boolean,
});

const requestTracks = async () => {
  emit('show-table');
  

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedAuth}`,
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const trackResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(props.searchQuery)}&type=track`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const trackData = await trackResponse.json();
    state.tracks = trackData.tracks.items;
  } catch (error) {
    console.error(error);
  }
};

const formatDuration = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

defineExpose({
  requestTracks,
  togglePlay,
  toggleFullscreen,
  handleTrackClick,
  playSelectedPlaylist,
  toggleSidebar,
  setPreviewUrl,
  featuredPlaylists
});
</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
img {
  width: 50px;
  height: 50px
}
</style>