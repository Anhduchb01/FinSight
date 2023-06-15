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
      <!--/ title and subtitle -->

      <!-- datepicker -->
      <!-- <div class="d-flex align-items-center">
        <feather-icon
          icon="CalendarIcon"
          size="16"
        />
        <flat-pickr
          v-model="rangePicker"
          :config="{ mode: 'range'}"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
        />
      </div> -->
      <!-- datepicker -->
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
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BCard,
    // VueApexCharts,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    flatPickr,
  },
  data() {
    return {
      series: [
        {
          name: 'Tích cực',
          data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375],
        },
        {
          name: 'Tiêu cực',
          data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275],
        },
        {
          name: 'Trung tinh',
          data: [20, 40, 30, 70, 40, 60, 50, 140, 120, 100, 140, 180, 220],
        },
      ],
      chartOptions: {
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
          categories: [
            '7/12',
            '8/12',
            '9/12',
            '10/12',
            '11/12',
            '12/12',
            '13/12',
            '14/12',
            '15/12',
            '16/12',
            '17/12',
            '18/12',
            '19/12',
            '20/12',
          ],
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
      },
    
      rangePicker: ['2019-05-01', '2019-05-10'],
    }
  },
}
</script>
