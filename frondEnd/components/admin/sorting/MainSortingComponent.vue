<template>
  <div class="row">
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 layout-spacing" style="padding-left: 15px; padding-right: 0px;">
      <div class="widget widget-account-invoice-three">
        <div class="widget-heading">
          <div class="wallet-usr-info">
            <div class="usr-name">
              <span class="d-flex">
                <div style="padding: 4px; width: 32px; height: 32px;">
                  <img style="filter: brightness(0) invert(1);border:0px;width: 24px;height: 24px;" class="image-logo-header logo-sorting" src="~/static/assetsAdmin/backend/assets/img/sorting.png" />
                </div>
                <div style="align-self: center;margin-left: 5px;">Setup sorting</div>
              </span>
            </div>
            <div :class="{'configValueDefault': ValueDefault}" v-on:click="configValueDefault()" class="add">
              <span>
                <svg id="icon-set-value-default" style="transition: 1s;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-rotate-cw">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </span>
            </div>
          </div>
          <div class="wallet-balance">
            <div class="d-flex">
              <p>What is Hot Point</p>
              <div class="wallet-usr-info"></div>
              <div class="add">
                <span>
                  <span class="badge badge-dark badge-pill bs-tooltip ml-1" style="width:28px;height: 28px;" title="What is Hot Point ?">?</span>
                </span>
              </div>
            </div>
            <div class="d-flex">
              <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;margin-top: 3px" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye bs-tooltip" title="Total Pageviews">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <h5 id="pageviews" class>{{totalView}}</h5>
            </div>
          </div>
        </div>
        <div class="widget-amount">
          <div class="w-a-info funds-received">
            <span>
              Latest
              <svg v-on:click="pushValueSlider('Latest')" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008ffb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            <p style="color:#008ffb ;" id="percentLaster">{{percentLaster}}%</p>
          </div>
          <div class="w-a-info funds-spent">
            <span>
              Most Viewed
              <svg v-on:click="pushValueSlider('Viewed')" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#79db72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            <p style="color:#79db72 ;" id="percentViewed">{{percentView}}%</p>
          </div>
        </div>
        <div class="widget-content">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing" style="padding: 0px 0px 60px 0px;height:64px;margin-bottom: 60px">
            <div id="timeplayer-sorting">
              <VueSlider style="width:90%;padding-top:20px;height:12px" v-model="valuePercent" :data="percent" ref="slider" @change="changeSlider" />
              <span class="irs-grid" style="width: 96.3072%; left: 1.74638%;">
                <span class="irs-grid-pol" style="left: 0%"></span>
                <span class="irs-grid-text js-grid-text-0" style="left: 0%; margin-left: -1%;">0</span>
                <span class="irs-grid-pol small" style="left: 20%"></span>
                <span class="irs-grid-pol small" style="left: 15%"></span>
                <span class="irs-grid-pol small" style="left: 10%"></span>
                <span class="irs-grid-pol small" style="left: 5%"></span>
                <span class="irs-grid-pol" style="left: 25%"></span>
                <span class="irs-grid-text js-grid-text-1" style="left: 25%; visibility: visible; margin-left: -1.9%;">25</span>
                <span class="irs-grid-pol small" style="left: 45%"></span>
                <span class="irs-grid-pol small" style="left: 40%"></span>
                <span class="irs-grid-pol small" style="left: 35%"></span>
                <span class="irs-grid-pol small" style="left: 30%"></span>
                <span class="irs-grid-pol" style="left: 50%"></span>
                <span class="irs-grid-text js-grid-text-2" style="left: 50%; visibility: visible; margin-left: -1.9%;">50</span>
                <span class="irs-grid-pol small" style="left: 70%"></span>
                <span class="irs-grid-pol small" style="left: 65%"></span>
                <span class="irs-grid-pol small" style="left: 60%"></span>
                <span class="irs-grid-pol small" style="left: 55%"></span>
                <span class="irs-grid-pol" style="left: 75%"></span>
                <span class="irs-grid-text js-grid-text-3" style="left: 75%; visibility: visible; margin-left: -1.9%;">75</span>
                <span class="irs-grid-pol small" style="left: 95%"></span>
                <span class="irs-grid-pol small" style="left: 90%"></span>
                <span class="irs-grid-pol small" style="left: 85%"></span>
                <span class="irs-grid-pol small" style="left: 80%"></span>
                <span class="irs-grid-pol" style="left: 100%"></span>
                <span class="irs-grid-text js-grid-text-4" style="left: 100%; margin-left: -2.2%;">100</span>
              </span>
            </div>
          </div>
          <div class="bills-stats" style="margin-bottom: 29px;">
            <span>🔥 Hot</span>
            <span>👀 Interested</span>
          </div>
          <div class="invoice-list">
            <div class="inv-detail">
              <div class="d-flex" style="justify-content: space-between;margin-bottom: 9px;">
                <p class="mr-0 align-self-center">Hot point decrease per day</p>
                <p class="d-flex m-0">
                  <span style="margin-right:5px;" class="w-currency align-self-center">⌛</span>
                  <input type="number" id="point-decrease-per-day" value="0.1" onchange="queryArticle()" class="form-control input-config-sorting" />
                </p>
              </div>
              <div class="d-flex" style="justify-content: space-between;margin-bottom: 9px;">
                <p class="m-0 align-self-center">Hot point increase per view</p>
                <p class="d-flex m-0">
                  <span style="margin-right:5px;" class="w-currency align-self-center">👁️</span>
                  <input type="number" id="point-increase-per-view" value="1" onchange="queryArticle()" class="form-control input-config-sorting" />
                </p>
              </div>

              <div class="d-flex" style="justify-content: space-between;margin-bottom: 9px;">
                <p class="m-0 align-self-center">Hot point required for Tag</p>
                <p class="d-flex m-0">
                  <span style="margin-right:5px;" class="w-currency align-self-center">🔥</span>
                  <input onchange="queryArticle()" type="number" value="45" id="point-required-for-tag" class="form-control input-config-sorting" />
                </p>
              </div>
              <div class="d-flex" style="justify-content: space-between;margin-bottom: 9px;">
                <p class="m-0 align-self-center">View required for Tag</p>
                <p class="d-flex m-0">
                  <span style="margin-right:5px;" class="w-currency align-self-center">👀</span>
                  <input onchange="queryArticle()" type="number" value="5" id="view-required-for-tag" class="form-control input-config-sorting" />
                </p>
              </div>
            </div>
            <div class="inv-action">
              <a href="javascript:void(0);" v-on:click="applyConfigSorting()" class="btn btn-outline-primary view-details">
                <svg id="loadding-apply" style="display: none;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                </svg>Apply
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 layout-spacing" style="padding-left: 15px; padding-right: 15px;">
      <div class="widget widget-table-two" style="padding: 20px;padding-bottom: 0px;">
        <div class="widget-heading">
          <h5 class>Top 10 Latest</h5>
        </div>
        <div class="widget-content">
          <div class="table-responsive">
            <table class="table table-laster">
              <thead>
                <tr>
                  <th>
                    <div class="th-content">Title</div>
                  </th>
                  <th>
                    <div class="th-content">Page</div>
                  </th>

                  <th>
                    <div class="th-content th-heading">Category</div>
                  </th>
                  <th>
                    <div class="th-content" style="text-align: center;">📅 Date</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result,index) of dataLaster" :key="result.id">
                  <td>
                    <div class="td-content product-name">
                      <a :href="'/news/?id='+result._id">
                        <p class="prd-name" style="cursor: pointer;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;margin: 0px;width: 140px;" :title="result.title">{{result.title}}</p>
                      </a>
                    </div>
                  </td>
                  <td>
                    <div class="td-content">{{urlLatest[index]}}</div>
                  </td>

                  <td>
                    <div class="td-content">
                      <span :class="'discount-pricing '+ colorCategory[index]">{{result.category}}</span>
                    </div>
                  </td>
                  <td>
                    <div style="text-align: center;" class="td-content">
                      <span class="badge outline-badge-success">{{formatDateTime(result.timeCreatePostOrigin)}}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 layout-spacing" style="padding-left: 0px; padding-right: 15px;">
      <div class="widget widget-table-two" style="padding: 20px;padding-bottom: 0px;">
        <div class="widget-heading">
          <h5 class>Top 10 Most Viewed</h5>
        </div>
        <div class="widget-content">
          <div class="table-responsive">
            <table class="table table-viewed">
              <thead>
                <tr>
                  <th>
                    <div class="th-content">Title</div>
                  </th>
                  <th>
                    <div class="th-content">Page</div>
                  </th>
                  <th>
                    <div class="th-content">Date</div>
                  </th>
                  <th>
                    <div class="th-content th-heading">Category</div>
                  </th>
                  <th>
                    <div class="th-content" style="text-align: center;">👀 View</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result,index) of dataViewed" :key="result.id">
                  <td>
                    <div class="td-content product-name">
                      <a :href="'/news/?id='+result._id">
                        <p class="prd-name" style="cursor: pointer;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;margin: 0px;width: 140px;" title="${result.title}">{{result.title}}</p>
                      </a>
                    </div>
                  </td>
                  <td>
                    <div class="td-content">{{(urlView[index])}}</div>
                  </td>
                  <td>
                    <div class="td-content">{{result.timeCreatePostOrigin}}</div>
                  </td>
                  <td>
                    <div class="td-content">
                      <span :class="'discount-pricing ' + colorCategory1[index]">{{textCategoryView[index]}}</span>
                    </div>
                  </td>
                  <td>
                    <div style="text-align: center;" class="td-content">
                      <span class="badge outline-badge-success">{{result.view}}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "../../../static/baseAPI.js";
import Snackbar from "awesome-snackbar";
import dayjs from "dayjs";
export default {
  data() {
    return {
      ValueDefault: false,
      valuePercent: 0,
      percentView: 50,
      percentLaster: 50,
      percent: [],
      data: [],
      totalView: null,
      //Lasted
      dataLaster: [],
      urlLatest: [],
      textCategoryLatest: [],
      dateTimeLastest: [],
      colorCategory: [],

      //Viewd
      dataViewed: [],
      colorCategory1: [],
      urlView: [],
      textCategoryView: [],
      //
      value2: [0, 50, 50],
      process2: (dotsPos) => [
        [dotsPos[0], dotsPos[1], { backgroundColor: "#428bca" }],
        [dotsPos[1], dotsPos[2], { backgroundColor: "#79db72" }],
      ],
    };
  },
  methods: {
    pushValueSlider(value) {
      this.ValueDefault = false
      if (value == "Latest") {
        this.valuePercent -= 1;
        this.percentLaster += 1;
        this.percentView -= 1;
      } else if (value == "Viewed") {
        this.valuePercent += 1;
        this.percentLaster -= 1;
        this.percentView += 1;
      }
    },
    configValueDefault(){
      if(this.valuePercent != 50){
        this.ValueDefault = true
      }
      this.valuePercent = 50
      this.percentLaster = 50
      this.percentView = 50
    },
    applyConfigSorting() {     
      this.ValueDefault = false
      HTTP.get(`sorting/config-value-sorting`, {
        params: {
          percentLaster: this.percentLaster,
          percentViewed: this.percentView,
          pointDecreasePerDay: 0.1,
          pointIncreasePerView: 1,
          pointRequiredForTag: 45,
          viewRequiredForTag: 5,
        },
      }).then((response) => {
         new Snackbar(`Apply Success`, {
          position: "bottom-right",
          theme: "light",
          style: {
            container: [
              ["background-color", "#1abc9c"],
              ["border-radius", "5px"],
            ],
            message: [["color", "#fff"]],
          },
        });
      });
    },
    pushValue() {
      for (let i = 0; i <= 100; i++) {
        this.percent.push(i);
      }
      this.valuePercent = 50;
    },
    changeSlider() {
      this.ValueDefault = false
      if (this.valuePercent < 50) {
        this.percentLaster = 50 - this.valuePercent + 50;
        this.percentView = 50 - (50 - this.valuePercent);
      } else {      
        this.percentLaster = 50 - (this.valuePercent - 50);
        this.percentView = this.valuePercent - 50 + 50;
      }
    },
    formatDateTime(date) {
      let timeHasPassed = dayjs().diff(date, "days");
      return timeHasPassed + " day ago";
    },
  },
  mounted() {
    this.pushValue();
    function formatURL(data) {
      var url = document.createElement("a");
      url.href = data;
      let name = url.hostname.replace("www.", "");
      return name;
    }
    function formartTextCategory(string) {
      if (!string) return "Un-process";
      if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    }
    HTTP.get(
      `sorting/article-see-more?percentLaster=50&percentViewed=50&pointDecreasePerDay=0.1&pointIncreasePerView=1&pointRequiredForTag=45&viewRequiredForTag=5`
    ).then((response) => {
      this.data = response.data;
      this.dataLaster = this.data[1];
      this.dataViewed = this.data[2];

      //Top 10 Latest
      for (let i = 0; i < this.dataLaster.length; i++) {
        let result = this.dataLaster[i];
        this.urlLatest[i] = formatURL(result.url);
        this.textCategoryLatest[i] = formartTextCategory(result.category);

        if (result.category === "news") this.colorCategory[i] = "text-success";
        if (result.category === "event") this.colorCategory[i] = "text-primary";
        if (result.category === "publications")
          this.colorCategory[i] = "text-info";
        if (result.category === "other")
          this.colorCategory[i] = "text-secondary";
      }

      //Top 10 Most Viewed
      for (let i = 0; i < this.dataViewed.length; i++) {
        let result = this.dataViewed[i];
        this.urlView[i] = formatURL(result.url);
        this.textCategoryView[i] = formartTextCategory(result.category);

        if (result.category === "news") this.colorCategory1[i] = "text-success";
        if (result.category === "event")
          this.colorCategory1[i] = "text-primary";
        if (result.category === "publications")
          this.colorCategory1[i] = "text-info";
        if (result.category === "other")
          this.colorCategory1[i] = "text-secondary";
      }
    });
    HTTP.get(`sorting/get-data-sum-seen-page`).then((response) => {
      this.totalView = response.data;
    });
  },
};
</script>
<style>
@import "~/static/assetsAdmin/css/sorting.css";
@import "vue-slider-component/theme/antd.css";
/*!Ion.RangeSlider, 2.3.1, © Denis Ineshin, 2010 - 2019, IonDen.com, Build date: 2019-12-19 16:51:02*/
.configValueDefault{
  transition: all 1s ease 0s;
  transform: rotate(360deg);
}
.irs-grid {
  display: block !important;
}
.vue-slider.vue-slider-ltr {
  width: 100% !important;
}
.vue-slider-rail {
  border: #79db72;
  background: #79db72;
}
.vue-slider-ltr .vue-slider-mark-step {
  display: none;
}
.vue-slider-dot-handle {
  box-shadow: 1px 1px 2px rgb(0 0 0 / 4%), inset 0 0 1px 1px white !important;
  border: 1px solid rgba(0, 0, 0, 0.3) !important;
  border-radius: 30px !important;
  background-color: #cbcfd5;
}
.vue-slider-mark {
  background-color: #428bca;
  width: 1px !important;
  bottom: 50% !important;
  top: 189% !important;
  height: 73% !important;
}
.vue-slider-mark-label {
  color: #428bca;
  top: 2px !important;
  font-size: 10px !important;
}
.vue-slider-mark.vue-slider-mark-active {
  background-color: #428bca;
  width: 1px !important;
  bottom: 50% !important;
  top: 189% !important;
  height: 73% !important;
}
.vue-slider-mark-label.vue-slider-mark-label-active {
  color: #428bca;
  top: 3px !important;
  font-size: 10px !important;
}

.vue-slider-dot {
  width: 21px !important;
  height: 21px !important;
  z-index: 1 !important;
}
/* body{
  font-family: Inter,sans-serif!important;
} */
.vue-slider-process {
  background-color: rgb(0, 143, 251);
  border-radius: 15px;
  transition: background-color 0.3s;
}
.slider {
  width: 90%;
}

.pause-button {
  cursor: pointer;
  width: auto;
  height: auto;
  /* transform: scale(1.6); */
  border: 1px solid white;
  border-radius: 50%;
  background: #00e396;
  fill: white;
  padding: 10px;
}

.box-data-chart {
  padding: 20px;
}

.box-chart-analysis {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.title-chart {
  margin: 0px;
  padding: 20px 20px 0px 20px;
  font-size: 18px;
  font-weight: 500;
}

.chart-analysis {
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 2px 0px,
    rgba(0, 0, 0, 0.24) 0px 2px 2px 0px;
}

.box-timeplayer {
  width: 100%;
  margin-bottom: 30px;
  /* border-radius: 2px; */
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 2px 0px, rgba(0, 0, 0, 0.24) 0px 2px 2px 0px; */
}
.irs--big .irs-grid-text {
  color: #428bca !important;
}
span.irs-grid-pol.small {
  background: #428bca !important;
  font-weight: 500;
}
span.irs-grid-pol {
  background: #428bca !important;
}
span.irs-grid-text.js-grid-text-0,
span.irs-grid-text.js-grid-text-1,
span.irs-grid-text.js-grid-text-2,
span.irs-grid-text.js-grid-text-3,
span.irs-grid-text.js-grid-text-4 {
  font-size: 10px;
  color: #428bca !important;
  font-weight: 600;
}
.vue-slider:hover .vue-slider-rail {
  background: #79db72 !important;
}
.vue-slider-process:hover {
  background-color: rgb(0, 143, 251) !important;
}
</style>
