<template>
  <div>
    <button @click="requestTracks">Search for a track</button>
    <table>
      <thead>
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
          @click="setPreviewUrl(item.preview_url)"
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
    <audio ref="audioPlayer" controls></audio>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
const axios = require('axios');

const clientId = '17e41028c79e4f128a873410a112bd0e';
const clientSecret = 'de2b9acdd949438588e2a21958897c3f';

const encodedAuth = window.btoa(`${clientId}:${clientSecret}`);

const state = reactive({
  tracks: [],
});

const previewUrl = ref('');

const requestTracks = async () => {
  await axios
    .post(
      'https://accounts.spotify.com/api/token',
      {
        grant_type: 'client_credentials',
      },
      {
        headers: {
          Authorization: `Basic ${encodedAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then((response) => {
      const accessToken = response.data.access_token;

      axios
        .get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: 'blue',
            type: 'track',
          },
        })
        .then((response) => {
          state.tracks = response.data.tracks.items;
          console.log(state.tracks);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

const formatDuration = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const setPreviewUrl = (url) => {
  previewUrl.value = url;
  const audioPlayer = document.querySelector('audio');
  audioPlayer.src = url;
  audioPlayer.play();
};

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
  height: 50px;
}
</style>
