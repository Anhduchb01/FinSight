const seeder = require("mongoose-seed");
const dotenv = require('dotenv');
dotenv.config();

let itemsCrawler = [];
let itemsEditCrawler = [];
let arrAddress = [
  "addressgsi",
  "addressenv",
  "addresscob",
  "addressusgs",
  "addressnasa",
];
let arrTitlePage = ['GSI', 'ENV', 'COB', 'USGS', 'NASA']
let arrTitleURLPage = ['https://www.gsj.jp', 'https://www.env.go.jp', 'https://www.circleofblue.org', 'https://waterdata.usgs.gov', 'https://www.nasa.gov']
let objQueryGSI = { UrlQuery: { EN: 'https://www.gsj.jp/en/archives/index.html', JP: 'https://www.gsj.jp/info/index.html' }, articleUrlQuery: { EN: '.thumbnail .news a', JP: '.thumbnail strong a' }, titleQuery: { EN: '#main h3', JP: '#main h1' }, descriptionQuery: { EN: '#main p', JP: '#main p' }, imageQuery: { EN: '#main img', JP: '#main img' }, postDateQuery: { EN: 'p.e-date', JP: 'p.date' }, contentQuery: { EN: '#main', JP: '#main' }, removeRuleQuery: { EN: [".sign", ".linkIcon02"], JP: [".sign", ".linkIcon02"] }, }
let objQueryENV = { UrlQuery: { EN: 'https://www.env.go.jp/en/headline/water/index.php', JP: 'https://www.env.go.jp/press/index.html' }, articleUrlQuery: { EN: '#main .headline a', JP: '#main #result #result_list li a' }, titleQuery: { EN: '#main .well h1', JP: '#main h1' }, descriptionQuery: { EN: '#main p', JP: '#main p' }, imageQuery: { EN: '#main img', JP: '#main img' }, postDateQuery: { EN: '#main .well p.date', JP: '#main .date' }, contentQuery: { EN: '#main', JP: '#main' }, removeRuleQuery: { EN: [".for-jp", ".attach", ".plugin_install", ".well", "#main .cor-ttl"], JP: [".box_notice",".contact",".plugin_install",".box_info",".tag_set",".print"] }, }
let objQueryCOB = {
  UrlQuery: { EN: 'https://www.circleofblue.org/tag/frontpage/', JP: '' }, articleUrlQuery: { EN: 'main.content article.post-entry > a', JP: '' }, titleQuery: { EN: '#main h1', JP: '' }, descriptionQuery: { EN: '#main .post-entry', JP: '' }, imageQuery: { EN: '#main .wp-caption img', JP: '' }, postDateQuery: { EN: '#main time', JP: '' }, contentQuery: { EN: '#main', JP: '' }, removeRuleQuery: {
    EN: ["#jp-relatedposts",
      ".addtoany_share_save_container.addtoany_content.addtoany_content_bottom",
      ".saboxplugin-wrap",
      ".av-related-style-full",
      ".comment_container",
      ".comment_meta_container",
      "aside",
      "#footer",
      ".hidden",
      "#av_player-0",
      ".blog-tags.minor-meta",
      "#after_section_1",
      ".avia-builder-widget-area",
      ".flex_column.av_one_third",
      ".av-special-heading.av-special-heading-h3.avia-builder-el-9", ".avia-content-slider-inner"], JP: []
  },
}

let objQueryUSGS = { UrlQuery: { EN: "https://www.usgs.gov/news/news-releases", JP: '' }, articleUrlQuery: { EN: '.view-content .views-column .list-title a', JP: '' }, titleQuery: { EN: '.main-container h1.page-header', JP: '' }, descriptionQuery: { EN: '.main-container .sub-content .usgs-body', JP: '' }, imageQuery: { EN: '.main-container img.img-responsive', JP: '' }, postDateQuery: { EN: '.main-container span.date-display-single', JP: '' }, contentQuery: { EN: '.main-container .region', JP: '' }, removeRuleQuery: { EN: [".right-column", "#node-carousel",".node-related-content"], JP: [] }, }

let objQueryNASA = { UrlQuery: { EN: 'https://www.nasa.gov/content/water-and-ice', JP: '' }, articleUrlQuery: { EN: '#cards .card', JP: '' }, titleQuery: { EN: '.article-body h1.title', JP: '' }, descriptionQuery: { EN: '.article-body section .text', JP: '' }, imageQuery: { EN: '.article-body img', JP: '' }, postDateQuery: { EN: '.article-body .pr-promo-date-time', JP: '' }, contentQuery: { EN: '.article-body', JP: '' }, removeRuleQuery: { EN: [ ".feature-credits",
".editor-info",
".addthis-wrap.pull-right",".ui-draggable"], JP: [] }, }

let dataHTTPHeader = [{ header: '', value: '' }]

let arrObjQuery = [objQueryGSI, objQueryENV, objQueryCOB, objQueryUSGS, objQueryNASA]

let timeSchedule = [{day:"0",hour:[1]},{day:"1",hour:[1]},{day:"2",hour:[1]},{day:"3",hour:[1]},{day:"4",hour:[1]},{day:"5",hour:[1]},{day:"6",hour:[1]}]


for (i = 0; i < arrAddress.length; i++) {
  itemsCrawler.push({
    addressPage: arrAddress[i],
    dateLastCrawler: "--/--/----",
    sumPost: "0",
    statusPageCrawl: "Off",
    modePage: "on",
    increasePost: 0,
  });
  itemsEditCrawler.push({
    titlePage: arrTitlePage[i],
    urlPage: arrTitleURLPage[i],
    namePage: arrAddress[i],
    modeSchedule: false,
    timeSchedule:timeSchedule,
    modePublic: false,
    modeCookies: true,
    modeRobotsParser: true,
    timeOutCrawl: 0,
    timeRetryCrawl: 0,
    timeDelayCrawl: 0,
    cookies: "",
    userAgent: "",
    httpHeader: dataHTTPHeader,
    UrlQuery: { EN: arrObjQuery[i].UrlQuery.EN, JP: arrObjQuery[i].UrlQuery.JP },
    articleUrlQuery: { EN: arrObjQuery[i].articleUrlQuery.EN, JP: arrObjQuery[i].articleUrlQuery.JP },
    titleQuery: { EN: arrObjQuery[i].titleQuery.EN, JP: arrObjQuery[i].titleQuery.JP },
    descriptionQuery: { EN: arrObjQuery[i].descriptionQuery.EN, JP: arrObjQuery[i].descriptionQuery.JP },
    imageQuery: { EN: arrObjQuery[i].imageQuery.EN, JP: arrObjQuery[i].imageQuery.JP },
    postDateQuery: { EN: arrObjQuery[i].postDateQuery.EN, JP: arrObjQuery[i].postDateQuery.JP },
    contentQuery: { EN: arrObjQuery[i].contentQuery.EN, JP: arrObjQuery[i].contentQuery.JP },
    removeRuleQuery: { EN: arrObjQuery[i].removeRuleQuery.EN, JP: arrObjQuery[i].removeRuleQuery.JP },
  });
}
let itemsQueryDefault = []
for (i = 0; i < arrAddress.length; i++) {
  itemsQueryDefault.push({
    titlePage: arrTitlePage[i],
    UrlQuery: { EN: arrObjQuery[i].UrlQuery.EN, JP: arrObjQuery[i].UrlQuery.JP },
    articleUrlQuery: { EN: arrObjQuery[i].articleUrlQuery.EN, JP: arrObjQuery[i].articleUrlQuery.JP },
    titleQuery: { EN: arrObjQuery[i].titleQuery.EN, JP: arrObjQuery[i].titleQuery.JP },
    descriptionQuery: { EN: arrObjQuery[i].descriptionQuery.EN, JP: arrObjQuery[i].descriptionQuery.JP },
    imageQuery: { EN: arrObjQuery[i].imageQuery.EN, JP: arrObjQuery[i].imageQuery.JP },
    postDateQuery: { EN: arrObjQuery[i].postDateQuery.EN, JP: arrObjQuery[i].postDateQuery.JP },
    contentQuery: { EN: arrObjQuery[i].contentQuery.EN, JP: arrObjQuery[i].contentQuery.JP },
    removeRuleQuery: { EN: arrObjQuery[i].removeRuleQuery.EN, JP: arrObjQuery[i].removeRuleQuery.JP },
  });
}
let itemsCategory = [];
let arrCategory = ["other", "circleofblue", "nasa"];
for (i = 0; i < arrCategory.length; i++) {
  itemsCategory.push({
    name: arrCategory[i],
  });
}

letItemsUser = [{
  username: 'admin@finsight.vn',
  password: '$2b$08$wOsX3.caipOB66CGB7O0kuKQHIoqNHln3cFR5oCsJxSgLPzq5Vok.',
  email: 'admin@gmail.com',
  timeCreate: '2021/06/18 13:28:35',
  role: 'admin'
}];


let data = [
  {
    model: "Crawler",
    documents: itemsCrawler,
  },
  {
    model: "Category",
    documents: itemsCategory,
  },
  {
    model: "User",
    documents: letItemsUser,
  },
  {
    model: "ConfigCrawler",
    documents: itemsEditCrawler,
  },
  {
    model: "ConfigDefaultCrawler",
    documents: itemsQueryDefault,
  },
];

// connect mongodb
seeder.connect(`${process.env.DB_URL}`, function () {
  console.log('MongoDB Connection Succeeded Seed.'+`${process.env.DB_URL}`)
  seeder.loadModels([
    "models/crawler.model",
    "models/category.model",
    "models/users.model",
    "models/configcrawler.model",
    "models/configquerydefault.model", // load mongoose model
  ]);
  seeder.clearModels(["Crawler", "Category", "ConfigCrawler",'ConfigDefaultCrawler'], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});
