<template>
	<div>
		<Sidebar @closeSideBar="closeSideBarFrontEnd" :showSideBar="showSideBar" />
		<Header @showSideBar="showSideBarFrontEnd" />
		<div style="height: 130px" class="front-promo">
				<picture>
				<source srcset="~/static/img/fintech11.jpg" media="(min-width: 992px)" />
				<img class="img--bg" src="~/static/img/fintech11.jpg" alt="img" />
				</picture>
		</div>
		<section style="padding: 60px 0px" class="section catalog" id="section-box-news">
			<div class="container">
				<h4>{{ $t("body.keyword.keywordAnalytics") }}</h4>
			</div>
			<KeySearch ref="keySearch" id="keySearch" />
			<!-- <div class="container box-chart-analysis" style="margin-top: 60px"> -->
				<!-- <b-container class="container"> -->
					<div class="container" style="padding-top: 60px;">
						<b-row class="match-height ">
						<b-col md="6" class="analysis-chart" ><BarChart /></b-col>
						<b-col md="6" class="analysis-chart" >
							<DonutChart /></b-col>
					</b-row >
					</div>
					
				<!-- </b-container> -->
				
				
			<!-- </div> -->
			
			
			
			<LineChart />
		</section>
		<Footer />
	</div>
</template>

<script>
import { BRow, BCol,BContainer } from 'bootstrap-vue'
import Header from "../../components/frontend/HeaderComponent.vue";
import Footer from "../../components/frontend/FooterComponent.vue";
import Sidebar from "../../components/frontend/SidebarComponent.vue";
import KeySearch from "../../components/frontend/keyword-analytics/KeySearchComponent.vue";
import LineChart from "../../components/frontend/keyword-analytics/ApexLineAreaChart.vue";
import BarChart from "../../components/frontend/keyword-analytics/ApexBarChart.vue";
import DonutChart from "../../components/frontend/keyword-analytics/ApexDonutChart.vue";
export default {
	components: {
		BContainer,
		BRow,
		BCol,
   	 Header,
   	 Footer,
	Sidebar,
    	KeySearch,
	LineChart,
	DonutChart,
	BarChart
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
}
</script>
<style scoped >
@import "~/static/css/homepage.css";
@import "~static/css/styles.min.css";
@import "~static/css/search-by-keyword.css";
</style>