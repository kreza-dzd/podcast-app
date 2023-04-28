<template>
   <div class="new-container">
    <h2 class="section-title">New</h2>
    <div class="box-wrapper">
      <div
        v-for="(album, index) in newReleases.slice(0, 5)"
        :key="index"
        :class="`box-${index + 1}`"
      >
        <img :src="album.images[0].url" :alt="album.name" />
        <div class="album-name">{{ album.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const newReleases = ref([]);

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
  padding: 40px;
}

.album-name {
  margin-top: 5px;
}

img {
  width: 100%;
  height: auto;
}
</style>
