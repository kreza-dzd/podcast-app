<template>
  <div class="featured-container">
    <h2 class="section-title">Featured</h2>
    <div class="box-wrapper">
      <div
        v-for="(playlist, index) in featuredPlaylists.slice(0, 5)"
        :key="index"
        :class="`box-${index + 1}`"
        @click="playPreview(playlist)"
        @dblclick="toggleFullscreen"
      >
        <img :src="getImageUrl(playlist)" :alt="getName(playlist)" />
        <div class="playlist-name">{{ getName(playlist) }}</div>
      </div>
    </div>
  </div>
  <MiniMediaPlayer
  v-show="isPlaying"
  :podcast="currentPlaylist"
  :audioElement="audioPlayer"
  :showMiniPlayer="true"
  @toggle-play="props.togglePlay"
  @previous="previous"
  @next="next"
  @seek="seek"
/>

</template>

<script setup>


import MiniMediaPlayer from "@/components/MiniMediaPlayer.vue";
import { ref, onMounted, reactive, defineProps, defineEmits} from 'vue';

const props = defineProps({
  togglePlay: Function,
  featuredPlaylists: Array, 
});
import axios from 'axios';
const featuredPlaylists = ref([]);
const audioPlayer = reactive(new Audio());
const currentPlaylist = ref(null);
const isPlaying = ref(false);

const emit = defineEmits(['toggleFullscreen', 'play', 'playPreview']);



onMounted(async () => {
  const response = await getSpotifyAccessToken();
  const accessToken = response.data.access_token;
  await fetchFeaturedPlaylists(accessToken);
});


// Other methods...
const getImageUrl = (playlist) => {
  return playlist.images && playlist.images[0] ? playlist.images[0].url : "";
};

const getName = (playlist) => {
  return playlist ? playlist.name : "";
};

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

const fetchFeaturedPlaylists = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let previewUrls = await Promise.all(
      response.data.playlists.items.map(async (playlist) => {
        const tracksResponse = await axios.get(playlist.tracks.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Only return the preview URL if it is not null
        const previewUrl = tracksResponse.data.items[0]?.track?.preview_url;
        return previewUrl !== null ? previewUrl : undefined;
      })
    );

    // Filter out playlists without a preview URL for the first track
    let itemsWithPreview = response.data.playlists.items.filter((_, index) => previewUrls[index] !== undefined);
    previewUrls = previewUrls.filter(url => url !== undefined);

    featuredPlaylists.value = itemsWithPreview.map((playlist, index) => ({
      ...playlist,
      previewUrl: previewUrls[index],
    }));
  } catch (error) {
    console.error(error);
  }
};

let mediaPlayerStyle = () => {
  // Access the media player.
  let mediaPlayer = document.querySelector('.mini-media-player');
  if (mediaPlayer) {
    // Change the background color to #f4f3f3 and add other styles.
    mediaPlayer.style.backgroundColor = '#f4f3f3';
    mediaPlayer.style.position = 'fixed';
    mediaPlayer.style.bottom = '0';
    mediaPlayer.style.left = '0';
    mediaPlayer.style.right = '0';
    mediaPlayer.style.display = 'flex';
    mediaPlayer.style.justifyContent = 'center';
    mediaPlayer.style.zIndex = '1000';
    mediaPlayer.style.marginBottom = '3rem';
    mediaPlayer.style.marginLeft = '1.5rem';
    mediaPlayer.style.borderRadius = '10px';
    mediaPlayer.style.width = '90%';
  }
}




const playPreview = (playlist) => {
  currentPlaylist.value = playlist;
  // Assuming that each playlist has a previewUrl
  audioPlayer.src = playlist.previewUrl;
  audioPlayer.play();
  isPlaying.value = true;
  mediaPlayerStyle(playlist);
  emit('playPreview', playlist);
};


const next = () => {
  const currentIndex = featuredPlaylists.value.findIndex(
    playlist => playlist.id === currentPlaylist.value.id
  );
  if (currentIndex < featuredPlaylists.value.length - 1) {
    playPreview(featuredPlaylists.value[currentIndex + 1]);
  }
};

const previous = () => {
  const currentIndex = featuredPlaylists.value.findIndex(
    playlist => playlist.id === currentPlaylist.value.id
  );
  if (currentIndex > 0) {
    playPreview(featuredPlaylists.value[currentIndex - 1]);
  }
};

const seek = (time) => {
  audioPlayer.currentTime = time;
};


const toggleFullscreen = () => {
   emit('toggleFullscreen')
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