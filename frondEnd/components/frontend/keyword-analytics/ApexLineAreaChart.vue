<template>
  <div class="container" style="margin-top: 60px">
  <b-card no-body>
    <b-card-header>
      <!-- title and subtitle -->
      <div>
        <b-card-title class="mb-1">
          Line Chart
        </b-card-title>
        <!-- <b-card-sub-title>Commercial networks</b-card-sub-title> -->
      </div>
     
    </b-card-header>

    <b-card-body>
      <apexchart type="area" height="400" :options="chartOptions"  :series="series"/>
    </b-card-body>
  </b-card>
</div>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
export default {
  props: [
    "resultTimeline",
  ],
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    // flatPickr,
  },
  computed: {
    series() {
      return [
        {
          name: 'Tích cực',
          data: this.resultTimeline[1],
        },
        {
          name: 'Tiêu cực',
          data: this.resultTimeline[2],
        },
        {
          name: 'Trung tinh',
          data: this.resultTimeline[3],
        }
      ]

    },
    chartOptions() {
      return {
        chart: {
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: false,
          curve: 'straight',
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left',
          fontSize: '14px',
          fontFamily: 'Montserrat',
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: this.resultTimeline[0]
        },
        yaxis: {
          // opposite: isRtl
        },
        fill: {
          opacity: 1,
          type: 'solid',
        },
        tooltip: {
          shared: false,
        },
        colors: ['#38C477', '#F2543D', '#808080'],
      }
    }

  },
  data() {
    return {



      rangePicker: ['2019-05-01', '2019-05-10'],
    }
  },
}
</script>
