const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Sorting = mongoose.model("Sorting");
var dayjs = require("dayjs");
const { queryArticle } = require('../../service/admin/sorting/sorting')

const multiLanguageSelect = require("../../service/front-end/multiLanguage");

router.get("/admin/contact-us", (req, res) => {
  try {
    res.render("admin/main/contact-us", { title: 'Contact Us' });
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});



router.get("/getdata", async (req, res) => {
  //get data config sorting
  try {
    let dataConfigSort = await Sorting.find({})
    let percentLaster = dataConfigSort[0].percentLaster;
    let percentViewed = dataConfigSort[0].percentViewed;
    let pointDecreasePerDay = dataConfigSort[0].pointDecreasePerDay;
    let pointIncreasePerView = dataConfigSort[0].pointIncreasePerView;
    let pointRequiredForTag = dataConfigSort[0].pointRequiredForTag;
    let viewRequiredForTag = dataConfigSort[0].viewRequiredForTag;
    let array = await queryArticle(percentLaster, percentViewed, pointDecreasePerDay, pointIncreasePerView, pointRequiredForTag, viewRequiredForTag)
    let arrayData = [array, pointRequiredForTag, viewRequiredForTag]
    res.send(arrayData)
  }
  catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }

});

router.get("/home/getnews", async (req, res) => {
  //get data config sorting
  try {
    let arrayPost = []
    arrayPost = await Post.find({ status: '0' }).limit(8).sort({ timeCrawlPage: -1 });
      for (let i = 0; i < arrayPost.length; i++) {
          let article = arrayPost[i]
          let timeHasPassed = dayjs().diff(article.timeCrawlPage, 'days')
          timeHasPassed = Number(timeHasPassed)
          arrayPost[i].timeCrawlPage = timeHasPassed + ' day ago'
      }
    res.send(arrayPost)
  }
  catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }

});

module.exports = router;
