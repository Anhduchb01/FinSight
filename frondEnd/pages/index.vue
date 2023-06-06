<template>
  <div>
    <div class="body--static">
      <div class="page-wrapper">
        <Sidebar @closeSideBar="closeSideBarFrontEnd" :showSideBar="showSideBar" />
        <Header @showSideBar="showSideBarFrontEnd" v-bind:scroll="scroll" />
        <main class="main">
          <div class="front-promo">
            <div class="video-container">
              <LazyVideo :src="videoSrc" :attrs ="objectatr"  />
            </div>
            <div class="overlay">
              <p class="firstdesHeader" >{{ $t("body.home.firstdesHeader") }}</p>
              <h2 class="namedesHeader" >
                        FIN SIGHT
              </h2>
              <p class="lastdesHeader">{{ $t("body.home.desHeader") }}</p>
            </div>
          </div>
          <div class="container md:mt-24 mt-16">
                <div class="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                    <div class="lg:col-span-5 md:col-span-6 order-1 md:order-2">
                        <div class="lg:ms-8">
                            <img src="~/static/SEO_SVG.svg" alt="">
                        </div>
                    </div>

                    <div class="lg:col-span-7 md:col-span-6 mt-8 md:mt-0 order2 md:order-1">
                        <div class="lg:me-5">
                            <h6 class="text-indigo-600 text-sm font-bold uppercase mb-2">Easy To Track</h6>
                            <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Techwind Marketing <br> Analytics For All Expenses</h3>

                            <p class="text-slate-400 max-w-xl">You can combine all the Techwind templates into a single one, you can take a component from the Application theme and use it in the Website.</p>

                            <ul class="list-none text-slate-400 my-6">

                                <li class="mb-1 flex">
                                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                  <style>svg{fill:#4f46e5}</style>
                                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
                                  </svg>
                                  Digital Marketing Solutions for Tomorrow</li>
                                <li class="mb-1 flex">
                                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                  <style>svg{fill:#4f46e5}</style>
                                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
                                  </svg>
                                   Our Talented & Experienced Marketing Agency</li>
                                <li class="mb-1 flex">
                                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                  <style>svg{fill:#4f46e5}</style>
                                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/>
                                  </svg>
                                   Create your own skin to match your brand</li>
                            </ul>

                            <a href="" class="btn bg-indigo-600/5 hover:bg-indigo-600 border-indigo-600/10 hover:border-indigo-600 text-indigo-600 hover:text-white rounded-full">Get Started</a>
                        </div>
                    </div>
                </div>
            </div><!--end container-->

          <Viewall />
          <Map />
          <Service />
          <Footer />
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import Map from "../components/frontend/homepage/MapComponent.vue";
import Service from "../components/frontend/homepage/ServiceComponent.vue";
import Viewall from "../components/frontend/homepage/ViewallComponent.vue";
import Header from "../components/frontend/HeaderComponent.vue";
import Footer from "../components/frontend/FooterComponent.vue";
import Sidebar from "../components/frontend/SidebarComponent.vue";
export default {
  data() {
    return {
      showSideBar: false,
      scroll: false,
       videoSrc : require('~/static/blog.mp4'),
       objectatr : {"controls": false, "playsinline": true, "loop": true, "autoplay": true, "muted": true}
    };
  },
  components: {
    Map,
    Service,
    Viewall,
    Header,
    Footer,
    Sidebar,

  },
  methods:{
    showSideBarFrontEnd(value){
      this.showSideBar = value
    },
    closeSideBarFrontEnd(value){
      this.showSideBar = value
    }
  }
};
</script>
<style >
@import "~/static/css/homepage.css";
@import "~static/css/styles.min.css";
@import "~/static/css/tailwind.css";
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}


.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (change this value based on your video's aspect ratio) */
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 91%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;

  /* background-color: rgba(255, 255, 255, 0); */
    font-family: Roboto;
    width: auto;
    visibility: visible;
    background-image: none;
    text-align: center;
    line-height: 22px;
    letter-spacing: 0px;
    font-weight: 400;
    font-size: 20px;
    margin: 0px;
    border-radius: 20px;
    padding: 20px 0px;
    color: rgb(255, 255, 255);
    text-decoration: none;
    /* white-space: nowrap; */
    height: auto;

    opacity: 1;
    /* transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    transform-origin: 50% 50% 0px; */
}

.text {
  color: black;
  font-weight: bold;
}
.firstdesHeader {
  font-family: Poppins;
    display: inline-block;
    visibility: visible;
    text-align: center;
    line-height: 15px;
    letter-spacing: 3px;
    font-weight: 600;
    font-size: 18px;
    border-color: rgb(255, 255, 255);
    color: rgb(67, 126, 235);
    opacity: 1;

}
.namedesHeader{
  
    font-family: Lato;
    cursor: pointer;
    display: inline-block;
    visibility: visible;
    text-align: center;
    line-height: 55px;
    letter-spacing: 0px;
    font-weight: 700;
    font-size: 45px;
    border-color: rgb(67, 126, 235);
    border-style: none;
    border-radius: 0px;
    padding: 0px 5px 10px;
    color: rgb(71, 181, 255);
    text-decoration: none;
    white-space: normal;
    width: 660px;
    height: auto;
  
    opacity: 1;

}
.lastdesHeader{

    font-family: Karla;
    display: inline-block;
    visibility: visible;
    text-align: center;
    line-height: 22px;
    letter-spacing: 0px;
    font-weight: 400;
    font-size: 16px;
    border-color: rgb(255, 255, 255);
    border-style: none;
    border-radius: 0px;
    padding: 5px;
    color: rgba(49, 62, 91, 0.75);
    text-decoration: none;
    white-space: normal;
    width: auto;
    height: auto;
    opacity: 1;
}

</style>
