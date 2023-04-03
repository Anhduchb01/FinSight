import Vue from 'vue';
// your imported custom plugin or in this scenario the 'vue-session' plugin
// import ApexCharts from 'apexcharts';
import VueApexCharts from 'vue-apexcharts';
import RangeSlider from 'vue-range-slider';



import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import vSelect from "vue-select";
import VueSlider from 'vue-slider-component'
import VueEasyLightbox from 'vue-easy-lightbox'
import VModal from 'vue-js-modal/dist/ssr.nocss'

import 'vue-js-modal/dist/styles.css'
import Snackbar from 'awesome-snackbar'




// Method 1. via Vue.use
Vue.use(VueEasyLightbox)
Vue.use(VModal)
// Method 2. Register via Vue.component

Vue.use(VueApexCharts)
Vue.use(RangeSlider)

Vue.component('vue-easy-lightbox', VueEasyLightbox)
Vue.component('apexchart', VueApexCharts)
Vue.component('range-slider', RangeSlider)
Vue.component('VueSlider', VueSlider)
// Vue.component("vue-select",require("vue-select"))
Vue.component("v-select", vSelect);
Vue.prototype.$am4core = () => {
        return {
                am4core,
                am4charts,
                am4themes_animated,
                am4themes_dark,
                am4plugins_wordCloud
        }
}