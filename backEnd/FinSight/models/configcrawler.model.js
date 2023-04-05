const mongoose = require("mongoose");

var configCrawler = new mongoose.Schema({
  titlePage:{ type: String },
  urlPage:{ type: String },
  namePage: { type: String },
  modeSchedule: { type: Boolean },
  timeSchedule: { type: Object },
  modePublic: { type: Boolean },
  modeCookies: { type: Boolean },
  modeRobotsParser: { type: Boolean },
  timeOutCrawl: { type: Number },
  timeRetryCrawl: { type: Number },
  timeDelayCrawl: { type: Number },
  cookies: { type: String },
  userAgent: { type: String },
  httpHeader: { type:Object },
  number_page_query: { type: Number },
  article_url_query: { type: String },
  title_query: { type: String },
  timeCreatePostOrigin_query: { type: String },
  category_query: { type: String },
  author_query: { type: String },
  content_title_query: { type: String },
  content_des_query: { type: String },
  content_html_title_query: { type: String },
  content_html_des_query: { type: String },
  image_url_query: { type: String },
  
});

mongoose.model("ConfigCrawler", configCrawler);
