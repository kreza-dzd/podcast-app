<template>
  <div class="featured-container">
    <h2 class="section-title">Featured</h2>
    <div class="box-wrapper">
      <div
        v-for="(playlist, index) in featuredPlaylists.slice(0, 5)"
        :key="index"
        :class="`box-${index + 1}`" @click="play(playlist.previewUrl)"
      >
        <img :src="playlist?.images?.[0]?.url" :alt="playlist?.name" />
        <div class="playlist-name">{{ playlist?.name }}</div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';

const featuredPlaylists = ref([]);
const audioPlayer = reactive(new Audio());


onMounted(async () => {
  const response = await getSpotifyAccessToken();
  const accessToken = response.data.access_token;
  await fetchFeaturedPlaylists(accessToken);
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

const fetchFeaturedPlaylists = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const previewUrls = await Promise.all(
      response.data.playlists.items.map(async (playlist) => {
        const tracksResponse = await axios.get(playlist.tracks.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return tracksResponse.data.items[0].track.preview_url;
      })
    );

    featuredPlaylists.value = response.data.playlists.items.map((playlist, index) => ({
      ...playlist,
      previewUrl: previewUrls[index],
    }));
  } catch (error) {
    console.error(error);
  }
};

const play = (previewUrl) => {
  if (!previewUrl) {
    console.error('No preview URL available for this playlist');
    return;
  }
  audioPlayer.pause();

  audioPlayer.src = previewUrl;
  audioPlayer.play();
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