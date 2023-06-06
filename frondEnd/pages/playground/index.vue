<template>
  <div>
    <Sidebar @closeSideBar="closeSideBarFrontEnd" :showSideBar="showSideBar" />
    <Header @showSideBar="showSideBarFrontEnd" />
    <TopPlayGround />
    <MainPlayGround />
    <Footer />
  </div>
</template>
<script>
import Header from "../../components/frontend/HeaderComponent.vue";
import Footer from "../../components/frontend/FooterComponent.vue";
import Sidebar from "../../components/frontend/SidebarComponent.vue";
import TopPlayGround from "../../components/frontend/playground/TopPlayGroundComponent.vue";
import MainPlayGround from "../../components/frontend/playground/MainPlayGroundComponent.vue";
export default {
  components: {
    Header,
    Footer,
    Sidebar,
    TopPlayGround,
    MainPlayGround,
  },
  data() {
    return {
      showSideBar: false,
    };
  },
  methods: {
    showSideBarFrontEnd(value) {
      this.showSideBar = value;
    },
    closeSideBarFrontEnd(value) {
      this.showSideBar = value;
    },
  },
};
</script>
<style scoped >
</style>