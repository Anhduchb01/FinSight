<template>
  <div class="border-box">
    <div id="loading-box-article" style="display: none;" class="loading-overlay">
      <div class="text">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#79db72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
        </svg>
        Recalculate
      </div>
    </div>
    <div class="row" style="padding-top: 70px;">
      <div class="col-12">
        <div class="heading heading--center">
          <span class="heading__pre-title">News</span>
          <h3 class="heading__title">
            Featured
            <span class="color--green">News</span>
          </h3>
          <span class="heading__layout layout--lgray">NEWS</span>
        </div>
      </div>
    </div>
    <div id="box-featured-news" v-if="dataArticle && dataArticle.length " class="row offset-30 box-featured-news">
      <div class="col-lg-6 col-xl-3" v-for="(result,index) of dataArticle" :key="result._id">
        <div style="margin-bottom:15px;" class="news-item news-item--style-1 news-item--small" v-if="result.hotPoint >= Number(pointRequiredForTag) && result.view >= Number(viewRequiredForTag)">
          <a :href="'/news/?id='+result._id">
            <div class="news-item__img">
              <span style="margin-left: 5px;margin-top: 5px;padding: 4px 12px;position: absolute;font-size: 12px;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;color: white;" class="w-currency align-self-center">🔥 Hot</span>
              <span style="margin-left: 75px;margin-top: 5px;padding: 4px 12px;position: absolute;font-size: 12px;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;color: white;" class="w-currency align-self-center">👀 Interested</span>
              <img class="img--bg" :src="allImage[index]" alt="img" />
            </div>
          </a>
          <div class="news-item__content">
            <div class="box-title-des">
              <h6 class="news-item__title">
                <a style="color:#414a53;font-size: 18px;line-height: 20px !important;" :href="'/news/?id='+ result._id">{{result.title}}</a>
              </h6>
              <p style="color:#414a53;font-size: 16px;line-height: 1.6;">{{description[index]}}</p>
            </div>
            <div class="news-item__details">
              <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
              <span>🔥 {{result.hotPoint}}</span>
              <span style="color:#767F7F;">
                <svg style="margin-bottom: 1px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {{result.view}}
              </span>
            </div>
          </div>
        </div>
        <div style="margin-bottom:15px;" class="news-item news-item--style-1 news-item--small" v-else-if="Number(result.hotPoint) >= Number(pointRequiredForTag)">
          <a :href="'/news/?id='+ result._id">
            <div class="news-item__img">
              <span style="margin-left: 5px;margin-top: 5px;padding: 4px 12px;font-size: 12px;position: absolute;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;color: white;" class="w-currency align-self-center">🔥 Hot</span>
              <img class="img--bg" :src="allImage[index]" alt="img" />
            </div>
          </a>
          <div class="news-item__content">
            <div class="box-title-des">
              <h6 class="news-item__title">
                <a style="color:#414a53;font-size: 18px;line-height: 20px !important;" :href="'/news/?id='+ result._id">{{result.title}}</a>
              </h6>
              <p style="color:#414a53;font-size: 16px;line-height: 1.6;">{{description[index]}}</p>
            </div>
            <div class="news-item__details">
              <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
              <span>🔥 {{result.hotPoint}}</span>
              <span style="color:#767F7F;">
                <svg style="margin-bottom: 1px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {{result.view}}
              </span>
            </div>
          </div>
        </div>
        <div style="margin-bottom:15px;" class="news-item news-item--style-1 news-item--small" v-else-if="Number(result.view)  >= Number(viewRequiredForTag)">
          <a :href="'/news/?id='+ result._id">
            <div class="news-item__img">
              <span style="margin-left: 5px;margin-top: 5px;padding: 4px 12px;font-size: 12px;position: absolute;border-radius: 21px;background: #1b2e4b;font-size: 12px;letter-spacing: 1px;color: white;" class="w-currency align-self-center">👀 Interested</span>
              <img class="img--bg" :src="allImage[index]" alt="img" />
            </div>
          </a>
          <div class="news-item__content">
            <div class="box-title-des">
              <h6 class="news-item__title">
                <a style="color:#414a53;font-size: 18px;line-height: 20px !important;" :href="'/news/?id='+ result._id">{{result.title}}</a>
              </h6>
              <p style="color:#414a53;font-size: 16px;line-height: 1.6;">{{description[index]}}</p>
            </div>
            <div class="news-item__details">
              <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
              <span>🔥 {{result.hotPoint}}</span>
              <span style="color:#767F7F;">
                <svg style="margin-bottom: 1px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {{result.view}}
              </span>
            </div>
          </div>
        </div>
        <div style="margin-bottom:15px;" class="news-item news-item--style-1 news-item--small" v-else>
          <a :href="'/news/?id='+result._id">
            <div class="news-item__img">
              <img class="img--bg" :src="allImage[index]" alt="img" />
            </div>
          </a>
          <div class="news-item__content">
            <div class="box-title-des">
              <h6 class="news-item__title">
                <a style="color:#414a53;font-size: 18px;line-height: 20px !important;" :href="'/news/?id='+result._id">{{result.title}}</a>
              </h6>
              <p style="color:#414a53;font-size: 16px;line-height: 1.6;">{{description[index]}}</p>
            </div>
            <div class="news-item__details">
              <span class="news-item__date">{{result.timeCreatePostOrigin}}</span>
              <span>🔥 {{result.hotPoint}}</span>
              <span style="color:#767F7F;">
                <svg style="margin-bottom: 1px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                {{result.view}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "../../../static/baseAPI.js";
export default {
  data() {
    return {
      data: [],
      dataArticle: [],
      hotPoint: [],
      pointRequiredForTag: 45,
      viewRequiredForTag: 5,
      allImage: [],
      description: [],
    };
  },
  mounted() {
    function getAllImage(value) {
      let newString = "";
      let stringImage = value.split("\n");
      for (let index = 0; index < stringImage.length; index++) {
        newString = stringImage[0];
      }
      if (newString === "") newString = "/img/logo-finsight.png";
      return newString;
    }
    function formatDescription(value) {
      let description = $(`<div>${value}</div>`).text();
      if (description.length > 51) {
        description = description.substring(0, 50) + "...";
        return description;
      }
    }
    HTTP.get(
      `sorting/article-see-more?percentLaster=50&percentViewed=50&pointDecreasePerDay=0.1&pointIncreasePerView=1&pointRequiredForTag=45&viewRequiredForTag=5`
    ).then((response) => {
      this.data = response.data;
      this.dataArticle = this.data[0];
      for (let i = 0; i < this.dataArticle.length; i++) {
        let result = this.dataArticle[i];
        this.hotPoint[i] = result.hotPoint.toFixed(2);
        this.allImage[i] = getAllImage(result.urlimage);
        this.description[i] = formatDescription(result.description);
      }
    });
  },
};
</script>

<style scoped>

</style>