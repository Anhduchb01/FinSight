const { request } = require("express");
const express = require("express");
var router = express.Router();
var dayjs = require("dayjs");
const mongoose = require("mongoose");
const { ObjectID } = require("bson");
const Post = mongoose.model("Post");
const Crawler = mongoose.model("Crawler");
const Logger = mongoose.model("Logger");
const Tag = mongoose.model("Tag");
const Tagmap = mongoose.model("Tagmap");
const Categorymap = mongoose.model("Categorymap");
const HistoryClassification = mongoose.model("HistoryClassification");
const HistoryGenerateTag = mongoose.model("HistoryGenerateTag");
const TagHistorys = mongoose.model("TagHistorys");
const Sorting = mongoose.model("Sorting");
const { queryArticle } = require('../../service/admin/sorting/sorting')



function formatTime() {
  let timeCrawlPage = dayjs().format("YYYY/MM/DD h:mm:ss");
  return timeCrawlPage;
}

router.get("/admin/setting", (req, res) => {
  res.render("admin/main/setting", { title: 'Setting' });
});

router.delete("/deleteall", async (req, res) => {
  await Tag.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
  });
  await HistoryClassification.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
  });
  await HistoryGenerateTag.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
  });
  await TagHistorys.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
  });
  await Tagmap.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
  });
  await Categorymap.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
  });
  await Post.remove({}, async function (err) {
    if (err) {
      console.log(err);
    } else {
      await Crawler.updateMany(
        {},
        {
          $set: {
            statusPageCrawl: "Off",
            dateLastCrawler: "----/--/--",
            increasePost: 0,
          },
        }
      );
      var logger = new Logger();
      logger.status = "Delete";
      logger.message = "Remove All Data Success";
      logger.timelog = formatTime();
      logger.save();
      res.end("success");
    }
  });
});


router.delete("/delete-all-log", (req, res) => {
  Logger.remove({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("success");
    }
  });
});

router.get("/query-fix-data", async (req, res) => {
  let number = req.query.number
  let arrayPost = []
  number = Number(number)
  if (number > 8) number = 8
  //get data config sorting
  let dataConfigSort = await Sorting.find({})
  let percentLaster = dataConfigSort[0].percentLaster;
  let percentViewed = dataConfigSort[0].percentViewed;
  let pointDecreasePerDay = dataConfigSort[0].pointDecreasePerDay;
  let pointIncreasePerView = dataConfigSort[0].pointIncreasePerView;
  let pointRequiredForTag = dataConfigSort[0].pointRequiredForTag;
  let viewRequiredForTag = dataConfigSort[0].viewRequiredForTag;

  let array = await queryArticle(percentLaster, percentViewed, pointDecreasePerDay, pointIncreasePerView, pointRequiredForTag, viewRequiredForTag)
  arrayPost = array[0]
  for (let index = 0; index < number; index++) {
    let id = arrayPost[index]._id
    await Post.updateMany({ _id: ObjectID(id) }, { $unset: { isTag: "" } })
    await Post.updateMany({ _id: ObjectID(id) }, { $unset: { isTagAi: "" } })
    await Tagmap.remove({ article_id: ObjectID(id) })
  }
});


router.get("/query-fix-data-classification", async (req, res) => {
  let number = req.query.number
  let arrayPost = []
  number = Number(number)
  if (number > 8) number = 8
  //get data config sorting
  let dataConfigSort = await Sorting.find({})
  let percentLaster = dataConfigSort[0].percentLaster;
  let percentViewed = dataConfigSort[0].percentViewed;
  let pointDecreasePerDay = dataConfigSort[0].pointDecreasePerDay;
  let pointIncreasePerView = dataConfigSort[0].pointIncreasePerView;
  let pointRequiredForTag = dataConfigSort[0].pointRequiredForTag;
  let viewRequiredForTag = dataConfigSort[0].viewRequiredForTag;

  let array = await queryArticle(percentLaster, percentViewed, pointDecreasePerDay, pointIncreasePerView, pointRequiredForTag, viewRequiredForTag)
  arrayPost = array[0]
  for (let index = 0; index < number; index++) {
    let id = arrayPost[index]._id
    await Post.updateMany({ _id: ObjectID(id) }, { $unset: { isClassification: "",category: "",classificationScore: "",classificationStatus: "" } })
  }
});
// await Tag.remove({ })
// await Tagmap.remove({})
// });/query-fix-data-classification

module.exports = router;
