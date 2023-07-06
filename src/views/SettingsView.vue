<template>

<div class="header" :class="$store.state.theme + '-theme'">
      <button @click="closeSettings">
        <font-awesome-icon :icon="['fas', 'chevron-left']"/>
      </button>
      <h1>Settings</h1>
  
    </div>
    <div class="settings" :class="$store.state.theme + '-theme'">
        <div class="settings-content">

          <label for="theme">Theme:</label>
          <select id="theme" v-model="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

        </div>
      </div>
  
  </template>
  
  <script>
  export default {
    emits: ['play', 'toggleFullscreen'],
    methods: {
    closeSettings() {
      this.$store.commit('TOGGLE_SIDEBAR');
      this.$router.push('/');
      // if you want to go back to the previous page, use this.$router.go(-1);
    },
  },
    beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('SET_SETTINGS_ACTIVE', true);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_SETTINGS_ACTIVE', false);
    next();
  },
    data() {
      return {
        theme: this.$store.state.theme,
      }
    },
    watch: {
  theme: {
    handler(newTheme) {
      this.$store.commit('setTheme', newTheme);
    },
    immediate: true, // to handle initial value
  }
}
  }

  </script>

<style>

.light-theme.header {
  background-color: #d1d1be;
  color: #000000;
}

.dark-theme.header {
  background-color: rgb(105, 106, 105);
  color: #F5F5DC;
}

.light-theme.settings {
  background-color: #F5F5DC;
  color: #000000;
}

.light-theme .header button {
  color: #000000; 
}


.dark-theme.settings {
  background-color: rgb(70, 71, 70);
  color: #F5F5DC;
}

.header {
  background-color: rgb(105, 106, 105);
  padding-top: 1em;
  padding-bottom: 1em;
}
.header button {
  height: 25px;
  width: 25px;
  font-size: 18px;
  position: absolute;
   top: 20px;
  left: 20px;
  background-color: transparent;
  color: #fff;
  border: none;
}

h1 {
  text-align: center;
}
.settings {
height: 100vh;
background-color: rgb(70, 71, 70);
  text-align: center;
}

.settings-content {
  padding-top: 5rem;
}
</style>

  