<template >
  <section class="section">
    <div class="container">
      <div class="row bottom-50">
        <div class="col-12">
          <div class="heading heading--center">
            <span class="heading__pre-title">{{$t('body.home.News')}}</span>
            <h3 class="heading__title">
              {{$t('body.home.featured')}}
              <span class="color--green">{{$t('body.home.News')}}</span>
            </h3>
            <span class="heading__layout layout--lgray">{{$t('body.home.new')}}</span>
          </div>
        </div>
      </div>
      <div id="box-featured-news" v-if="results && results.length " class="row offset-30">
        <div class="col-lg-6 col-xl-3" v-for="result of results" :key="result._id">
          <div class="news-item news-item--style-1 news-item--small" v-if="result.hotPoint >= Number(pointRequiredForTag) && result.view >= Number(viewRequiredForTag)">
            <a :href="'/news/?id='+ result._id">
              <span style="color:#e0e6ed;margin-left: 5px;margin-top: 5px;padding: 4px 12px;position: absolute;font-size: 12px;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;" class="w-currency align-self-center">🔥 Hot</span>
              <span style="color:#e0e6ed;margin-left: 75px;margin-top: 5px;padding: 4px 12px;position: absolute;font-size: 12px;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;" class="w-currency align-self-center">👀 Interested</span>
              <div class="news-item__img">
                <img v-if="getAllImage(result.image_url) !=''" class="img--bg" :src="getAllImage(result.image_url)" alt="img" />
                <img v-else class="img--bg" src="~/static/img/logo-waterportal.png" alt="img" />
              </div>
            </a>
            <div class="news-item__content">
              <div class="box-title-des">
                <h6 class="news-item__title">
                  <a :href="'/news/?id='+ result._id">{{result.title}}</a>
                </h6>
                <p>{{result.content}}</p>
              </div>
              <div class="news-item__details">
                <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
                <a style="text-decoration: none;" :href="'https://www.'+getHostName(result.url)" target="_blank">
                  <span style="color:#767F7F;">{{getHostName(result.url)}}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="news-item news-item--style-1 news-item--small" v-else-if="result.hotPoint >= Number(pointRequiredForTag)">
            <div class="news-item news-item--style-1 news-item--small">
              <a :href="'/news/?id='+ result._id">
                <div class="news-item__img">
                  <span style="color:#e0e6ed;margin-left: 5px;margin-top: 5px;padding: 4px 12px;font-size: 12px;position: absolute;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;" class="w-currency align-self-center">🔥 Hot</span>
                  <img v-if="getAllImage(result.image_url) !=''" class="img--bg" :src="getAllImage(result.image_url)" alt="img" />
                  <img v-else class="img--bg" src="~/static/img/logo-waterportal.png" alt="img" />
                </div>
              </a>
              <div class="news-item__content">
                <div class="box-title-des">
                  <h6 class="news-item__title">
                    <a :href="'/news/?id='+ result._id">{{result.title}}</a>
                  </h6>
                  <p>{{formatDescription(result.content)}}</p>
                </div>
                <div class="news-item__details">
                  <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
                  <a style="text-decoration: none;" :href="'https://www.'+getHostName(result.url)" target="_blank">
                    <span style="color:#767F7F;">{{getHostName(result.url)}}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="news-item news-item--style-1 news-item--small" v-else-if="result.view >= Number(viewRequiredForTag)">
            <div class="news-item news-item--style-1 news-item--small">
              <a :href="'/news/?id='+ result._id">
                <div class="news-item__img">
                  <span style="color:#e0e6ed;margin-left: 5px;margin-top: 5px;padding: 4px 12px;font-size: 12px;position: absolute;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;" class="w-currency align-self-center">👀 Interested</span>
                  <img v-if="getAllImage(result.image_url) !=''" class="img--bg" :src="getAllImage(result.image_url)" alt="img" />
                  <img v-else class="img--bg" src="~/static/img/logo-waterportal.png" alt="img" />
                </div>
              </a>
              <div class="news-item__content">
                <div class="box-title-des">
                  <h6 class="news-item__title">
                    <a :href="'/news/?id='+ result._id">{{result.title}}</a>
                  </h6>
                  <p>{{formatDescription(result.content)}}</p>
                </div>
                <div class="news-item__details">
                  <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
                  <a style="text-decoration: none;" :href="'https://www.'+getHostName(result.url)" target="_blank">
                    <span style="color:#767F7F;">{{getHostName(result.url)}}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="news-item news-item--style-1 news-item--small" v-else>
            <div class="news-item news-item--style-1 news-item--small">
              <div v-on:click="gotoDetailNew(result._id)">
                <div class="news-item__img">
                  <img v-if="getAllImage(result.image_url) !=''" class="img--bg" :src="getAllImage(result.image_url)" alt="img" />
                  <img v-else class="img--bg" src="~/static/img/logo-waterportal.png" alt="img" />
                </div>
              </div>
              <div class="news-item__content">
                <div class="box-title-des">
                  <h6 class="news-item__title">
                    <a :href="'/news/?id='+ result._id">{{result.title}}</a>
                  </h6>
                  <p>{{formatDescription(result.content)}}</p>
                </div>
                <div class="news-item__details">
                  <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
                  <a style="text-decoration: none;" :href="'https://www.'+getHostName(result.url)" target="_blank">
                    <span style="color:#767F7F;">{{getHostName(result.url)}}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row offset-30" v-else>
        <div class="overlay" id="loading-box-archive">
          <div id="text">
            <svg class="svg-container" height="32" width="32" viewBox="0 0 100 100">
              <circle class="loader-svg bg" cx="50" cy="50" r="45" />
              <circle class="loader-svg animate" cx="50" cy="50" r="45" />
            </svg>
            Loading
          </div>
        </div>
      </div>
      <div class="col-12 heading heading--center top-50">
        <a class="btn-view-all" href="/news/">
          <button class="button button--green">
            <span>{{$t('body.home.viewAll')}}</span>
            <svg class="icon" viewBox="0 0 24 24" id="Isolation_Mode" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.935,16.271l2.78-2.78L0,13.466l0-3,19.7.025L16.935,7.727l2.121-2.12,3.919,3.918a3.5,3.5,0,0,1,0,4.948l-3.919,3.918Z" />
            </svg>
          </button>
        </a>
      </div>
    </div>
  </section>
</template>
<script>
import { HTTP } from "../../../static/baseAPI.js";
export default {
  data() {
    return {
      results: [],
      errors: [],
      dataInputSearch: "",
      pointRequiredForTag: 10,
      viewRequiredForTag: 10,
    };
  },
  methods: {      
    getAllImage(value) {
      console.log(value)
      if (value === '' | value == null) {
        let newString = '~/static/img/logo-waterportal.png'
        return newString;
      }
      else{
        let newString = "";
        let stringImage = value.split("\n");
        
        // let stringImage = value
        for (let index = 0; index < stringImage.length; index++) {
          newString = stringImage[0];
        }
        return newString;

      }
      
      
      
    },
    formatDescription(description) {
      if (description.length > 51) {
        description = description.substring(0, 70) + "...";
      }
      return description;
    },
     getHostName(value){
        var parser = document.createElement('a');
        parser.href = value;
        let namePage = parser.hostname
        let removeChart = namePage.substr(0, 4)
        if (removeChart === 'www.') namePage = namePage.substr(4, namePage.length)
        if (namePage === 'waterdata.usgs.gov') namePage = 'usgs.gov'
        return namePage
    },  
  },
  mounted() {
    HTTP.get(`home/getnews`)
      .then((response) => {
        this.results = response.data
        console.log(this.results)
          // (this.pointRequiredForTag = response.data[1]),
          // (this.viewRequiredForTag = response.data[2]);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style scoped>
.news-item__img::before {
  padding-top: 0px !important;
  content: none !important;
  display: none;
}
.news-item__img .img--bg {
  position: initial !important ;
  height: 160px !important;
}
</style>
