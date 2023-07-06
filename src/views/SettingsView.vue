<template>
    <div>
      <button @click="closeSettings">
        <font-awesome-icon :icon="['fas', 'chevron-left']"/>
      </button>
      <h1>Settings</h1>
  
      <div class="settings">
        <div class="settings-content">

          <label for="theme">Theme:</label>
          <select id="theme" v-model="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  export default {
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
        theme: 'light',
      }
    },
    watch: {
      theme(newTheme) {
        // Dispatch an action or commit a mutation to your Vuex store
        this.$store.commit('setTheme', newTheme);
      },
   
    }
  }
  </script>

<style scoped>

h1 {
  text-align: center;
}
.settings {
height: 100vh;
  background-color: beige;
  text-align: center;
}

.settings-content {
  padding-top: 5rem;
}
</style>

  