<template>
  <div class="featured-container">
    <h2 class="section-title">Featured</h2>
    <div class="box-wrapper">
      <div
        v-for="(playlist, index) in featuredPlaylists.slice(0, 5)"
        :key="index"
        :class="`box-${index + 1}`"
      >
        <!-- Use optional chaining operator to safely access nested properties -->
        <img :src="playlist?.images?.[0]?.url" :alt="playlist?.name" />
        <div class="playlist-name">{{ playlist?.name }}</div>
      </div>
    </div>
  </div>
</template>

  

  

  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const featuredPlaylists = ref([]);
  
  onMounted(async () => {
    // Get Spotify access token
    const response = await getSpotifyAccessToken();
    const accessToken = response.data.access_token;
  
    // Fetch featured playlists
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
  
      featuredPlaylists.value = response.data.playlists.items;
    } catch (error) {
      console.error(error);
    }
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
  