const mongoose = require("mongoose");

var configQueryDefaultCrawler = new mongoose.Schema({
    titlePage:{ type:Object },
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

mongoose.model("ConfigDefaultCrawler", configQueryDefaultCrawler);
