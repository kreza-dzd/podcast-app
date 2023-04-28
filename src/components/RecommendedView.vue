<template>
  <div class="rec-container">
    <h2 class="section-title">Recommended</h2>
    <div class="box-wrapper">
      <div
        v-for="(album, index) in recommendedAlbums.slice(0, 5)"
        :key="index"
        :class="`box-${index + 1}`"
      >
        <img :src="album.album.images[0].url" :alt="album.name" />
        <div class="album-name">{{ album.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const recommendedAlbums = ref([]);

onMounted(async () => {
  // Get Spotify access token
  const response = await getSpotifyAccessToken();
  const accessToken = response.data.access_token;

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

const fetchRecommendedAlbums = async (accessToken) => {
  try {
    const seed_genres = 'pop';
    const response = await axios.get(`https://api.spotify.com/v1/recommendations?seed_genres=${seed_genres}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    recommendedAlbums.value = response.data.tracks;
  } catch (error) {
    console.error(error);
  }
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
  padding: 70px;
}

.album-name {
  margin-top: 5px;
}

img {
  width: 100%;
  height: auto;
}
</style>
