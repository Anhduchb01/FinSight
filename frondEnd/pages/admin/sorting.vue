<template>
  <div class="sorting-component">
    <MainSorting />
    <div class="d-flex" style="justify-content: space-between;padding-bottom: 40px;"></div>
    <FeaturedNew />
  </div>
</template>
<script>
import MainSorting from "~/components/admin/sorting/MainSortingComponent.vue";
import FeaturedNew from "~/components/admin/sorting/FeaturedNewsComponent.vue";
export default {
  layout: "admin",
  components: {
    MainSorting,FeaturedNew
  },
};
</script>
<style >
.widget-table-two .table .td-content .badge {
  border: 1px solid #1abc9c !important;
}
.heading {
  position: relative;
}
.heading--center {
  text-align: center;
  width: 100%;
}
.heading__pre-title {
  display: inline-block;
  color: #a9aeb3;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 17px;
  z-index: 1;
  position: relative;
}
.heading__title {
  font-family: Inter, sans-serif;
  font-size: 40px;
  font-weight: 700;
  height: 47px;
  color: #414a53 !important;
  line-height: 40px;
  margin-bottom: 0;
  z-index: 1;
  position: relative;
}
.layout--lgray {
  -webkit-text-stroke-color: #d6d6d6;
}
.heading__layout {
  font-size: 120px;
  display: initial;
  color: transparent;
  line-height: 0.85;
  font-weight: 700;
  font-family: "Open Sans", sans-serif;
  letter-spacing: -0.02em;
  -webkit-text-stroke-width: 1px;
  position: absolute;
  z-index: 0;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.heading--center .heading__layout {
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: 5px;
  top: auto;
}
.color--green {
  color: #00997d;
}
.border-box {
  position: relative;
  max-width: 1240px;
  margin: auto;
  background: #fff;
  border-radius: 15px;
}
.box-featured-news {
  margin-left: 0px;
  margin-right: 0px;
  padding: 50px 20px 35px 20px;
}
</style>