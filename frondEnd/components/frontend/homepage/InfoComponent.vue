<template>
  <div class="container md:mt-24 mt-16">
    <b-row class="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
      <b-col class="lg:col-span-5 md:col-span-6 order-1 md:order-2">
        <div class="lg:ms-8">
          <img src="~/static/SEO_SVG.svg" alt />
        </div>
      </b-col>

      <b-col class="lg:col-span-7 md:col-span-6 mt-8 md:mt-0 order2 md:order-1">
        <div class="lg:me-5">
          <h6 class="text-indigo-600 text-sm font-bold uppercase mb-2">Easy To Track</h6>
          <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            
            <br />Analytics Financial news
          </h3>

          <p class="text-slate-400 max-w-xl">You can see overall analysis and key word analysis.</p>

          <ul class="list-none text-slate-400 my-6">
            <li class="mb-1 flex">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <style>
                  svg {
                    fill: #4f46e5;
                  }
                </style>
                <path
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              </svg>
              Big Data
            </li>
            <li class="mb-1 flex">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <style> svg { fill: #4f46e5;}</style>
                <path
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              </svg>
              Sentiment Analysis
            </li>
            <li class="mb-1 flex">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style> svg { fill: #4f46e5;} </style>
                <path
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
              </svg>
              Keyword Extract
            </li>
          </ul>

          <a href
            class="btn bg-indigo-600/5 hover:bg-indigo-600 border-indigo-600/10 hover:border-indigo-600 text-indigo-600 hover:text-white rounded-full">Get
            Started</a>
        </div>
      </b-col>
    </b-row>
  </div></template>

<script>
import { BRow, BCol,BContainer } from 'bootstrap-vue'
export default {
	components: {
		BContainer,
		BRow,
		BCol,
  }
}
</script>
<style scoped>/* @import "~/static/css/tailwind.css"; */</style>
