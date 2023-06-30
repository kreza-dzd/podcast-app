<template>
  <div class="rec-container">
    <h2 class="section-title">Recommended</h2>
    <div class="box-wrapper">
      <div
        v-for="(album, index) in recommendedAlbums.slice(0, 5)"
        :key="index"
        :class="`box-${index + 1}`"
        @click="playAlbumPreview(album, index)"
        @dblclick="toggleFullscreen"
      >
        <img :src="album.images[0].url" :alt="album.name" />



        <div class="album-name">{{ album.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits,} from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

const recommendedAlbums = ref([]);
let accessToken = null;
const store = useStore();

const emit = defineEmits([
  'toggleFullscreen', 
  'play'
]);

onMounted(async () => {
  // Get Spotify access token
  const response = await getSpotifyAccessToken();
  accessToken = response.data.access_token; 

  // Fetch recommended albums
  await fetchRecommendedAlbums(accessToken);
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

const playNextPreview = async (albums, currentAlbumIndex) => {
  for(let i = currentAlbumIndex + 1; i < albums.length; i++) {
    const album = albums[i];
    const response = await axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if(response.data.items.length > 0 && response.data.items[0].preview_url) {
      playPreview(response.data.items[0]);
      break;
    }
  }
};



const playAlbumPreview = async (album, index) => {

  try {

    const response = await axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if(response.data.items.length > 0 && response.data.items[0].preview_url) {
      // Pass the album object along with the track
      playPreview(response.data.items[0], album);
    } else {
      console.log('No tracks available in this album. Skipping to next...');
      playNextPreview(recommendedAlbums.value, index);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchRecommendedAlbums = async (accessToken) => {
  try {
    const seed_genres = 'pop';
    const response = await axios.get(`https://api.spotify.com/v1/recommendations?seed_genres=${seed_genres}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Extract album from each track and form an array of unique albums
    const albums = response.data.tracks.map(track => track.album);
    const uniqueAlbums = [...new Map(albums.map(album => [album['id'], album])).values()];

    recommendedAlbums.value = await filterAlbumsWithPreviews(uniqueAlbums, accessToken);
  } catch (error) {
    console.error(error);
  }
};

const filterAlbumsWithPreviews = async (albums, accessToken) => {
  let albumsWithPreviews = [];

  for (let album of albums) {
    const response = await axios.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const hasPreview = response.data.items.some(track => track.preview_url !== null);
    
    if(hasPreview) {
      albumsWithPreviews.push(album);
    }
  }

  return albumsWithPreviews;
};



const playPreview = (track, album) => {
  // Add album to track object if not already present
  if (!track.album) {
    track.album = album;
  }

  const transformedItem = {
    id: track.id,
    title: track.name,
    artist: track.artists && track.artists.length > 0 ? track.artists[0].name : 'Unknown Artist',
    album: track.album ? track.album.name : 'Unknown Album',
    duration: track.duration_ms,
    image: track.album && track.album.images && track.album.images.length > 0 ? track.album.images[0]?.url : 'No Image',
    audioPreviewUrl: track.preview_url,
  };
  
  if (track.preview_url) {
    emit('play', track);
    store.commit('setAudioPlayerSource', track.preview_url);
    store.commit('playAudio');
    store.commit('setCurrentPlayingTrack', transformedItem);
    store.commit('playNewTrack', track.preview_url);
    toggleFullscreen();
  } else {
    console.log(`No preview available for track ${track.id}`);
  }
};


const toggleFullscreen = () => {
  emit('toggleFullscreen');
};
</script>

<style scoped>
.rec-container {
  /* Add your styles */
}

.box {
  width: 200px;
  margin: 100px;
  text-align: center;
}

.box-wrapper {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  margin-bottom: 20px;
  padding: 40px 130px 50px 20px;
}

.album-name {
  margin-top: 5px;
}

  .album-name {
    color: black;
  }

img {
  width: 100%;
  height: auto;
}
</style>