const seeder = require("mongoose-seed");
const dotenv = require('dotenv');
dotenv.config();

let itemsCrawler = [];
let itemsEditCrawler = [];
let itemsEditCrawlerPDF = []
let arrAddress = [
  "cafef",
  "cafebiz",
  "baodautu",
  "vneconomy",

];
let arrTitlePage = ['CafeF', 'CafeBiz', 'BaoDauTu', 'VnEconomy']
let arrTitleURLPage = ['https:/cafef.vn', 'https://cafebiz.vn', 'https://baodautu.vn', 'https://vneconomy.vn']
let objQueryCafef = {
  number_page_query: 2,
  article_url_query: "div.tlitem.box-category-item  h3  a",
  title_query:"h1.title",
  timeCreatePostOrigin_query: "span.pdate",
  category_query: "a.category-page__name.cat",
  author_query: "p.author",
  content_title_query: "h2.sapo",
  content_des_query: "div.detail-content.afcbc-body p",
  content_html_title_query:"h2.sapo",
  content_html_des_query:"div.contentdetail",
  image_url_query:"div.media img"
}
let objQueryCafebiz = {
  number_page_query: 2,
  article_url_query: "a.cfbiznews_title.show-popup",
  title_query:"h1.title",
  timeCreatePostOrigin_query: "div.timeandcatdetail span.time",
  category_query: "div.timeandcatdetail a",
  author_query: "p.p-author strong",
  content_title_query: "div.detail-content p",
  content_des_query: "div.detail-content.afcbc-body p",
  content_html_title_query:"h2.sapo",
  content_html_des_query:"div.detail-content",
  image_url_query:"div.detail-content img"
}
let objQueryBaodautu ={
  number_page_query: 2,
  article_url_query: "ul.list_news_home a.fs22.fbold",
  title_query:"div.title-detail",
  timeCreatePostOrigin_query: "span.post-time",
  category_query: "div.fs16.text-uppercase a",
  author_query: "a.author.cl_green",
  content_title_query: "div.sapo_detail",
  content_des_query: "div#content_detail_news",
  content_html_title_query:"div.sapo_detail",
  content_html_des_query:"div#content_detail_news",
  image_url_query:"ul.list_news_home a.thumbblock img"
}
let objQueryVneconomy = {
  number_page_query: 2,
  article_url_query: "article.story.story--featured.story--timeline header a",
  title_query:"article.detail-wrap header h1",
  timeCreatePostOrigin_query: "article.detail-wrap header div.detail__meta",
  category_query: "h1.category-main a",
  author_query: "div.detail__author strong",
  content_title_query: "h2.detail__summary",
  content_des_query: "div.detail__content",
  content_html_title_query:"h2.detail__summary",
  content_html_des_query:"div.detail__content",
  image_url_query:"figure.detail__avatar img"
}

let dataHTTPHeader = [{ header: '', value: '' }]

let arrObjQuery = [objQueryCafef, objQueryCafebiz, objQueryBaodautu, objQueryVneconomy]

let timeSchedule = [{day:"0",hour:[1]},{day:"1",hour:[1]},{day:"2",hour:[1]},{day:"3",hour:[1]},{day:"4",hour:[1]},{day:"5",hour:[1]},{day:"6",hour:[1]}]


for (i = 0; i < arrAddress.length; i++) {
  itemsCrawler.push({
    addressPage: arrAddress[i],
    dateLastCrawler: "----/--/--",
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
    number_page_query: arrObjQuery[i].number_page_query,
    article_url_query: arrObjQuery[i].article_url_query,
    title_query: arrObjQuery[i].title_query,
    timeCreatePostOrigin_query: arrObjQuery[i].timeCreatePostOrigin_query,
    category_query: arrObjQuery[i].category_query,
    author_query: arrObjQuery[i].author_query,
    content_title_query: arrObjQuery[i].content_title_query,
    content_des_query: arrObjQuery[i].content_des_query,
    content_html_title_query: arrObjQuery[i].content_html_title_query,
    content_html_des_query: arrObjQuery[i].content_html_des_query,
    image_url_query: arrObjQuery[i].image_url_query,
    
  });
}
let itemsQueryDefault = []
for (i = 0; i < arrAddress.length; i++) {
  itemsQueryDefault.push({
    titlePage: arrTitlePage[i],
    number_page_query: arrObjQuery[i].number_page_query,
    article_url_query: arrObjQuery[i].article_url_query,
    title_query: arrObjQuery[i].title_query,
    timeCreatePostOrigin_query: arrObjQuery[i].timeCreatePostOrigin_query,
    category_query: arrObjQuery[i].category_query,
    author_query: arrObjQuery[i].author_query,
    content_title_query: arrObjQuery[i].content_title_query,
    content_des_query: arrObjQuery[i].content_des_query,
    content_html_title_query: arrObjQuery[i].content_html_title_query,
    content_html_des_query: arrObjQuery[i].content_html_des_query,
    image_url_query: arrObjQuery[i].image_url_query,
  });
}
// let itemsCategory = [];
// let arrCategory = ["other", "circleofblue", "nasa"];
// for (i = 0; i < arrCategory.length; i++) {
//   itemsCategory.push({
//     name: arrCategory[i],
//   });
// }
itemsCrawler.push({
  addressPage: 'cafefpdf',
  dateLastCrawler: "----/--/--",
  sumPost: "0",
  statusPageCrawl: "Off",
  modePage: "on",
  increasePost: 0,
});
itemsEditCrawlerPDF.push({
  titlePage: 'cafefpdf',
    urlPage: 'http://s.cafef.vn/phan-tich-bao-cao.chn',
    namePage: 'cafefpdf',
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
    number_page_query: 20,
    article_url_query: '#ContentPlaceHolder1_AnalyzeReportList1_rptData_itemTR_',
    article_url_query1: '#ContentPlaceHolder1_AnalyzeReportList1_rptData_altitemTR_',
    title_query:' > td:nth-child(2) > a::text',
    timeCreatePostOrigin_query: ' > td.Item_DateItem::text',
    source: '> td:nth-child(3)::text',
    number_CK: '> td:nth-child(4)::text',
    id_pdf: ' > td:nth-child(5) > a::attr(onclick)',
});
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
  // {
  //   model: "Category",
  //   documents: itemsCategory,
  // },
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
  {
    model : 'ConfigCrawlerPDF',
    documents: itemsEditCrawlerPDF

  }
  
];
// connect mongodb
seeder.connect(`${process.env.DB_URL}`, function () {
  console.log('MongoDB Connection Succeeded Seed.'+`${process.env.DB_URL}`)
  seeder.loadModels([
    "models/crawler.model",
    // "models/category.model",
    "models/user.model",
    "models/configcrawler.model",
    "models/configcrawlerpdf.model",
    "models/configquerydefault.model", // load mongoose model
  ]);
  seeder.clearModels(["Crawler","User","ConfigCrawler","ConfigCrawlerPDF",'ConfigDefaultCrawler'], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});
