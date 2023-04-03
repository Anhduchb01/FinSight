const mongoose = require("mongoose");

var configQueryDefaultCrawler = new mongoose.Schema({
    titlePage:{ type:Object },
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

mongoose.model("ConfigDefaultCrawler", configQueryDefaultCrawler);
