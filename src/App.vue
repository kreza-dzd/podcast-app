<template>
  <div id="app">
    <header>
      <button class="menu-toggle" @click="toggleSidebar">
        <span class="menu-line" :class="{ active: showSidebar }" />
        <span class="menu-line" :class="{ active: showSidebar }" />
        <span class="menu-line" :class="{ active: showSidebar }" />
      </button>
      <h1 class="app-title">My App</h1>
       <div class="user-profile">
      <img src="/img/CD.jpg" alt="User Profile" />
      </div>
       <div class="search-container">
        <input type="text" placeholder="Search" />
      </div>
    </header>
   <div class="sidebar" :class="{ active: showSidebar }">
    <nav>
      <ul>
        <li>
          <a href="#"><font-awesome-icon icon="search" /> Discover</a>
        </li>
        <li>
          <a href="#"><font-awesome-icon icon="users" /> Community</a>
        </li>
        <li>
          <a href="#"><font-awesome-icon icon="book" /> Library</a>
        </li>
        <li>
          <a href="#"><font-awesome-icon icon="user" /> Personal</a>
        </li>
      </ul>
    </nav>
  </div>

    <main>
      <PodcastList />
    </main>
  </div>
</template>

<script>
import PodcastList from "./components/PodcastList.vue";


export default {
  components: {
    PodcastList,
  },
  data() {
    return {
      showSidebar: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>

<style>

body {
  background-color: #1D1E1E;
  color: #fff;
  font-family: 'Bebas Neue', cursive;
  font-size: 16px;
  line-height: 1.5;
}


.app-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
}


.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-profile {
  position: absolute;
  right: 10px;
  top: 20px;
}


.user-profile img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
}


.menu-toggle {
  position: absolute;
  left: 10px;
  top: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
}

.menu-line {
  width: 30px;
  height: 3px;
  background-color: #fff;
  display: block;
  margin: 5px 0;
  transition: all 0.3s ease;
}

.menu-line.active {
  background-color: #1D1E1E;
}

.menu-line.active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);

}

.menu-line.active:nth-child(2) {
  opacity: 0;
}

.menu-line.active:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

input[type="text"] {
  border: none;
  padding: 10px;
  width: calc(100% - 20px);
  border-radius: 30px;
  background-color: #94A6A0;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
}

input[type="text"]::placeholder {
  color: whitesmoke;
  opacity: 1; /* Firefox */
}

input[type="text"]:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: whitesmoke;
}

input[type="text"]::-ms-input-placeholder {
  /* Microsoft Edge */
  color: whitesmoke;
}


.sidebar {
  position: fixed;
  left: -40%;
  top: 0;
  width: 40%;
  height: 100%;
  background: #f8f8f8;
  transition: all 0.3s ease;
}

.sidebar.active {
  left: 0;
}

.sidebar nav ul {
  list-style-type: none;
  padding: 60px 0 20px 0;
}

.sidebar nav ul li {
  margin-bottom: 15px;
}

.sidebar nav ul li a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.sidebar nav ul li a .font-awesome-icon {
  margin-right: 8px;
}


.sidebar nav ul li a i {
  margin-right: 10px;
}


</style>

