<template>
  <div>
    Admin
  </div>
</template>
<script>


export default {
  // layout: 'admin',
  layout(context) {
    return 'admin'
  }, 
  
  data(){
    return{
      
    }
  },   
 };
</script>

<style>
/* sdasda */
/* body.dark .apexcharts-tooltip{
  opacity: 1!important;
} */
.apexcharts-tooltip.apexcharts-active{
  opacity: 1!important;
}
.widget-content .Chart-Total-Post path{
  stroke: white;
}
.dark .Chart-Total-Post path{
  stroke: #0e1726!important;
}
.dark .Chart-Total-Post{
  stroke: #ebedf2 !important;
}

.apexcharts-legend-series {
  margin: 8px 10px !important;
}
.apexcharts-legend.apexcharts-align-center.apx-legend-position-bottom{
    inset: auto 0px -10px!important;
}
</style>

