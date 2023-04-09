<template>


    <main>
   
      <PodcastList />

  <div class="featured-container">
  <h2 class="section-title">Featured</h2>
  <div class="box-wrapper">
    <div class="box-1"></div>
    <div class="box-2"></div>
    <div class="box-3"></div>
    <div class="box-4"></div>
    <div class="box-5"></div>
  </div>
</div>


  <div class="new-container">
  <h2 class="section-title">New</h2>
  <div class="box-wrapper">
    <div class="box-6"></div>
    <div class="box-7"></div>
    <div class="box-8"></div>
    <div class="box-9"></div>
    <div class="box-10"></div>
  </div>
</div>
      <div class="recomend-container">
        <h2 class="section-title">Recomend You</h2>
        <div class="box-wrapper">
          <div class="box-11"></div>
          <div class="box-12"></div>
          <div class="box-12"></div>
          <div class="box-14"></div>
          <div class="box-15"></div>
        </div>
      </div>

    </main>

</template>

<script>

    import PodcastList from "../components/PodcastList.vue";

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
.featured-container {
  margin-top: 50px;
}
.new-container {
  margin-top: 50px;
}
.section-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-left: 10px;
}
.box-1, .box-2, .box-3, .box-4, .box-5 {
  flex: 0 0 70%;
  margin-right: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 30px;
  text-align: center;
}
.box-6, .box-7, .box-8, .box-9, .box-10 {
  flex: 0 0 50%;
  margin-right: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 30px;
  text-align: center;
}
.box-11, .box-12, .box-13, .box-14, .box-15 {
  flex: 0 0 30%;
  margin-right: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 30px;
  text-align: center;
}

.box-1, .box-10, .box-11 {
  background-color: #FEF755;
}
.box-2, .box-9, .box-12 {
  background-color: #83ECCC;
}
.box-3, .box-8, .box-13 {
  background-color: #A597FF;
}
.box-4, .box-7, .box-14 {
  background-color: #D17FF8;
}
.box-5, .box-6, .box-15 {
  background-color: #83D3F5;
}

.box-wrapper {
  display: flex;
  overflow-x: scroll;
  margin-bottom: 20px;
}
.featured-box img {
  width: 80%;
  margin-bottom: 20px;
}
.featured-box h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
.featured-box p {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
}
</style>