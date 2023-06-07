const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const multiLanguageSelect = require("../../service/front-end/multiLanguage");


router.get("/detail-new/:id", (req, res) => {
  try {
    let language = req.cookies.language || "en";
    let multiLanguage = multiLanguageSelect(language);

    Post.find({ _id: req.params.id },
      (err, docs) => {
        if (!err) {
          res.render("information-frontend/main/detail-new", {
            contentHTML: docs[0].contenthtml,
            timeAgo: docs[0].timeCrawlPage,
            classification: docs[0].category,
            namePage: docs[0].url,
            urlPageCrawl: docs[0].url,
            language,
            multiLanguage,
            layout: './information-frontend/layouts/container',
          });
        } else {
          console.log("Error in retrieving employee list :" + err);
        }
      }
    );
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

module.exports = router;
