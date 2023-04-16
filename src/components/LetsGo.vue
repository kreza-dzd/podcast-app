<template>
 
    <button @click="requestTracks">Search for a track</button>
    

</template>

<script setup>
import { reactive } from 'vue';
const axios = require('axios')

const clientId = '17e41028c79e4f128a873410a112bd0e';
const clientSecret = 'de2b9acdd949438588e2a21958897c3f';

const encodedAuth = window.btoa(`${clientId}:${clientSecret}`)

const state = reactive({
    tracks: []
})


const requestTracks = ( async () => {
  
   await axios.post('https://accounts.spotify.com/api/token', {
    grant_type : 'client_credentials',
   }, {
    headers : {
        Authorization: `Basic ${encodedAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
   })

   .then(response => {
    const accessToken = response.data.access_token

    axios.get('https://api.spotify.com/v1/search', {
        headers : {
            Authorization : `Bearer ${accessToken}`,
        },
        params : {
            q : 'baby',
            type: 'track',
        },
    })
    .then(response => {
        state.tracks = response.data.tracks.items
        console.log(state.tracks)
    })
    .catch(error => {
        console.log(error)
    })
    })
    .catch(error => {
        console.log(error)
    })
 
})
  
</script>