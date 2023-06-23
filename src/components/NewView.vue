<template>
  <div class="new-container">
   <h2 class="section-title">New</h2>
   <div class="box-wrapper">
    <div
  v-for="(album, index) in newReleases.slice(0, 5)"
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
import { ref, onMounted,reactive, defineEmits  } from 'vue';
import axios from 'axios';

const newReleases = ref([]);
const audioPlayer = reactive(new Audio());
const currentPlaylist = ref(null);
let accessToken = null;

const emit = defineEmits([
  'toggleFullscreen', 
  'play'
]);

onMounted(async () => {
 // Get Spotify access token
 const response = await getSpotifyAccessToken();
 const accessToken = response.data.access_token;

 // Fetch new releases
 await fetchNewReleases(accessToken);
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

const fetchNewReleases = async (accessToken) => {
 try {
   const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
     headers: {
       Authorization: `Bearer ${accessToken}`,
     },
   });

   newReleases.value = response.data.albums.items;
 } catch (error) {
   console.error(error);
 }
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
      playNextPreview(newReleases.value, index);
    }
  } catch (error) {
    console.error(error);
  }
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
    audioPlayer.src = track.preview_url;
    audioPlayer.play();
    currentPlaylist.value = transformedItem;
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
.new-container {
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
 padding: 40px 50px 50px 20px;
}

.album-name {
 margin-top: 5px;
 color: black;
}

img {
 width: 100%;
 height: auto;
}
</style>