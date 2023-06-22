<template>
  <div class="container container_playgorund" style="padding: 60px 0px">
    <form style="margin-top: 20px;" action>
      <textarea v-model="textFromNews" name="text-playground" id="text-playground" placeholder="Enter Text here" style="width: 100%; height: 200px;border-radius: 7px;padding: 12px"></textarea>
    </form>
    <div style="color: #888ea8;text-align: right">
      <span v-if="textFromNews.length > 0">{{textFromNews.length}}/5000</span>
      <span v-else>0/5000</span>
    </div>
    <!-- Phần 1  -->
    <div class="FeaturedNews">
      <div style="display: flex; cursor: pointer;width: 166px" v-on:click="seen1 = !seen1 ,reverse = !reverse ">
        <div class="Show-infor" style="margin-bottom: 20px">Import from articles</div>
        <span>
          <svg style="transition: transform 0.3s ease-in-out;" :class="{'reverse' : reverse}" xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="18" height="18">
            <path d="M5,9H19l-6.293,6.293a1,1,0,0,1-1.414,0Z" />
          </svg>
        </span>
      </div>
      <collapse-transition>
        <div id="Featured-News" v-show="seen1" style="margin-bottom: 10px">
          <div id="box-featured-news" class="row offset-30">
            <FeaturedNews @text="getTextFromNews($event)"></FeaturedNews>
          </div>
        </div>
      </collapse-transition>
    </div>
    <div class="row">
      <div class="col-xl" style="margin: 50px 0px;height: auto;width: 50%">
        <div class="model-predict" style="border-radius: 10px;border: 2px solid #e6e6e6;padding: 0px 20px">
          <div class="order-summary order-summary-en" style="width: 100%;">
            <div class="w-icon" style="display: flex;align-items: center;">
              <img style="margin-right:11px;position: absolute;left: 40px" class="image-en" src="~/static/img/gbr.png" alt="img" />
              <span style="position: absolute;left: 80px;" class="nameModel">English</span>
            </div>
            <div v-for="data in resultgetModelPlayGroundEn" :key="data._id" class="summary-list summary-profit" style="height: 78px;margin-bottom: 14px">
              <div class="summery-info" style="height: 100%;">
                <div class="w-summary-details">
                  <div class="w-summary-info">
                    <h6>
                      {{data.time}}
                      <span class="summary-count">{{data.name}}</span>
                    </h6>
                    <div class="summary-average">
                      <div class="w-summary-info">
                        <span class="badge color-badge-success inv-status" id="`status-bert-` + data._id + `-` +data.language" style="font-size: 17px">Score: {{data.score}}%</span>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button :disabled="isDisabled" v-on:click="predict('en')" class="predict" style="cursor: pointer;width: 100%">
              <span style=" color: white;font-size: 18px;font-weight: 600;">Analytics</span>
            </button>
          </div>
        </div>
      </div>
      <div class="col-xl" style="margin: 50px 0px;height: auto; width: 50%;">
        <div class="model-predict" style="border-radius: 10px;border: 2px solid #e6e6e6;padding: 0px 20px">
          <div class="order-summary order-summary-jp" style="width: 100%;">
            <div class="w-icon" style="display: flex;align-items: center;">
              <img style="margin-right:11px;position: absolute;left: 40px;" class="image-jp" src="~/static/img/japan.png" alt="img" />
              <span style="position: absolute;left: 88px;" class="nameModel">日本</span>
            </div>
            <div v-for="data in resultgetModelPlayGroundJp" :key="data._id" class="summary-list summary-income" style="height: 78px;margin-bottom: 14px">
              <div class="summery-info" style="height: 100%;">
                <div class="w-summary-details">
                  <div class="w-summary-info">
                    <h6>
                      {{data.time}}
                      <span class="summary-count">{{data.name}}</span>
                    </h6>
                    <div class="summary-average">
                      <div class="w-summary-info">
                        <span class="badge color-badge-success inv-status" id="`status-bert-` + data._id + `-` +data.language" style="font-size: 17px">Score: {{data.score}}%</span>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button :disabled="isDisabled" v-on:click="predict('jp')" class="predict" style="cursor: pointer;width: 100%">
              <span style=" color: white;font-size: 18px;font-weight: 600;">分析</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Các process bar  -->
    <div v-if="resultClassification.news">
      <!-- Phần 2  -->
      <div class="resultNer" v-if="show">
        <h4>Named-Entity Recognition</h4>
        <div class="row" style="margin-bottom:30px">
          <div class="col-xl" style="padding-left: 15px;height: auto;width: 50%;">
            <h5>AI:</h5>
            <div style="color: #888ea8;" v-html="text_htmlAiHTML" class="order-summary order-result-ai"></div>
          </div>
          <div class="col-xl" style="padding-left: 15px;margin:0px 10px;height: auto;width: 50%;">
            <h5>Library:</h5>
            <div style="color: #888ea8;" v-html="text_html" class="order-summary order-result-lib"></div>
          </div>
        </div>
      </div>
      <div class="View-Named-Entity" v-if="show">
        <div style="cursor: pointer;width: 106px" class="Views-Score" v-on:click="seen2 = !seen2 , reverse1 = !reverse1">
          <div class="clear-view" style="display:flex">
            <div class="Show-infor">Views Score</div>
            <span>
              <svg style="transition: transform 0.3s ease-in-out;" :class="{'reverse' : reverse1}" xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="18" height="18">
                <path d="M5,9H19l-6.293,6.293a1,1,0,0,1-1.414,0Z" />
              </svg>
            </span>
          </div>
        </div>
        <collapse-transition>
          <div v-show="seen2" style="margin: 5px 0px">
            <div class="border-item-tag"></div>
            <div id="RunArticle" style="padding: 15px 0px; display:flex">
              <div style="width:15%">
                <div class="classification" v-for="(result,index) of nerScore" :key="result.id">
                  <div :style="'background-color: '+colorBarCircle[index]" class="icon-category"></div>
                  <span>{{result}}</span>
                </div>
              </div>
              <div style="width:85%">
                <div v-for="(name,index) of listNameTag" :key="name.id" class="clear" style="display:flex;width: 100%">
                  <div style="width:20%;color:#888ea8;text-align:right;font-weight: 600;">{{name}}</div>
                  <div id="box-score-news" class="progress progress-box-score" style="width: 65%;height:14px;margin: 6px 0px 8px 25px;border-radius: 10px; background:#ebedf2;">
                    <div id="process-score-news" class="progress-bar bg-primary" role="progressbar" :style="'border-radius: 15px;height:14px;width:'+ value[index] +'%;'+'transition: 1s;background-color:'+ color[index] + '!important;border-color:'+color[index]" aria-valuemin="0" aria-valuemax="100">
                      <div class="progress-title-article"></div>
                    </div>
                  </div>
                  <div style="width:9%" class="percentValue">{{value[index]}}%</div>
                </div>
              </div>
            </div>
          </div>
        </collapse-transition>
      </div>
      <!-- Phần 3  -->
      <div class="Classification-Bar-circle" style="margin-top:10px" v-if="show">
        <div class="Classification" style="display: flex">
          <div class="process-bar-circle" style="width: 26.3333%">
            <div class="clear-bar-circle">
              <h4 style="font-size: 30px; margin-bottom: 44px;">Classification</h4>
              <div class="card">
                <div class="percent">
                  <svg>
                    <circle cx="105" cy="105" r="100" />
                    <circle cx="105" cy="105" r="100" :style="'--percent:'+max +';stroke:'+ colorBarCircle[max_index]" />
                  </svg>
                  <div class="number">
                    <h3>
                      {{max}}
                      <span>%</span>
                    </h3>
                  </div>
                </div>
                <span class="test1"></span>
              </div>
            </div>
          </div>
          <div class="Classification-category" style="width: 18%; margin-bottom: 80px;margin-top: 104px">
            <div class="classification" v-for="(result,index) of arrayClassification" :key="result.id">
              <div :style="'opacity: 0.45;background-color: '+colorBarCircle[index]" :class="{'max-index':index == max_index}" class="icon-category"></div>
              <span>{{category[index]}}</span>
            </div>
          </div>
          <div class="Percent-category" style="width: 53%; margin-top: 104px">
            <div class="Show-infor1" tyle="cursor: pointer;width: 106px" v-on:click="seen3 = !seen3,reverse2 =! reverse2">
              <div class="clear-button" style="display:flex">
                <div style="padding-bottom:10px ;" class="Show-infor">Views Score</div>
                <span style="cursor: pointer">
                  <svg style="transition: transform 0.3s ease-in-out;" :class="{'reverse' : reverse2}" xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="18" height="18">
                    <path d="M5,9H19l-6.293,6.293a1,1,0,0,1-1.414,0Z" />
                  </svg>
                </span>
              </div>
            </div>
            <div class="border-item-tag"></div>
            <collapse-transition>
              <div v-show="seen3" class="RunArticle-box-inline" style="height: 100px; padding: 15px 0px,">
                <div v-for="(result,index) of arrayClassification" :key="result.id" class="clear-runArticle" style="display:flex;width:100%">
                  <div style="width:20%;color:#888ea8;text-align: right;font-weight: 600;">{{category[index]}}</div>
                  <div id="box-score-news" class="progress progress-box-score" style="width: 60%;margin: 6px 0px 8px 20px;height: 14px;border-radius: 10px; background:#ebedf2">
                    <div id="process-score-news" class="progress-bar bg-primary" role="progressbar" :style="'border-radius: 15px;height:100%;width:' +(result* 100).toFixed(2) + '%;transition: 1s;background-color:'+colorBarCircle[index] +'!important;border-color: '+colorBarCircle[index]" aria-valuemin="0" aria-valuemax="100">
                      <div class="progress-title-article"></div>
                    </div>
                  </div>
                  <div style="width:10%" class="percentValue">{{(result* 100).toFixed(2)}}%</div>
                </div>
              </div>
            </collapse-transition>
          </div>
        </div>
      </div>
    </div>
    <div v-if="end">
      <h6 style="color: rgb(136, 142, 168);font-weight: 500!important;">Finish at: {{timeEndPredict}}</h6>
      <h6 style="color: rgb(136, 142, 168);font-weight: 500!important;">Computation time: {{((end - start)/1000).toFixed(1)}} s</h6>
    </div>
    <div style="margin-bottom: 30px;" v-if="loading.length ===0" class="loadding-chart" id="loading-chart-column">
      <svg class="svg-container" height="32" width="32" viewBox="0 0 100 100">
        <circle class="loader-svg bg" cx="50" cy="50" r="45" />
        <circle class="loader-svg animate" cx="50" cy="50" r="45" />
      </svg>
      loading...
    </div>
    <div v-if="checkPredict" class="predcit_faile" style="margin-bottom: 30px">
      <div style="display: flex;justify-content: center;">
        <img src="~/static/img/predict_fail.jpg" />
      </div>
      <div>
        <h5 style="display: flex;justify-content: center;color: rgb(136, 142, 168);">Oops, something went wrong.</h5>
        <h5 style="display: flex;justify-content: center;color: rgb(136, 142, 168)">Please try again later.</h5>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "../../../static/baseAPI.js";
import FeaturedNews from "/components/frontend/playground/FeaturedNewsComponent.vue";
import axios from "axios";
import { CollapseTransition } from "@ivanv/vue-collapse-transition";
export default {
  components: {
    FeaturedNews,
    CollapseTransition,
  },
  computed: {
    
    text_htmlAiHTML(){
      return "<div>" + this.text_htmlAi + "</div>";

    }
  },
  data() {
    return {
      loading: [1],
      checkPredict: false,
      timeEndPredict: null,
      nameTagFromText: [],
      listNameTag: [1],
      seen1: false,
      seen2: true,
      seen3: true,
      show: false,
      textFromNews: "",
      textAiAndLib: "",
      reverse: false,
      reverse1: false,
      reverse2: false,
      start: null,
      end: null,
      //Phần 1
      value: [],
      color: [],
      //Phần 2
      category: ["News", "Event", "Publications", "Other"],
      nerScore: ["Person","Organization","Location","Misc"],
      colorBarCircle: ["#79db72", "#578ef7", "#00dde1", "#a259cb"],      
      arrayClassification: [],
      max: 0,
      max_index: 0,
      resultgetModelPlayGroundEn: [],
      resultgetModelPlayGroundJp: [],
      result: [],
      resultAi: [],
      resultJp: [],
      //News:1 là điều kiện show and hide loading
      resultClassification: {
        news: 1,
      },
      text_html: null,
      text_htmlAi: null,
      word: 0,
      arrdes:[],
      isDisabled: false
      
    };
  },
  methods: {
    escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    splitLongText(text, maxLength) {
      const chunks = [];
      for (let i = 0; i < text.length; i += maxLength) {
        chunks.push(text.slice(i, i + maxLength));
      }
      return chunks;
    },

    async predictENAI() {
      this.resultAi = []
      this.arrdes = this.splitLongText(this.textAiAndLib, 400);
      for (let j = 0; j< this.arrdes.length;j++ ){
        var description = this.arrdes[j]
        var data ='{"id":"defaultEN","time":"2021/12/06 17:42:30","text":"' + description +'"}'
      var config = {
        method: "post",
        url: "https://jujni7y809.execute-api.ap-northeast-1.amazonaws.com/predict_ai_en",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      }
      await axios(config)
        .then((response) => {
          var resultData = response.data["message"];
          if (resultData.length >0){
            for (var x = 0, len = resultData.length; x < len; x++) {
                this.resultAi.push(resultData[x]);
            }
          }          
          if (this.resultAi.length !== 0) {
            if(j==this.arrdes.length-1){
              this.getDataFromNews("en");
              
              // this.resultAi = [...new Set(this.resultAi.map(item => item.name))];
              this.resultAi = [...new Map( this.resultAi.map(item =>[item['name'], item])).values()];
              for (let i = 0; i < this.listNameTag.size; i++) {
                let textFormatType1 = new RegExp(
                  this.escapeRegExp(this.resultAi[i].name),
                  "gi"
                );
                if (this.resultAi[i].type == "PER") {
                  this.text_htmlAi = this.text_htmlAi.replaceAll(
                    textFormatType1,
                    `<span style="background: #79db72;color:white;" data-entity="${this.resultAi[i].type}" data-hash="7" data-index="" class="bg-pink-100 text-pink-800 rounded px-1 py-0.5 dark:text-pink-100 dark:bg-pink-700" style="font-weight: 500;">${this.resultAi[i].name}<span style="background: #20b426;" class="text-xs select-none bg-pink-500 text-pink-100 rounded font-semibold px-0.5 ml-1">${this.resultAi[i].type}</span></span>`
                  )
                }
                if (this.resultAi[i].type == "LOC") {
                  this.text_htmlAi = this.text_htmlAi.replaceAll(
                    textFormatType1,
                    `<span style="background: #00dde1;color:white;" data-entity="${this.resultAi[i].type}" data-hash="6" data-index="" class="bg-fuchsia-100 text-fuchsia-800 rounded px-1 py-0.5 dark:text-fuchsia-100 dark:bg-fuchsia-700" style="font-weight: 500;">${this.resultAi[i].name}<span style="background: #15978b;" class="text-xs select-none bg-fuchsia-500 text-fuchsia-100 rounded font-semibold px-0.5 ml-1">${this.resultAi[i].type}</span></span>`
                  )
                }
                if (this.resultAi[i].type == "ORG") {
                  this.text_htmlAi = this.text_htmlAi.replaceAll(
                    textFormatType1,
                    `<span style="background: #578ef7;color:white;" data-entity="${this.resultAi[i].type}" data-hash="0" data-index="" class="bg-teal-100 text-teal-800 rounded px-1 py-0.5 dark:text-teal-100 dark:bg-teal-700" style="font-weight: 500;">${this.resultAi[i].name}<span style="background: #1d5acf;" class="text-xs select-none bg-teal-500 text-teal-100 rounded font-semibold px-0.5 ml-1">${this.resultAi[i].type}</span></span>`
                  )
                }
                if (this.resultAi[i].type == "MISC") {
                  this.text_htmlAi = this.text_htmlAi.replaceAll(
                    textFormatType1,
                    `<span style="background: #a259cb;color:white;" data-entity="${this.resultAi[i].type}" data-hash="4" data-index="" class="bg-violet-100 text-violet-800 rounded px-1 py-0.5 dark:text-violet-100 dark:bg-violet-700" style="font-weight: 500;">${this.resultAi[i].name}<span style="background: #6e2199;" class="text-xs select-none bg-violet-500 text-violet-100 rounded font-semibold px-0.5 ml-1">${this.resultAi[i].type}</span></span>`
                  )
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.checkPredict = true;
          //hide loading
          this.loading = [1];
        });
      }

    },
    predictEN() {
      this.text_html = "<div>" + this.textFromNews + "</div>";
      this.text_htmlAi =this.textFromNews
      this.textAiAndLib = this.textFromNews;
      this.removecharacterToReplace();
      this.start = window.performance.now();
      this.predictENAI();
      var data = '{"language":"en","text":"' + this.textAiAndLib + '"}';
      var config = {
        method: "post",
        url: "https://t022m89yh8.execute-api.ap-northeast-1.amazonaws.com/predict_lib",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          this.isDisabled = false
          this.result = response.data.message;
          this.predictClassification();
          for (let i = 0; i < this.result.length; i++) {
            let textFormatType1 = new RegExp(
              this.escapeRegExp(this.result[i].name),
              "gi"
            );
            if (this.result[i].type == "PER") {
              this.text_html = this.text_html.replaceAll(
                textFormatType1,
                `<span style="background: #79db72;color:white;" data-entity="${this.result[i].type}" data-hash="7" data-index="" class="bg-pink-100 text-pink-800 rounded px-1 py-0.5 dark:text-pink-100 dark:bg-pink-700" style="font-weight: 500;">${this.result[i].name}<span style="background: #20b426;" class="text-xs select-none bg-pink-500 text-pink-100 rounded font-semibold px-0.5 ml-1">${this.result[i].type}</span></span>`
              );
            }
            if (this.result[i].type == "LOC") {
              this.text_html = this.text_html.replaceAll(
                textFormatType1,
                `<span style="background: #00dde1;color:white;" data-entity="${this.result[i].type}" data-hash="6" data-index="" class="bg-fuchsia-100 text-fuchsia-800 rounded px-1 py-0.5 dark:text-fuchsia-100 dark:bg-fuchsia-700" style="font-weight: 500;">${this.result[i].name}<span style="background: #15978b;" class="text-xs select-none bg-fuchsia-500 text-fuchsia-100 rounded font-semibold px-0.5 ml-1">${this.result[i].type}</span></span>`
              );
            }
            if (this.result[i].type == "ORG") {
              this.text_html = this.text_html.replaceAll(
                textFormatType1,
                `<span style="background: #578ef7;color:white;" data-entity="${this.result[i].type}" data-hash="0" data-index="" class="bg-teal-100 text-teal-800 rounded px-1 py-0.5 dark:text-teal-100 dark:bg-teal-700" style="font-weight: 500;">${this.result[i].name}<span style="background: #1d5acf;" class="text-xs select-none bg-teal-500 text-teal-100 rounded font-semibold px-0.5 ml-1">${this.result[i].type}</span></span>`
              );
            }
            if (this.result[i].type == "MISC") {
              this.text_html = this.text_html.replaceAll(
                textFormatType1,
                `<span style="background: #a259cb;color:white;" data-entity="${this.result[i].type}" data-hash="4" data-index="" class="bg-violet-100 text-violet-800 rounded px-1 py-0.5 dark:text-violet-100 dark:bg-violet-700" style="font-weight: 500;">${this.result[i].name}<span style="background: #6e2199;" class="text-xs select-none bg-violet-500 text-violet-100 rounded font-semibold px-0.5 ml-1">${this.result[i].type}</span></span>`
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.checkPredict = true;
          //hide loading
          this.loading = [1];
        });
    },
    predictJP() {
      this.text_html = "<div>" + this.textFromNews + "</div>";
      this.text_htmlAi =  this.textFromNews ;
      this.textAiAndLib = this.textFromNews;
      this.removecharacterToReplace();
      this.start = window.performance.now();
      this.predictJPAI();
      // replace text_htmlAi  có tag rồi
      
      var data = '{"language":"jp","text":"' + this.textAiAndLib + '"}';
      var config = {
        method: "post",
        url: "https://t022m89yh8.execute-api.ap-northeast-1.amazonaws.com/predict_lib",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          this.result = response.data.message;
          this.predictClassification();
          for (let i = 0; i < this.result.length; i++) {
            let textFormatType1 = new RegExp(
              this.escapeRegExp(this.result[i].name),
              "gi"
            );
            if (this.result[i].type == "PER") {
              this.text_html = this.text_html.replaceAll(
                textFormatType1,
                `<span style="background: #79db72;color:white;" data-entity="${this.result[i].type}" data-hash="7" data-index="" class="bg-pink-100 text-pink-800 rounded px-1 py-0.5 dark:text-pink-100 dark:bg-pink-700" style="font-weight: 500;">${this.result[i].name}<span style="background: #20b426;" class="text-xs select-none bg-pink-500 text-pink-100 rounded font-semibold px-0.5 ml-1">${this.result[i].type}</span></span>`
              );
            }
            if (this.result[i].type == "LOC") {
              this.text_html = this.text_html.replaceAll(
                textFormatType1,
                `<span style="background: #00dde1;color:white;" data-entity="${this.result[i].type}" data-hash="6" data-index="" class="bg-fuchsia-100 text-fuchsia-800 rounded px-1 py-0.5 dark:text-fuchsia-100 dark:bg-fuchsia-700" style="font-weight: 500;">${this.result[i].name}<span style="background: #15978b;" class="text-xs select-none bg-fuchsia-500 text-fuchsia-100 rounded font-semibold px-0.5 ml-1">${this.result[i].type}</span></span>`
              );
            }
            if (this.result[i].type == "ORG") {
              this.text_html = this.text_html.replaceAll(
                textFormatType1,
                `<span style="background: #578ef7;color:white;" data-entity="${this.result[i].type}" data-hash="0" data-index="" class="bg-teal-100 text-teal-800 rounded px-1 py-0.5 dark:text-teal-100 dark:bg-teal-700" style="font-weight: 500;">${this.result[i].name}<span style="background: #1d5acf;" class="text-xs select-none bg-teal-500 text-teal-100 rounded font-semibold px-0.5 ml-1">${this.result[i].type}</span></span>`
              );
            }
            if (this.result[i].type == "MISC") {
              this.text_html = this.text_html.replaceAll(
                textFormatType1,
                `<span style="background: #a259cb;color:white;" data-entity="${this.result[i].type}" data-hash="4" data-index="" class="bg-violet-100 text-violet-800 rounded px-1 py-0.5 dark:text-violet-100 dark:bg-violet-700" style="font-weight: 500;">${this.result[i].name}<span style="background: #6e2199;" class="text-xs select-none bg-violet-500 text-violet-100 rounded font-semibold px-0.5 ml-1">${this.result[i].type}</span></span>`
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.checkPredict = true;
          //hide loading
          this.loading = [1];
        });
    },
    async predictJPAI() {
      this.resultAi = []
      this.arrdes = this.splitLongText(this.textAiAndLib, 250);
      for (let j = 0; j< this.arrdes.length;j++ ){
        var description = this.arrdes[j]
        var data =
        '{"id":"defaultJP","time":"2021/12/06 17:42:30","text":"' +
        description +
        '"}'
      var config = {
        method: "post",
        url: "https://ks0ojivmmf.execute-api.ap-northeast-1.amazonaws.com/predict_ai_jp",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      }
      await axios(config)
        .then((response) => {
          this.isDisabled = false
          var resultData = response.data["message"];
          if (resultData.length >0){
            for (var x = 0; x <  resultData.length ; x++) {
              if (resultData[x].type == '人名'){
                  resultData[x].type = 'PER';
              }else if (resultData[x].type == '法人名'){
                  resultData[x].type = 'ORG';
              }else if (resultData[x].type == '政治的組織名'){
                  resultData[x].type = 'ORG';
              }else if (resultData[x].type == 'その他の組織名'){
                  resultData[x].type = 'ORG';
              
              }else if (resultData[x].type == '施設名'){
                  resultData[x].type = 'ORG';
              }
              else if (resultData[x].type == '地名'){
                  resultData[x].type = 'LOC';
              }
              else if (resultData[x].type == '製品名'){
                  resultData[x].type = 'MISC';
              }
              else if (resultData[x].type == 'イベント名'){
                  resultData[x].type = 'MISC';
              }
              if(resultData[x].name.length >1){
                this.resultAi.push(resultData[x]);
              }
            }
          
          if (this.resultAi.length !== 0) {
            if(j==this.arrdes.length-1){
              this.getDataFromNews("en");
              // this.resultAi = [...new Set(this.resultAi.map(item => item.name))];
              this.resultAi = [...new Map( this.resultAi.map(item =>[item['name'], item])).values()];
              for (let i = 0; i < this.resultAi.length; i++) {
                let textFormatType1 = new RegExp(
                  this.escapeRegExp(this.resultAi[i].name),
                  "gi"
                );
                
                if (this.resultAi[i].type == "PER") {
                  this.text_htmlAi = this.text_htmlAi.replaceAll(
                    textFormatType1,
                    `<span style="background: #79db72;color:white;" data-entity="${this.resultAi[i].type}" data-hash="7" data-index="" class="bg-pink-100 text-pink-800 rounded px-1 py-0.5 dark:text-pink-100 dark:bg-pink-700" style="font-weight: 500;">${this.resultAi[i].name}<span style="background: #20b426;" class="text-xs select-none bg-pink-500 text-pink-100 rounded font-semibold px-0.5 ml-1">${this.resultAi[i].type}</span></span>`
                  )
                }
                if (this.resultAi[i].type == "LOC") {
                  this.text_htmlAi = this.text_htmlAi.replaceAll(
                    textFormatType1,
                    `<span style="background: #00dde1;color:white;" data-entity="${this.resultAi[i].type}" data-hash="6" data-index="" class="bg-fuchsia-100 text-fuchsia-800 rounded px-1 py-0.5 dark:text-fuchsia-100 dark:bg-fuchsia-700" style="font-weight: 500;">${this.resultAi[i].name}<span style="background: #15978b;" class="text-xs select-none bg-fuchsia-500 text-fuchsia-100 rounded font-semibold px-0.5 ml-1">${this.resultAi[i].type}</span></span>`
                  )
                }
                if (this.resultAi[i].type == "ORG") {
                  this.text_htmlAi = this.text_htmlAi.replaceAll(
                    textFormatType1,
                    `<span style="background: #578ef7;color:white;" data-entity="${this.resultAi[i].type}" data-hash="0" data-index="" class="bg-teal-100 text-teal-800 rounded px-1 py-0.5 dark:text-teal-100 dark:bg-teal-700" style="font-weight: 500;">${this.resultAi[i].name}<span style="background: #1d5acf;" class="text-xs select-none bg-teal-500 text-teal-100 rounded font-semibold px-0.5 ml-1">${this.resultAi[i].type}</span></span>`
                  )
                }
                if (this.resultAi[i].type == "MISC") {
                  this.text_htmlAi = this.text_htmlAi.replaceAll(
                    textFormatType1,
                    `<span style="background: #a259cb;color:white;" data-entity="${this.resultAi[i].type}" data-hash="4" data-index="" class="bg-violet-100 text-violet-800 rounded px-1 py-0.5 dark:text-violet-100 dark:bg-violet-700" style="font-weight: 500;">${this.resultAi[i].name}<span style="background: #6e2199;" class="text-xs select-none bg-violet-500 text-violet-100 rounded font-semibold px-0.5 ml-1">${this.resultAi[i].type}</span></span>`
                  )
                }
              }
            }
          }
          }
        })
        .catch((error) => {
          console.log(error);
          this.checkPredict = true;
          //hide loading
          this.loading = [1];
        })
      }
      

      
      
    },
    predictJPAI1() {
      var data =
        '{"id":"defaultJP","time":"2021/12/06 17:42:30","text":"' +
        this.textAiAndLib +
        '"}';
      var config = {
        method: "post",
        url: "https://ks0ojivmmf.execute-api.ap-northeast-1.amazonaws.com/predict_ai_jp",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          this.resultJp = response.data["message"];
          if (this.resultJp.length !== 0) {
            this.getDataFromNews("jp");
            for (let i = 0; i < this.listNameTag.size; i++) {
              let textFormatType1 = new RegExp(
                this.escapeRegExp(this.resultJp[i].name),
                "gi"
              );
              if (this.resultJp[i].type == "人名") {
                this.text_htmlAi = this.text_htmlAi.replaceAll(
                  textFormatType1,
                  `<span style="background: #79db72;color:white;" data-entity="${this.resultJp[i].type}" data-hash="7" data-index="" class="bg-pink-100 text-pink-800 rounded px-1 py-0.5 dark:text-pink-100 dark:bg-pink-700" style="font-weight: 500;">${this.resultJp[i].name}<span style="background: #20b426;" class="text-xs select-none bg-pink-500 text-pink-100 rounded font-semibold px-0.5 ml-1">${this.resultJp[i].type}</span></span>`
                );
              }
              if (this.resultJp[i].type == "地名") {
                this.text_htmlAi = this.text_htmlAi.replaceAll(
                  textFormatType1,
                  `<span style="background: #00dde1;color:white;" data-entity="${this.resultJp[i].type}" data-hash="6" data-index="" class="bg-fuchsia-100 text-fuchsia-800 rounded px-1 py-0.5 dark:text-fuchsia-100 dark:bg-fuchsia-700" style="font-weight: 500;">${this.resultJp[i].name}<span style="background: #15978b;" class="text-xs select-none bg-fuchsia-500 text-fuchsia-100 rounded font-semibold px-0.5 ml-1">${this.resultJp[i].type}</span></span>`
                );
              }
              if (this.resultJp[i].type == "法人名") {
                this.text_htmlAi = this.text_htmlAi.replaceAll(
                  textFormatType1,
                  `<span style="background: #578ef7;color:white;" data-entity="${this.resultJp[i].type}" data-hash="0" data-index="" class="bg-teal-100 text-teal-800 rounded px-1 py-0.5 dark:text-teal-100 dark:bg-teal-700" style="font-weight: 500;">${this.resultJp[i].name}<span style="background: #1d5acf;" class="text-xs select-none bg-teal-500 text-teal-100 rounded font-semibold px-0.5 ml-1">${this.resultJp[i].type}</span></span>`
                );
              }
              if (this.resultJp[i].type == "政治的組織名") {
                this.text_htmlAi = this.text_htmlAi.replaceAll(
                  textFormatType1,
                  `<span style="background: #a259cb;color:white;" data-entity="${this.resultJp[i].type}" data-hash="4" data-index="" class="bg-violet-100 text-violet-800 rounded px-1 py-0.5 dark:text-violet-100 dark:bg-violet-700" style="font-weight: 500;">${this.resultJp[i].name}<span style="background: #a9aeb3;" class="text-xs select-none bg-violet-500 text-violet-100 rounded font-semibold px-0.5 ml-1">${this.resultJp[i].type}</span></span>`
                );
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
          this.checkPredict = true;
          //hide loading
          this.loading = [1];
        });
    },
    predictClassification() {
      var data =
        '{"id":"default","time":"2021/12/06 17:42:30","text":"' +
        this.textAiAndLib +
        '"}';
      var config = {
        method: "post",
        url: "https://nofqol3o5h.execute-api.ap-northeast-1.amazonaws.com/predict_classification",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };
      axios(config)
        .then((response) => {
          this.resultClassification = response.data["message"];
          (this.loading = this.resultClassification),
            this.getValueAndColorMax();
          const today = new Date();
          var date =
            today.getFullYear() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getDate();
          var time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          this.end = window.performance.now();
          this.timeEndPredict = date + " " + time;
        })
        .catch((error) => {
          console.log(error);
          this.checkPredict = true;
          //hide loading
          this.loading = [1];
        });
    },
    predict(nameModel) {
      if (this.textFromNews != "") {
        this.isDisabled = true
        this.listNameTag = [];
        this.resultClassification = {};
        (this.end = null), (this.show = true);
        this.checkPredict = false;
        (this.loading = []), (this.seen1 = false);
        if (nameModel == "en") {
          this.predictEN();
        } else {
          this.predictJP();
        }
      }
    },
    removecharacterToReplace() {
      this.textAiAndLib = this.textAiAndLib.split(" ").slice(0, 480).join(" ");
      this.textAiAndLib = this.textAiAndLib.replace(/\s+/g, " ").trim();
      this.textAiAndLib = this.textAiAndLib.replace(
        /[&\/\\#,+()$~%'"“”*?<>{}]/g,
        ""
      );
      this.textAiAndLib = this.textAiAndLib.replace(/(^[ \t]*\n)/gm, "");
      this.textAiAndLib = this.textAiAndLib.replace("'", "");
      this.textAiAndLib = this.textAiAndLib.replace('"', "");
      this.textAiAndLib = this.textAiAndLib.replace("{", "");
      this.textAiAndLib = this.textAiAndLib.replace("}", "");
    },
    getTextFromNews(event) {
      this.textFromNews = "";
      this.textFromNews = event;
      this.textFromNews = this.textFromNews.trim();
      // this.removecharacterToReplace()
    },
    getDataFromNews(name) {
      this.listNameTag = [];
      this.listNameTag = new Set();
      if (name == "en") {
        for (let i = 0; i < this.resultAi.length; i++) {
          this.listNameTag.add(this.resultAi[i].name);
          if (this.resultAi[i].type == "PER") {
            this.color[i] = "#79db72";
            this.value[i] = (this.resultAi[i].score * 100).toFixed(2);
          } else if (this.resultAi[i].type == "ORG") {
            this.color[i] = "#578ef7";
            this.value[i] = (this.resultAi[i].score * 100).toFixed(2);
          } else if (this.resultAi[i].type == "LOC") {
            this.color[i] = "#00dde1";
            this.value[i] = (this.resultAi[i].score * 100).toFixed(2);
          } else {
            this.color[i] = "#a259cb";
            this.value[i] = (this.resultAi[i].score * 100).toFixed(2);
          }
        }
      } else {
        for (let i = 0; i < this.resultJp.length; i++) {
          this.listNameTag.add(this.resultJp[i].name);
          if (this.resultJp[i].type == "人名") {
            this.color[i] = "#79db72";
            this.value[i] = (this.resultJp[i].score * 100).toFixed(2);
          } else if (this.resultJp[i].type == "法人名") {
            this.color[i] = "#578ef7";
            this.value[i] = (this.resultJp[i].score * 100).toFixed(2);
          } else if (this.resultJp[i].type == "地名") {
            this.color[i] = "#00dde1";
            this.value[i] = (this.resultJp[i].score * 100).toFixed(2);
          } else {
            this.color[i] = "#a259cb";
            this.value[i] = (this.resultJp[i].score * 100).toFixed(2);
          }
        }
      }
    },
    getModelPlayGroundEn() {
      HTTP.get("playground/get-model-playground", {
        params: { language: "en" },
      })
        .then((response) => {
          this.resultgetModelPlayGroundEn = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getModelPlayGroundJp() {
      HTTP.get("playground/get-model-playground", {
        params: { language: "jp" },
      })
        .then((response) => {
          this.resultgetModelPlayGroundJp = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    getValueAndColorMax() {
      this.arrayClassification = Object.values(this.resultClassification);
      this.max = Math.max(...this.arrayClassification);
      this.max_index = Object.values(this.resultClassification).indexOf(
        this.max
      );
      this.max = (this.max * 100).toFixed(1);
    },
  },
  mounted() {
    this.getModelPlayGroundEn();
    this.getModelPlayGroundJp();
  },
};
</script>
<style>
@import "~/static/css/homepage.css";
@import "~static/css/styles.min.css";
@import "~/static/css/playground.css";
/* Test css mockup mới */
/*  */
@media (min-width: 1200px) {
  .container_playgorund {
    max-width: 1170px;
  }
}
.w-icon {
  margin-top: 2px;
}
.predict {
  height: 50px;
  background: #00af50;
  border: 1px solid #00af50;
  border-radius: 3px;
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nameModel {
  color: black;
  font-size: 18px;
  font-weight: 600;
}
@media (max-width: 1200px) {
  .col-xl {
    width: 100% !important;
  }
  .process-bar-circle {
    width: 100% !important;
  }
  .Classification-category {
    width: 65% !important;
  }
  .Percent-category {
    width: 100% !important;
  }
  .RunArticle-box-inline {
    margin-bottom: 50px;
  }
  .Classification {
    display: block !important;
  }
}
h4,
h6 {
  font-weight: 600 !important;
}
.percentValue {
  margin-left: 25px;
  color: #00997d;
  font-weight: 600;
}
.classification {
  font-weight: 600;
}
.reverse {
  transform: rotate(-180deg);
}
.Show-infor1 {
  width: 106px;
}
.max-index {
  opacity: 1 !important;
}
</style>