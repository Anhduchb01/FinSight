<template>
  <div class="widget-content searchable-container gird">
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-5 col-sm-7 text-sm-right text-center layout-spacing align-self-center">
        <div class="d-flex justify-content-sm-start justify-content-center">
          <div class="widget-heading">
            <h5 class>Websites</h5>
          </div>
        </div>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-7 col-sm-5 text-sm-right text-center layout-spacing align-self-center">
        <div class="d-flex justify-content-sm-end justify-content-center">
          <div style="width: auto;height: auto;" class="switch align-self-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-list view-list active-view">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3" y2="6"></line>
                                <line x1="3" y1="12" x2="3" y2="12"></line>
                                <line x1="3" y1="18" x2="3" y2="18"></line>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid view-grid active-view">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="rss searchable-items gird" style="display: flex;flex-wrap: wrap;">
      <!-- cafef -->
      <div class="items" v-if="posts.length">
        <div class="item-content rss-page">
          <div style="display: none;">
            <label class="switch s-icons s-outline s-outline-info">
              <input class="input-address" id="cafef" type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="user-email address-page">
            <div class="user-meta-info">
              <p class="user-name">CafeF</p>
              <p class="user-work">https://cafef.vn</p>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Date:</p>
            <p class="date-time-crawler-rss">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span id="time-update-cafef" class="bs-tooltip" data-placement="right" style="color: #888ea8;font-weight: 600;">{{LastDateCrawler[0]}}</span>
            </p>
          </div>
          <div class="user-email">
            <p class="info-title">Post:</p>
            <div class="box-status-post" style="margin:0;width: auto;">
              <div class="item-timeline timeline-success">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-cafef">{{sumPost[0]}} Post (+{{increasedPost[0]}})</p>
                </div>
              </div>
              <div class="item-timeline timeline-warning">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-block-cafef">{{sumPostBlock[0]}} Post (+0)</p>
                </div>
              </div>
              <div class="item-timeline timeline-danger">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-skip-cafef">{{sumPostSkip[0]}} Post (+0)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Status:</p>
            <p class="usr-ph-no">
              <span :class="classData[0]" id="status-cafef">{{status[0]}}</span>
            </p>
          </div>
          <div class="action-btn d-flex justify-content-center">
            <button id="btn-crawl-cafef" v-on:click="searchInformation('cafef')" class="btn btn-info mt-2 mr-2">
              <svg style="display: none;" id="icon-loading-btn-cafef" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg> Crawl
            </button>
            <button v-on:click="showModalEdit('cafef','CafeF','http://cafef.vn')" class="btn btn-warning mt-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg> Edit
            </button>
          </div>
        </div>
      </div>
      <!-- //cafebiz -->
      <div class="items" v-if="posts.length">
        <div class="item-content rss-page">
          <div style="display: none;" class="box-switch">
            <label class="switch s-icons s-outline s-outline-info">
              <input class="input-address" id="cafebiz" type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="user-email address-page">
            <div class="user-meta-info">
              <p class="user-name" data-name="Alan Green">CafeBiz</p>
              <p class="user-work" data-occupation="Web Developer">http://cafebiz.vn</p>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Date:</p>
            <p class="date-time-crawler-rss">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span class="bs-tooltip" data-placement="right" id="time-update-cafebiz" style="color: #888ea8;font-weight: 600;">{{LastDateCrawler[1]}}</span>
            </p>
          </div>
          <div class="user-email">
            <p class="info-title">Post:</p>
            <div class="box-status-post" style="margin:0;width: auto;">
              <div class="item-timeline timeline-success">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-cafebiz">{{sumPost[1]}} Post (+{{increasedPost[1]}})</p>
                </div>
              </div>
              <div class="item-timeline timeline-warning">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-block-cafebiz">{{sumPostBlock[1]}} Post (+0)</p>
                </div>
              </div>
              <div class="item-timeline timeline-danger">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-skip-cafebiz">{{sumPostSkip[1]}} Post (+0)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Status:</p>
            <p class="usr-ph-no">
              <span :class="classData[1]" id="status-cafebiz">{{status[1]}}</span>
            </p>
          </div>
          <div class="action-btn d-flex justify-content-center">
            <button id="btn-crawl-cafebiz" v-on:click="searchInformation('cafebiz')" class="btn btn-info mt-2 mr-2">
              <svg style="display: none;" id="icon-loading-btn-cafebiz" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg> Crawl
            </button>
            <button v-on:click="showModalEdit('cafebiz','CafeBiz','http://cafebiz.vn')" class="btn btn-warning mt-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg> Edit
            </button>
          </div>
        </div>
      </div>
      <!-- //baodautu -->
      <div class="items" v-if="posts.length">
        <div class="item-content rss-page">
          <div style="display: none;" class="box-switch">
            <label class="switch s-icons s-outline s-outline-info">
              <input class="input-address" id="baodautu" type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="user-email address-page">
            <div class="user-meta-info">
              <p class="user-name" data-name="Alan Green">BaoDauTu</p>
              <p class="user-work" data-occupation="Web Developer">http://baodautu.vn</p>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Date:</p>
            <p class="date-time-crawler-rss">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span class="bs-tooltip" data-placement="right" id="time-update-baodautu" style="color: #888ea8;font-weight: 600;">{{LastDateCrawler[2]}}</span>
            </p>
          </div>
          <div class="user-email">
            <p class="info-title">Post:</p>
            <div class="box-status-post" style="margin:0;width: auto;">
              <div class="item-timeline timeline-success">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-baodautu">{{sumPost[2]}} Post (+{{increasedPost[2]}})</p>
                </div>
              </div>
              <div class="item-timeline timeline-warning">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-block-baodautu">{{sumPostBlock[2]}} Post (+0)</p>
                </div>
              </div>
              <div class="item-timeline timeline-danger">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-skip-baodautu">{{sumPostSkip[2]}} Post (+0)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Status:</p>
            <p class="usr-ph-no">
              <span :class="classData[2]" id="status-baodautu">{{status[2]}}</span>
            </p>
          </div>
          <div class="action-btn d-flex justify-content-center">
            <button id="btn-crawl-baodautu" v-on:click="searchInformation('baodautu')" class="btn btn-info mt-2 mr-2">
              <svg style="display: none;" id="icon-loading-btn-baodautu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg> Crawl
            </button>
            <button v-on:click="showModalEdit('baodautu','BaoDauTu','http://baodautu.vn')" class="btn btn-warning mt-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg> Edit
            </button>
          </div>
        </div>
      </div>
      <!-- //vneconomy -->
      <div class="items" v-if="posts.length">
        <div class="item-content rss-page">
          <div style="display: none;" class="box-switch">
            <label class="switch s-icons s-outline s-outline-info">
              <input class="input-address" id="vneconomy" type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="user-email address-page">
            <div class="user-meta-info">
              <p class="user-name" data-name="Alan Green">VnEconomy</p>
              <p class="user-work" data-occupation="Web Developer">http://vneconomy.vn</p>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Date:</p>
            <p class="date-time-crawler-rss">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span class="bs-tooltip" data-placement="right" id="time-update-vneconomy" style="color: #888ea8;font-weight: 600;">{{LastDateCrawler[3]}}</span>
            </p>
          </div>
          <div class="user-email">
            <p class="info-title">Post:</p>
            <div class="box-status-post" style="margin:0;width: auto;">
              <div class="item-timeline timeline-success">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-vneconomy">{{sumPost[3]}} Post (+{{increasedPost[3]}})</p>
                </div>
              </div>
              <div class="item-timeline timeline-warning">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-block-vneconomy">{{sumPostBlock[3]}} Post (+0)</p>
                </div>
              </div>
              <div class="item-timeline timeline-danger">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-skip-vneconomy">{{sumPostSkip[3]}} Post (+0)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Status:</p>
            <p class="usr-ph-no">
              <span :class="classData[3]" id="status-vneconomy">{{status[3]}}</span>
            </p>
          </div>
          <div class="action-btn d-flex justify-content-center">
            <button id="btn-crawl-vneconomy" v-on:click="searchInformation('vneconomy')" class="btn btn-info mt-2 mr-2">
              <svg style="display: none;" id="icon-loading-btn-vneconomy" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg> Crawl
            </button>
            <button v-on:click="showModalEdit('vneconomy','VnEconomy','http://vneconomy.vn')" class="btn btn-warning mt-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg> Edit
            </button>
          </div>
        </div>
      </div>
      <!-- //cafefpdf -->
      <div class="items" v-if="posts.length">
        <div class="item-content rss-page">
          <div style="display: none;" class="box-switch">
            <label class="switch s-icons s-outline s-outline-info">
              <input class="input-address" id="vneconomy" type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
          <div class="user-email address-page">
            <div class="user-meta-info">
              <p class="user-name" data-name="Alan Green">CafeF_PDF</p>
              <p class="user-work" data-occupation="Web Developer">http://s.cafef.vn/phan-tich-bao-cao.chn</p>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Date:</p>
            <p class="date-time-crawler-rss">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span class="bs-tooltip" data-placement="right" id="time-update-cafefpdf" style="color: #888ea8;font-weight: 600;">{{LastDateCrawler[4]}}</span>
            </p>
          </div>
          <div class="user-email">
            <p class="info-title">Report:</p>
            <div class="box-status-post" style="margin:0;width: auto;">
              <div class="item-timeline timeline-success">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-cafefpdf">{{sumPost[4]}} Report (+{{increasedPost[4]}})</p>
                </div>
              </div>
              <div class="item-timeline timeline-warning">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-block-cafefpdf">{{sumPostBlock[4]}} Report (+0)</p>
                </div>
              </div>
              <div class="item-timeline timeline-danger">
                <div class="t-dot" data-original-title title></div>
                <div class="t-text">
                  <p class="usr-location" id="count-post-skip-cafefpdf">{{sumPostSkip[4]}} Report (+0)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="user-email">
            <p class="info-title">Status:</p>
            <p class="usr-ph-no">
              <span :class="classData[4]" id="status-cafefpdf">{{status[4]}}</span>
            </p>
          </div>
          <div class="action-btn d-flex justify-content-center">
            <button id="btn-crawl-cafefpdf" v-on:click="searchInformation('cafefpdf')" class="btn btn-info mt-2 mr-2">
              <svg style="display: none;" id="icon-loading-btn-cafefpdf" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg> Crawl
            </button>
            <button v-on:click="showModalEdit('cafefpdf','cafefpdf','http://s.cafef.vn/phan-tich-bao-cao.chn')" class="btn btn-warning mt-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal Website  -->
    
    <modal name="modal-edit-page-website" class="test" height="271px" width="500px" styles="overflow: initial">
      <div style="max-width: 700px !important;" class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <svg v-on:click="closeModalEdit()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x close" data-dismiss="modal">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <div class="compose-box">
              <div class="compose-content">
                <div class="row mb-4">
                  <div class="col-md-12">
                    <h5 style="font-weight: bold;color: #4361ee !important;" class="modal-title text-center">
                      Edit Page
                      Crawl
                    </h5>
                  </div>
                </div>
                <ul class="nav nav-tabs mb-3 mt-3" id="simpletab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Simple</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Advanced</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="query-tab" data-toggle="tab" href="#query" role="tab" aria-controls="query" aria-selected="false">Query</a>
                  </li>
                </ul>
                <div class="tab-content" id="simpletabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <form>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="d-flex mb-4 mail-to">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type">
                              <polyline points="4 7 4 4 20 4 20 7" />
                              <line x1="9" y1="20" x2="15" y2="20" />
                              <line x1="12" y1="4" x2="12" y2="20" />
                            </svg>
                            <div style="display: none;" class="w-100">
                              <input disabled type="text" id="address-page-crawl" class="form-control" />
                              <span class="validation-text"></span>
                            </div>
                            <div class="w-100">
                              <input disabled type="text" id="edit-name-page" :placeholder="nameModel" class="form-control" />
                              <span class="validation-text"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mb-4 mail-subject">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <div class="w-100">
                          <input disabled type="text" id="edit-url-page" :placeholder="'https://' + urlModel" class="form-control" />
                          <span class="validation-text"></span>
                        </div>
                      </div>
                      <div style="text-align: left;" class="d-flex mail-subject">
                        <div class="box-switch">
                          <label class="switch s-icons s-outline s-outline-primary">
                            <input v-on:click="modeSchedule =! modeSchedule" :checked="modeSchedule" class="input-edit-address" id="edit-check-time" type="checkbox" />
                            <span class="slider round">
                              <p class="pl-3" style="margin-left: 40px;white-space: nowrap;font-weight: 600;">Schedule Crawl</p>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div class="d-flex mail-subject">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <div class="col-xl-4 col-lg-5 col-md-5 col-sm-7 filtered-list-search align-self-center pl-0">
                          <button :disabled="!modeSchedule" data-toggle="modal" id="btn-create-schedule" data-target="#scheduleModal" type="button" class="btn btn-primary">Schedule Crawl</button>
                        </div>
                      </div>
                      <small style="text-align: left;margin-left: 36px;" id="emailHelp1" class="form-text text-muted mb-4">
                        Select time
                        for schedule
                      </small>
                      <div>
                        <div style="text-align: left;" class="box-switch">
                          <label class="switch s-icons s-outline s-outline-primary">
                            <input class="input-edit-address" id="edit-check-display" type="checkbox" />
                            <span class="slider round">
                              <p class="pl-3" style="margin-left: 40px;white-space: nowrap;font-weight: 600;">Public Post</p>
                            </span>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <form>
                      <div class="d-flex">
                        <div style="width: 50%;">
                          <div style="text-align: left;" class="box-switch">
                            <label class="switch s-icons s-outline s-outline-primary">
                              <input :checked="validatedCokkies" v-on:click="validatedCokkies =! validatedCokkies" class="input-edit-address" id="edit-cookies-page" type="checkbox" />
                              <span class="slider round">
                                <p class="pl-3" style="margin-left: 40px;white-space: nowrap;font-weight: 600;">Allow Cookies</p>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div style="width: 50%;">
                          <div style="text-align: left;" class="box-switch">
                            <label class="switch s-icons s-outline s-outline-primary">
                              <input :checked="modeRobotsParser" class="input-edit-address" id="edit-robot-txt-page" type="checkbox" />
                              <span class="slider round">
                                <p class="pl-3" style="margin-left: 40px;white-space: nowrap;font-weight: 600;">Follow robots.txt file</p>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mail-subject mb-3">
                        <svg style="margin-bottom: 20px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <div class="d-flex">
                          <div>
                            <div>
                              <input v-model="timeOutCrawl" type="number" placeholder id="timeout-page" class="form-control" />
                              <span class="validation-text"></span>
                            </div>
                            <small class="form-text text-muted">Setting timeout</small>
                          </div>
                          <div style="padding: 0px 10px;">
                            <div>
                              <input v-model="timeRetryCrawl" type="number" placeholder id="time-retry-page" class="form-control" />
                              <span class="validation-text"></span>
                            </div>
                            <small class="form-text text-muted">Setting time retry</small>
                          </div>
                          <div>
                            <div>
                              <input v-model="timeDelayCrawl" type="number" id="time-delay-page" placeholder class="form-control" />
                              <span class="validation-text"></span>
                            </div>
                            <small class="form-text text-muted">Setting time delay</small>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex mail-subject mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <div style="width: 100%;">
                          <input v-model="userAgent" type="text" id="edit-user-agent-page" placeholder="User-Agent" class="form-control" />
                          <span class="validation-text"></span>
                        </div>
                      </div>
                      <div class="d-flex mail-subject mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-aperture">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                          <line x1="9.69" y1="8" x2="21.17" y2="8" />
                          <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                          <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                          <line x1="14.31" y1="16" x2="2.83" y2="16" />
                          <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
                        </svg>
                        <div style="width: 100%;">
                          <input v-model="cookies" :disabled="!validatedCokkies" type="text" id="edit-input-cookie-page" placeholder="Cookies" class="form-control" />
                          <span class="validation-text"></span>
                        </div>
                      </div>
                      <div class="table-responsive table-list-key">
                        <table class="table table-bordered mb-4">
                          <thead>
                            <tr>
                              <th style="width: 40%;">Header</th>
                              <th style="width: 40%;">Value</th>
                              <th style="text-align: center;width: 20%;">
                                <button type="button" v-on:click="addRowTableHttpHeader()" style="height:25px;padding: 0px 10px;margin: 0px;" class="btn btn-outline-success">Add</button>
                              </th>
                            </tr>
                          </thead>
                          <tbody class="tbody-http-header">
                            <tr v-for="(results,index) of httpHeader" :key="results.id">
                              <td>
                                <input v-model="results.header" type="text" class="form-control row-key" />
                              </td>
                              <td>
                                <input v-model="results.value" type="text" class="form-control row-value" />
                              </td>
                              <td class="box-remove-row" style="text-align: center;">
                                <svg v-on:click="removeRowTableHttpHeader(index)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 delete-multiple remove-row-table-header">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="query" role="tabpanel" aria-labelledby="query-tab">
                    <div class="d-flex" style="justify-content: space-between;">
                      <div >
                        <button type="button" onclick="useQueryDefault()" class="btn btn-info">Default</button>
                      </div>
                    </div>
                    
                    <div class="tab-content" id="v-pills-tabContent" v-if="this.type=='post'">
                      <div class="tab-pane fade show active" id="query-en" role="tabpanel" aria-labelledby="query-en-tab">
                        <form>
                          <label for="basic-url">Paging navigate & crawl data</label>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Article URL</span>
                                </div>
                                <input v-model="article_url_query" type="text" class="form-control" id="article-url-en" aria-describedby="basic-addon3" />
                              </div>
                            </div>
                          </div>
                          <label for="basic-url">Get data</label>
                          <div class="row" >
                            <div class="col-md-12">
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Number Page</span>
                                </div>
                                <input v-model="number_page_query" type="text" class="form-control" id="article-title-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Title</span>
                                </div>
                                <input v-model="title_query" type="text" class="form-control" id="article-title-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Post Date</span>
                                </div>
                                <input v-model="timeCreatePostOrigin_query" type="text" class="form-control" id="article-title-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Category</span>
                                </div>
                                <input v-model="category_query" type="text" class="form-control" id="article-title-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Author</span>
                                </div>
                                <input v-model="author_query" type="text" class="form-control" id="des-article-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Sum Description</span>
                                </div>
                                <input v-model="content_title_query" type="text" class="form-control" id="image-article-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Detail Description</span>
                                </div>
                                <input v-model="content_des_query" type="text" class="form-control" id="date-article-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Image</span>
                                </div>
                                <input v-model="image_url_query" type="text" class="form-control" id="content-article-en" aria-describedby="basic-addon3" />
                              </div>
                            </div>
                          </div>
                          
                          
                        </form>
                      </div>
                    
                    </div>
                    <div class="tab-content" id="v-pills-tabContent" v-else>
                      <div class="tab-pane fade show active" id="query-en" role="tabpanel" aria-labelledby="query-en-tab">
                        <form>
                          <label for="basic-url">Paging navigate & crawl data</label>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Article URL</span>
                                </div>
                                <input v-model="article_url_query" type="text" class="form-control" id="article-url-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Article URL-1</span>
                                </div>
                                <input v-model="article_url_query1" type="text" class="form-control" id="article-url-en" aria-describedby="basic-addon3" />
                              </div>s
                            </div>
                          </div>
                          <label for="basic-url">Get data</label>
                          <div class="row" >
                            <div class="col-md-12">
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Number Page</span>
                                </div>
                                <input v-model="number_page_query" type="text" class="form-control" id="article-title-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Title</span>
                                </div>
                                <input v-model="title_query" type="text" class="form-control" id="article-title-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Post Date</span>
                                </div>
                                <input v-model="timeCreatePostOrigin_query" type="text" class="form-control" id="article-title-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Source</span>
                                </div>
                                <input v-model="source" type="text" class="form-control" id="article-title-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">Stock Code</span>
                                </div>
                                <input v-model="number_CK" type="text" class="form-control" id="des-article-en" aria-describedby="basic-addon3" />
                              </div>
                              <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                  <span class="input-group-text" id="basic-addon7">ID PDF</span>
                                </div>
                                <input v-model="id_pdf" type="text" class="form-control" id="image-article-en" aria-describedby="basic-addon3" />
                              </div>
                              
                            </div>
                          </div>
                          
                          
                        </form>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button  v-on:click="saveEditCrawl()" id="btn-save-edit" class="btn btn-success float-left">
              <svg style="display:none" id="edit-icon-loadding" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin mr-2">
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
              </svg>
              <svg id="edit-icon-crawl" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg> Save
            </button>
            <button class="btn" data-dismiss="modal">
              <i class="flaticon-delete-1"></i> Discard
            </button>
          </div>
        </div>
      </div>
    </modal>
    <ScheduleCrawl />
  </div>
</template>
<script>
import Snackbar from "awesome-snackbar";
import { HTTP } from "../../../static/baseAPIAdmin.js";
import ScheduleCrawl from "~/components/admin/crawler/ScheduleCrawlComponent.vue";
import moment from "moment";
export default {
  components: {
    ScheduleCrawl,
  },
  data() {
    return {
      //Iconloading
      loadingcafef: true,
      loadingcafebiz: true,
      loadingbaodautu: true,
      loadingvneconomy: true,
      loadingAddressnasa: true,
      //validate
      validated: true,
      validatedCokkies: true,
      modePublic: false,
      //
      nameEle: [],
      posts: [],
      status: [],
      classData: [],
      sumPost: [],
      increasedPost: [],
      sumPostBlock: [],
      sumPostSkip: [],
      LastDateCrawler: [],
      arrDataConfig: [],
      arrDataConfigPDF : [],

      //Edit model
      urlModel: null,
      nameModel: null,
      namePage: null,
      titlePage: null,
      urlPage: null,
      modeSchedule: null,

      timeOutCrawl: null,
      timeRetryCrawl: null,
      timeDelayCrawl: null,
      userAgent: null,
      cookies: null,
      modeRobotsParser: null,


      number_page_query: null,
      article_url_query: null,
      article_url_query1: null,
      title_query: null,
      timeCreatePostOrigin_query: null,
      category_query: null,
      author_query: null,
      content_title_query: null,
      content_des_query: null,
      image_url_query:null,
      type : null,
      source :null,
      number_CK :null,
      id_pdf:null,

      
     
      httpHeader: [],
      test: 1,
    };
  },
  methods: {
    getTimeAgo(value) {
      if (value === "----/--/--" || value === "") {
        return "----/--/--";
      }
      else{
        let timeAgo = moment(value, 'YYYY/MM/DD/').fromNow();
        timeAgo = timeAgo.replace(/\b\w/g, function (l) {
          return l.toUpperCase();
        });
        return timeAgo;

      }
      
    },
    showModalEdit(address, nameModel, urlModel) {
      // this.validated = true;
      this.urlModel = urlModel;
      this.nameModel = nameModel;
      console.log(address)

      if (address =='cafefpdf'){
        this.type = "pdf"
        console.log('ok')
        console.log(this.arrDataConfigPDF)
        for (let index = 0; index < this.arrDataConfigPDF.length; index++) {

          if (this.arrDataConfigPDF[index].namePage === address) {

            let results = this.arrDataConfigPDF[index];
            this.namePage = results.namePage;
            this.showModalSchedule();
            this.titlePage = results.titlePage;
            this.urlPage = results.urlPage;
            this.modePublic = results.modePublic;
            this.modeRobotsParser = results.modeRobotsParser;
            this.timeOutCrawl = results.timeOutCrawl;
            this.timeRetryCrawl = results.timeRetryCrawl;
            this.timeDelayCrawl = results.timeDelayCrawl;
            this.userAgent = results.userAgent;
            this.cookies = results.cookies;

            this.httpHeader = results.httpHeader;

            this.number_page_query = results.number_page_query
            this.article_url_query = results.article_url_query;
            this.article_url_query1 = results.article_url_query1;
            this.title_query = results.title_query;
            this.timeCreatePostOrigin_query = results.timeCreatePostOrigin_query;
            this.source = results.source
            this.number_CK =results.number_CK
            this.id_pdf =results.id_pdf

        }
      }
      }
      else{
        this.type = "post"
        for (let index = 0; index < this.arrDataConfig.length; index++) {
          if (this.arrDataConfig[index].namePage === address) {
            let results = this.arrDataConfig[index];
            this.namePage = results.namePage;
            this.showModalSchedule();
            this.titlePage = results.titlePage;
            this.urlPage = results.urlPage;
            this.modePublic = results.modePublic;
            this.modeRobotsParser = results.modeRobotsParser;
            this.timeOutCrawl = results.timeOutCrawl;
            this.timeRetryCrawl = results.timeRetryCrawl;
            this.timeDelayCrawl = results.timeDelayCrawl;
            this.userAgent = results.userAgent;
            this.cookies = results.cookies;

            this.httpHeader = results.httpHeader;

            this.number_page_query = results.number_page_query
            this.article_url_query = results.article_url_query;
            this.title_query = results.title_query;
            this.timeCreatePostOrigin_query = results.timeCreatePostOrigin_query;
            this.category_query = results.category_query;
            this.author_query = results.author_query;
            this.content_title_query = results.content_title_query;
            this.content_des_query = results.content_des_query;
            this.image_url_query = results.image_url_query;
        }
      }
      }
      this.$modal.show("modal-edit-page-website");
      console.log(this.type)
      
    },
    addRowTableHttpHeader() {
      let newHttpHeader = {
        header: "",
        value: "",
      };
      this.httpHeader.push(newHttpHeader);
    },
    removeRowTableHttpHeader(index) {
      this.httpHeader.splice(index, 1);
    },
    showModalSchedule() {
      let arrayInput = document.querySelectorAll(".select-customers-info");
      for (let e = 0; e < arrayInput.length; e++) {
        arrayInput[e].checked = false;
      }
      for (let i = 0; i < this.arrDataConfig.length; i++) {
        if (this.arrDataConfig[i].namePage === this.namePage) {
          let addressPage = this.arrDataConfig[i];
          for (let j = 0; j < addressPage.timeSchedule.length; j++) {
            let day = "";
            let flagDay = addressPage.timeSchedule[j];
            if (flagDay.day === "0") day = "sunday";
            if (flagDay.day === "1") day = "monday";
            if (flagDay.day === "2") day = "tuesday";
            if (flagDay.day === "3") day = "wednesday";
            if (flagDay.day === "4") day = "thursday";
            if (flagDay.day === "5") day = "friday";
            if (flagDay.day === "6") day = "saturday";
            if (flagDay.hour.length) {
              for (let k = 0; k < flagDay.hour.length; k++) {
                if (
                  document.querySelector(".select-customers-info." + day) !==
                  null
                ) {
                  let arr = document.querySelectorAll(
                    ".select-customers-info." + day
                  );
                  for (let index = 0; index < arr.length; index++) {
                    if (arr[index].value * 1 === flagDay.hour[k] * 1) {
                      arr[index].checked = true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    searchInformation(address) {
      $("#icon-loading-btn-" + address).show();
      $("#btn-crawl-" + address).prop("disabled", true);
      $("#status-" + address).removeClass();
      $("#status-" + address).addClass("badge badge-warning");
      $("#status-" + address).html("Pending");
      if (address === "cafef") this.crawPageCafef( address);
      if (address === "cafebiz") this.crawpageCafebiz(address);
      if (address === "baodautu") this.crawPageBaodautu(address);
      if (address === "vneconomy") this.crawPageVneconomy(address);
      if (address === "cafefpdf") this.crawPageCafefpdf(address);
    },
    crawPageCafef(address) {
      HTTP.post(`crawpage-cafef`).then(() => {
        this.getAllData();
        $("#btn-crawl-" + address).prop("disabled", false);
      });
    },
    crawPageCafefpdf(address) {
      HTTP.post(`/crawpage-cafefpdf`).then(() => {
        this.getAllData();
        $("#btn-crawl-" + address).prop("disabled", false);
      });
    },
    crawpageCafebiz(address) {
      HTTP.post(`crawpage-cafebiz`).then(() => {
        this.getAllData();
        $("#btn-crawl-" + address).prop("disabled", false);
      });
    },
    crawPageBaodautu(address) {
      HTTP.post(`crawpage-baodautu`).then(() => {
        this.getAllData();
        $("#btn-crawl-" + address).prop("disabled", false);
      });
    },
    crawPageVneconomy(address) {
      HTTP.post(`crawpage-vneconomy`).then(() => {
        this.getAllData();
        $("#btn-crawl-" + address).prop("disabled", false);
      });
    },
    getAllData() {
      this.getCrawler();
      // this.getDataAllKeywordCrawl();
    },
    saveEditCrawl(){
      console.log(this.number_page_query)
      if (this.type =='post'){
        this.saveEditCrawlPage()
      }else{
        this.saveEditCrawlPagePDF()
      }
    },
    saveEditCrawlPage() {
      // let ArticleEN = this.removeElementArticleEN.split(",");
      // var newArrEleEN = ArticleEN.filter(Boolean);
      // let ArticleJP = this.removeElementArticleJP.split(",");
      // var newArrEleJP = ArticleJP.filter(Boolean);

      let objDataEdit = {};
      objDataEdit.titlePage = this.nameModel;
      objDataEdit.modeSchedule = this.modeSchedule;
      objDataEdit.timeSchedule = this.tableScheduleHasTick();
      objDataEdit.modePublic = this.modePublic;
      objDataEdit.modeCookies = this.validatedCokkies;
      objDataEdit.modeRobotsParser = this.modeRobotsParser;
      objDataEdit.timeOutCrawl = this.timeOutCrawl;
      objDataEdit.timeRetryCrawl = this.timeRetryCrawl;
      objDataEdit.timeDelayCrawl = this.timeDelayCrawl;
      objDataEdit.userAgent = this.userAgent;
      objDataEdit.cookies = this.cookies;
      objDataEdit.httpHeader = this.httpHeader;
      objDataEdit.number_page_query = this.number_page_query;
      objDataEdit.article_url_query = this.article_url_query;
      objDataEdit.title_query = this.title_query;
      objDataEdit.timeCreatePostOrigin_query = this.timeCreatePostOrigin_query;
      objDataEdit.category_query = this.category_query;
      objDataEdit.author_query = this.author_query;
      objDataEdit.content_title_query = this.content_title_query;
      objDataEdit.content_des_query = this.content_des_query;
      objDataEdit.image_url_query = this.image_url_query;
      HTTP.post(`save-edit-crawl`, {objDataEdit}).then((response) => {
        new Snackbar(`Saved succesfully`, {
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
        this.getAllDataConfig();
      });
    },
    saveEditCrawlPagePDF() {
      let objDataEdit = {};
      objDataEdit.titlePage = this.nameModel;
      objDataEdit.modeSchedule = !this.validated;
      objDataEdit.timeSchedule = this.tableScheduleHasTick();
      objDataEdit.modePublic = this.modePublic;
      objDataEdit.modeCookies = this.validatedCokkies;
      objDataEdit.modeRobotsParser = this.modeRobotsParser;
      objDataEdit.timeOutCrawl = this.timeOutCrawl;
      objDataEdit.timeRetryCrawl = this.timeRetryCrawl;
      objDataEdit.timeDelayCrawl = this.timeDelayCrawl;
      objDataEdit.userAgent = this.userAgent;
      objDataEdit.cookies = this.cookies;
      objDataEdit.httpHeader = this.httpHeader;
      objDataEdit.number_page_query = this.number_page_query;
      objDataEdit.article_url_query = this.article_url_query;
      objDataEdit.title_query = this.title_query;
      objDataEdit.timeCreatePostOrigin_query = this.timeCreatePostOrigin_query;
      objDataEdit.source = this.source;
      objDataEdit.number_CK = this.number_CK;
      objDataEdit.id_pdf = this.id_pdf;
      HTTP.post(`save-edit-crawl-pdf`, {objDataEdit}).then((response) => {
        new Snackbar(`Saved succesfully`, {
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
        this.getAllDataConfigPDF();
      });
    },
    tableScheduleHasTick() {
      let arrData = [];
      let sunday = { day: "0", hour: [] };
      let monday = { day: "1", hour: [] };
      let tuesday = { day: "2", hour: [] };
      let wednesday = { day: "3", hour: [] };
      let thursday = { day: "4", hour: [] };
      let friday = { day: "5", hour: [] };
      let saturday = { day: "6", hour: [] };
      let arrayInput = document.querySelectorAll(".select-customers-info");
      for (let index = 0; index < arrayInput.length; index++) {
        let element = arrayInput[index];
        if (element.checked === true) {
          if (element.classList[3] === "sunday")
            sunday.hour.push(element.value * 1);
          if (element.classList[3] === "monday")
            monday.hour.push(element.value * 1);
          if (element.classList[3] === "tuesday")
            tuesday.hour.push(element.value * 1);
          if (element.classList[3] === "wednesday")
            wednesday.hour.push(element.value * 1);
          if (element.classList[3] === "thursday")
            thursday.hour.push(element.value * 1);
          if (element.classList[3] === "friday")
            friday.hour.push(element.value * 1);
          if (element.classList[3] === "saturday")
            saturday.hour.push(element.value * 1);
        }
      }
      arrData = [
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
      ];
      return arrData;
    },
    closeModalEdit() {
      this.$modal.hide("modal-edit-page-website");
    },
    getAllDataConfig() {
      HTTP.get(`get-data-edit-crawl`).then((response) => {
        this.arrDataConfig = response.data;
      });
    },
    getAllDataConfigPDF(){
      HTTP.get(`get-data-edit-pdf`).then((response) => {
        this.arrDataConfigPDF = response.data;
      });
    },
    getCrawler() {
      let arrayeleAddress = [
        "cafef",
        "cafebiz",
        "baodautu",
        "vneconomy",
        'cafefpdf',
      ];
      HTTP.get(`crawler-information`, {
        params: {
          arrayeleAddress: arrayeleAddress,
        },
      }).then((response) => {
        this.posts = response.data;
        for (let i = 0; i < this.posts.length; i++) {
          //cafef
          if (this.posts[i].addressPage === "cafef") {
            this.sumPost[0] = this.posts[i].sumPost;
            this.increasedPost[0] = this.posts[i].increasePost;
            this.sumPostBlock[0] = this.posts[i].sumPostBlock;
            this.sumPostSkip[0] = this.posts[i].sumPostSkip;
            this.LastDateCrawler[0] = this.getTimeAgo(
              this.posts[i].dateLastCrawler
            );

            if (this.posts[i].statusPageCrawl === "Pending") {
              this.status[0] = "Pending";
              this.classData[0] = "badge badge-warning";
              // $("#icon-loading-btn-"+String(this.posts[i].addressPage)).show();
              // $("#btn-crawl-" + String(this.posts[i].addressPage)).prop("disabled", true);
            } else {
              if (this.posts[i].statusPageCrawl === "Success") {
                this.status[0] = "Success";
                this.classData[0] = "badge color-badge-success";
              } else if (this.posts[i].statusPageCrawl === "Off") {
                this.status[0] = "Off";
                this.classData[0] = "badge color-badge-dark";
              } else {
                this.status[0] = "Error";
                this.classData[0] = "badge color-badge-danger";
              }
            }
          }
          //cafebiz
          if (this.posts[i].addressPage === "cafebiz") {
            this.sumPost[1] = this.posts[i].sumPost;
            this.increasedPost[1] = this.posts[i].increasePost;
            this.sumPostBlock[1] = this.posts[i].sumPostBlock;
            this.sumPostSkip[1] = this.posts[i].sumPostSkip;
            this.LastDateCrawler[1] = this.getTimeAgo(
              this.posts[i].dateLastCrawler
            );
            if (this.posts[i].statusPageCrawl === "Pending") {
              this.status[1] = "Pending";
              this.classData[1] = "badge badge-warning";
              // $("#icon-loading-btn-"+String(this.posts[i].addressPage)).show();
              // $("#btn-crawl-" + String(this.posts[i].addressPage)).prop("disabled", true);
            } else {
              if (this.posts[i].statusPageCrawl === "Success") {
                this.status[1] = "Success";
                this.classData[1] = "badge color-badge-success";
              } else if (this.posts[i].statusPageCrawl === "Off") {
                this.status[1] = "Off";
                this.classData[1] = "badge color-badge-dark";
              } else {
                this.status[1] = "Error";
                this.classData[1] = "badge color-badge-danger";
              }
            }
          }
          //baodautu
          if (this.posts[i].addressPage === "baodautu") {
            this.sumPost[2] = this.posts[i].sumPost;
            this.increasedPost[2] = this.posts[i].increasePost;
            this.sumPostBlock[2] = this.posts[i].sumPostBlock;
            this.sumPostSkip[2] = this.posts[i].sumPostSkip;

            this.LastDateCrawler[2] = this.getTimeAgo(
              this.posts[i].dateLastCrawler
            );
            if (this.posts[i].statusPageCrawl === "Pending") {
              this.status[2] = "Pending";
              this.classData[2] = "badge badge-warning";
              // $("#icon-loading-btn-"+String(this.posts[i].addressPage)).show();
              // $("#btn-crawl-" + String(this.posts[i].addressPage)).prop("disabled", true);
            } else {
              if (this.posts[i].statusPageCrawl === "Success") {
                this.status[2] = "Success";
                this.classData[2] = "badge color-badge-success";
              } else if (this.posts[i].statusPageCrawl === "Off") {
                this.status[2] = "Off";
                this.classData[2] = "badge color-badge-dark";
              } else {
                this.status[2] = "Error";
                this.classData[2] = "badge color-badge-danger";
              }
            }
          }
          //vneconomy
          if (this.posts[i].addressPage === "vneconomy") {
            this.sumPost[3] = this.posts[i].sumPost;
            this.increasedPost[3] = this.posts[i].increasePost;
            this.sumPostBlock[3] = this.posts[i].sumPostBlock;
            this.sumPostSkip[3] = this.posts[i].sumPostSkip;

            this.LastDateCrawler[3] = this.getTimeAgo(
              this.posts[i].dateLastCrawler
            );
            if (this.posts[i].statusPageCrawl === "Pending") {
              this.status[3] = "Pending";
              this.classData[3] = "badge badge-warning";
              // $("#icon-loading-btn-"+String(this.posts[i].addressPage)).show();
              // $("#btn-crawl-" + String(this.posts[i].addressPage)).prop("disabled", true);
            } else {
              if (this.posts[i].statusPageCrawl === "Success") {
                this.status[3] = "Success";
                this.classData[3] = "badge color-badge-success";
              } else if (this.posts[i].statusPageCrawl === "Off") {
                this.status[3] = "Off";
                this.classData[3] = "badge color-badge-dark";
              } else {
                this.status[3] = "Error";
                this.classData[3] = "badge color-badge-danger";
              }
            }
          }
          if (this.posts[i].addressPage === "cafefpdf") {
            this.sumPost[4] = this.posts[i].sumPost;
            this.increasedPost[4] = this.posts[i].increasePost;
            this.sumPostBlock[4] = this.posts[i].sumPostBlock;
            this.sumPostSkip[4] = this.posts[i].sumPostSkip;

            this.LastDateCrawler[4] = this.getTimeAgo(
              this.posts[i].dateLastCrawler
            );
            if (this.posts[i].statusPageCrawl === "Pending") {
              this.status[4] = "Pending";
              this.classData[4] = "badge badge-warning";
              // $("#icon-loading-btn-"+String(this.posts[i].addressPage)).show();
              // $("#btn-crawl-" + String(this.posts[i].addressPage)).prop("disabled", true);
            } else {
              if (this.posts[i].statusPageCrawl === "Success") {
                this.status[4] = "Success";
                this.classData[4] = "badge color-badge-success";
              } else if (this.posts[4].statusPageCrawl === "Off") {
                this.status[4] = "Off";
                this.classData[4] = "badge color-badge-dark";
              } else {
                this.status[4] = "Error";
                this.classData[4] = "badge color-badge-danger";
              }
            }
          }
        }
      });
    },
  },
  mounted() {
    this.getAllDataConfig();
    this.getAllDataConfigPDF()
    this.getCrawler();
  },
};
</script>
<style>


p.usr-ph-no {
  margin-bottom: 11px;
  font-size: 13px;
}
p.date-time-crawler-rss {
  font-size: 13px;
  margin-bottom: 0px;
}
p.dark.date-time-crawler-rss {
  font-size: 13px;
  margin-bottom: 0px;
}
.btn-info,
.btn-warning {
  padding: 0.4375rem 1.25rem !important;
  font-size: 14px!important;
}
.dark p.user-name {
  color: #009688 !important;
}
.dark p.user-work {
  color: #bfc9d4;
}
.dark .item-content.rss-page {
  background-color: #0e1726;
  border: 1px solid #0e1726;
}
input#edit-name-page {
  color: #bfc9d4;
}
.vm--modal {
  top: 80px !important;
  left: 600px !important;
  width: 700px !important;
  height: 271px !important;
}
.crawler-component .user-email {
  width: 100% !important;
}
p.user-name {
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 0;
  color: #2196f3;
}
p.user-work {
  font-weight: 700;
  font-size: 13px;
  color: #888ea8;
}
.user-meta-info {
  margin-top: 10px;
}
.searchable-container .searchable-items.grid .items .user-email {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
.user-email.address-page {
  display: block !important;
}
p.info-title {
  font-size: 14px;
  font-weight: 600;
  color: #3b3f5c;
  margin-bottom: 11px;
}
.action-btn.d-flex.justify-content-center {
  width: 100% !important;
  margin: 20px 0;
}
.user-email {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
.items {
  margin-bottom: 30px;
  border-radius: 6px;
  width: 100%;
  color: #0e1726;
  transition: all 0.35s ease;
  width: 33%;
  -ms-flex: 0 0 25%;
  flex: 0 0 25%;
  max-width: 25%;
  position: relative;
  width: 100%;
  /* background: white; */
  padding-right: 15px;
  padding-left: 15px;
}
.item-content.rss-page {
  background-color: #fff;
  padding: 13px 18px;
  border-radius: 6px;
  border: 1px solid #e0e6ed;
  box-shadow: 0 0 40px 0 rgb(94 92 154 / 6%);
}
.btn-info {
  background-color: #2196f3 !important;
  border-color: #2196f3 !important;
}
.rss.searchable-items.grid .action-btn.d-flex {
  width: 100% !important;
}
</style>
