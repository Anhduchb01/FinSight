<template>
	<!-- <div class="card" > -->
        <b-card>
          <b-card-title class="mb-1">
            Tỉ lệ Sentiment
          </b-card-title>
          <!-- <b-card-sub-title class="mb-2">
            Spending on various categories
          </b-card-sub-title> -->
      
          <vue-apex-charts
            type="donut"
            height="350"
            :options="donutChart.chartOptions"
            :series="donutChart.series"
          />
        </b-card>
	<!-- </div> -->
</template>
      
<script>
import {
	BCard, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
// import apexChatData from './apexChartData'

export default {
	components: {
		VueApexCharts,
		BCard,
		BCardTitle,
		BCardSubTitle,
	},
	data() {
		return {
			donutChart: {
				series: [85, 16, 50],
				chartOptions: {
					legend: {
						show: true,
						position: 'bottom',
						fontSize: '14px',
						fontFamily: 'Montserrat',
					},
					colors: [
						'#38C477',
						'#F2543D',
						'#808080',
					],
					dataLabels: {
						enabled: true,
						formatter(val) {
							// eslint-disable-next-line radix
							return `${parseInt(val)}%`
						},
					},
					plotOptions: {
						pie: {
							donut: {
								labels: {
									show: true,
									name: {
										fontSize: '2rem',
										fontFamily: 'Montserrat',
									},
									value: {
										fontSize: '1rem',
										fontFamily: 'Montserrat',
										formatter(val) {
											// eslint-disable-next-line radix
											return `${parseInt(val)}%`
										},
									},
									total: {
										show: true,
										fontSize: '1.5rem',
										label: 'Operational',
										formatter() {
											return '31%'
										},
									},
								},
							},
						},
					},
					labels: ['Tích cực', 'Tiêu cực', 'Trung tinh'],
					responsive: [
						{
							breakpoint: 992,
							options: {
								chart: {
									height: 380,
								},
								legend: {
									position: 'bottom',
								},
							},
						},
						{
							breakpoint: 576,
							options: {
								chart: {
									height: 320,
								},
								plotOptions: {
									pie: {
										donut: {
											labels: {
												show: true,
												name: {
													fontSize: '1.5rem',
												},
												value: {
													fontSize: '1rem',
												},
												total: {
													fontSize: '1.5rem',
												},
											},
										},
									},
								},
								legend: {
									show: true,
								},
							},
						},
					],
				},
			},
		}
	},
}
</script>
<style>
/* .card-body{
  border-radius: 2px;
    box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
} */
.card{
	border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 2px 0px, rgba(0, 0, 0, 0.24) 0px 2px 2px 0px;
	height: 100%;
	padding: 1.5rem;
}
</style>