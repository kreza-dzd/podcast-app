<template>
  <div class="featured-container">
    <h2 class="section-title">Featured</h2>
    <div class="box-wrapper">
      <div
        v-for="(track, index) in featuredTracks.slice(0, 5)"
        :key="index"
        :class="`box-${index + 1}`"
        @click="playPreview(track)"
        @dblclick="toggleFullscreen"
      >
        <img :src="track.album.images[0]?.url" :alt="track.name" />
        <div class="track-name">{{ track.name }}</div>
        <div class="track-artist">{{ track.artists[0].name }}</div>
        <div class="track-album">{{ track.album.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,defineEmits } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const featuredTracks = ref([]);
const store = useStore();

const emit = defineEmits([
  'toggleFullscreen', 
  'play'
]);

onMounted(async () => {
  const response = await getSpotifyAccessToken();
  const accessToken = response.data.access_token;
  await fetchFeaturedTracks(accessToken);
});

const getSpotifyAccessToken = async () => {
  const clientId = '17e41028c79e4f128a873410a112bd0e';
  const clientSecret = 'de2b9acdd949438588e2a21958897c3f';
  const encodedAuth = window.btoa(`${clientId}:${clientSecret}`);

  return axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};

const fetchFeaturedTracks = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let trackPromises = response.data.playlists.items.map(async (playlist) => {
      const tracksResponse = await axios.get(playlist.tracks.href, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const track = tracksResponse.data.items[0]?.track;
      return track?.preview_url ? track : undefined;
    });

    let tracksWithPreview = await Promise.all(trackPromises);
    featuredTracks.value = tracksWithPreview.filter(track => track !== undefined);
  } catch (error) {
    console.error(error);
  }
};

const playPreview = (track) => {
  const transformedItem = {
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    duration: track.duration_ms,
    image: track.album.images[0]?.url,
    audioPreviewUrl: track.preview_url,
  };
  emit('play', track);
  store.commit('setAudioPlayerSource', track.preview_url);
    store.commit('playAudio');
    store.commit('setCurrentPlayingTrack', transformedItem);
    store.commit('playNewTrack', track.preview_url);
  toggleFullscreen();
};

const toggleFullscreen = () => {
  emit('toggleFullscreen');
};
</script>

<style scoped>
.featured-container {
  /* Add your styles */
}

.box {
  width: 200px;
  margin: 10px;
  text-align: center;
}

.box-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  margin-bottom: 20px;
  padding: 10px 10px 20px 20px;
}

.playlist-name {
  margin-top: 5px;
  color: black;
}

img {
  width: 100%;
  height: auto;
}
</style>