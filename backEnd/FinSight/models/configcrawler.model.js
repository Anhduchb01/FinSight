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
  UrlQuery: { type:Object },
  PagingNextpageQuery: { type:Object },
  articleUrlQuery: { type:Object },
  titleQuery: { type:Object },
  descriptionQuery: { type:Object },
  imageQuery: { type:Object },
  postDateQuery: { type:Object },
  contentQuery: { type:Object },
  removeRuleQuery: { type:Object },
});

mongoose.model("ConfigCrawler", configCrawler);
