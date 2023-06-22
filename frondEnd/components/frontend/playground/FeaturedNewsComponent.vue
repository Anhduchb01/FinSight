<template >
  <div class="container">
    <horizontal-scroll class="horizontal-scroll">
      <div id="box-featured-news" v-if="results && results.length " class="container-news-scroll">
        <div class="content-news-scroll" v-for="result of results" :key="result._id">
          <div class="news-item news-item--style-1 news-item--small" v-if="result.hotPoint >= Number(pointRequiredForTag) && result.view >= Number(viewRequiredForTag)">
            <span style="color:#e0e6ed;margin-left: 5px;margin-top: 5px;padding: 4px 12px;position: absolute;font-size: 12px;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;" class="w-currency align-self-center">🔥 Hot</span>
            <span style="color:#e0e6ed;margin-left: 75px;margin-top: 5px;padding: 4px 12px;position: absolute;font-size: 12px;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;" class="w-currency align-self-center">👀 Interested</span>
            <a style="cursor: pointer" v-on:click="getTextFromNew(result._id)">
              <div class="news-item__img">
                <img v-if="getAllImage(result.urlimage) !=''" class="img--bg" :src="getAllImage(result.urlimage)" alt="img" />
                <img v-else class="img--bg" src="~/static/img/logo-waterportal.png" alt="img" />
              </div>
            </a>
            <div style="cursor: pointer" v-on:click="getTextFromNew(result._id)" class="news-item__content">
              <div class="box-title-des">
                <h6 class="news-item__title">
                  <a v-on:click="getTextFromNew(result._id)">{{result.title}}</a>
                </h6>
                <p>{{result.description}}</p>
              </div>
              <div class="news-item__details">
                <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
                <a style="text-decoration: none;" target="_blank">
                  <span style="color:#767F7F;">{{getHostName(result.url)}}</span>
                </a>
              </div>
            </div>          
          </div>
          <div class="news-item news-item--style-1 news-item--small" v-else-if="result.hotPoint >= Number(pointRequiredForTag)">
            <a style="cursor: pointer" v-on:click="getTextFromNew(result._id)">
              <div class="news-item__img">
                <span style="color:#e0e6ed;margin-left: 5px;margin-top: 5px;padding: 4px 12px;font-size: 12px;position: absolute;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;" class="w-currency align-self-center">🔥 Hot</span>
                <img v-if="getAllImage(result.urlimage) !=''" class="img--bg" :src="getAllImage(result.urlimage)" alt="img" />
                <img v-else class="img--bg" src="~/static/img/logo-waterportal.png" alt="img" />
              </div>
            </a>
            <div style="cursor: pointer" v-on:click="getTextFromNew(result._id)" class="news-item__content">
              <div class="box-title-des">
                <h6 class="news-item__title">
                  <a v-on:click="getTextFromNew(result._id)">{{result.title}}</a>
                </h6>
                <p>{{result.description}}</p>
              </div>
              <div class="news-item__details">
                <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
                <a style="text-decoration: none;" target="_blank">
                  <span style="color:#767F7F;">{{getHostName(result.url)}}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="news-item news-item--style-1 news-item--small" v-else-if="result.view >= Number(viewRequiredForTag)">
            <a style="cursor: pointer" v-on:click="getTextFromNew(result._id)">
              <div class="news-item__img">
                <span style="color:#e0e6ed;margin-left: 5px;margin-top: 5px;padding: 4px 12px;font-size: 12px;position: absolute;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;" class="w-currency align-self-center">👀 Interested</span>
                <img v-if="getAllImage(result.urlimage) !=''" class="img--bg" :src="getAllImage(result.urlimage)" alt="img" />
                <img v-else class="img--bg" src="~/static/img/logo-waterportal.png" alt="img" />
              </div>
            </a>
            <div style="cursor: pointer" v-on:click="getTextFromNew(result._id)" class="news-item__content">
              <div class="box-title-des">
                <h6 class="news-item__title">
                  <a v-on:click="getTextFromNew(result._id)">{{result.title}}</a>
                </h6>
                <p>{{result.description}}</p>
              </div>
              <div class="news-item__details">
                <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
                <a style="text-decoration: none;" target="_blank">
                  <span style="color:#767F7F;">{{getHostName(result.url)}}</span>
                </a>
              </div>
            </div>
          </div>
          <div class="news-item news-item--style-1 news-item--small" v-else>
            <div class="news-item news-item--style-1 news-item--small">
              <a style="cursor: pointer" v-on:click="getTextFromNew(result._id)">
                <div class="news-item__img">
                  <img v-if="getAllImage(result.urlimage) !=''" class="img--bg" :src="getAllImage(result.urlimage)" alt="img" />
                  <img v-else class="img--bg" src="~/static/img/logo-waterportal.png" alt="img" />
                </div>
              </a>
              <div style="cursor: pointer" v-on:click="getTextFromNew(result._id)" class="news-item__content">
                <div class="box-title-des">
                  <h6 class="news-item__title">
                    <a v-on:click="getTextFromNew(result._id)">{{result.title}}</a>
                  </h6>
                  <p>{{result.description}}</p>
                </div>
                <div class="news-item__details">
                  <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
                  <a style="text-decoration: none;" target="_blank">
                    <span style="color:#767F7F;">{{getHostName(result.url)}}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </horizontal-scroll>
  </div>
</template>
<script>
import { HTTP } from "../../../static/baseAPI.js";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
export default {
  data() {
    return {
      results: [],
      errors: [],
      dataInputSearch: "",
      pointRequiredForTag: null,
      viewRequiredForTag: null,
      textContent: null,
    };
  },
  components: {
    HorizontalScroll,
  },
  methods: {
    getTextFromNew(id) {
      HTTP.get(`detail-new/` + id).then((response) => {
        let contentText;
        let data = response.data;
        let text = data[0].description;
        text = text.split(" ").slice(0, 480).join(" ");
        text = text.replace(/\s\s+/g, ' ');
        text = text.replace(/(^[ \t]*\n)/gm, "");
        this.$emit("text", text)
      });
      HTTP.get(`get-tags`, { params: { id: id } }).then((response) => {
        let dataTagName = response.data.tagai;
        this.$emit("dataTagName", dataTagName);
      });
    },
    getAllImage(value) {
      let newString = "";
      let stringImage = value.split("\n");
      for (let index = 0; index < stringImage.length; index++) {
        newString = stringImage[0];
      }
      // if (newString === '') newString = '~/static/img/logo-waterportal.png'
      return newString;
    },
    formatDescription(description) {
      if (description.length > 51) {
        description = description.substring(0, 70) + "...";
      }
      return description;
    },
    getHostName(value) {
      var parser = document.createElement("a");
      parser.href = value;
      let namePage = parser.hostname;
      let removeChart = namePage.substr(0, 4);
      if (removeChart === "www.")
        namePage = namePage.substr(4, namePage.length);
      if (namePage === "waterdata.usgs.gov") namePage = "usgs.gov";
      return namePage;
    },
  },
  mounted() {
    HTTP.get(`getdata`, { params: { dataInputSearch: this.dataInputSearch } })
      .then((response) => {
        (this.results = response.data[0][0]),
          (this.pointRequiredForTag = response.data[1]),
          (this.viewRequiredForTag = response.data[2]);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style scoped>
@import  '~/static/css/homepage.css';
@import '~static/css/styles.min.css';
._horizontal-scroll[data-v-5ce095ec] {
  white-space: initial!important;
}
.news-item__content {
  width: 278px!important;
}
.container-news-scroll {
  display: flex;
  width: 100%;
}
.content-news-scroll {
  width: 25%;
  margin-right: 20px;
}
.news-item__img::before {
  padding-top: 0px !important;
  content: none !important;
  display: none;
}
.news-item__img .img--bg {
  position: initial !important ;
  height: 160px !important;
}
.horizontal-scroll { 
  height: 440px;
  overscroll-behavior: contain
}
.content-news-scroll{
  opacity: 0.8;
}
.content-news-scroll:hover{
  opacity: 1;
  transition: opacity 3s;
  
}
</style>