const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const scheduleRSSCrawler = require("../../service/admin/scheduleRSSCrawler");
const logToFile = require("../../service/logger");
const RssControl = mongoose.model("RssControl");
const RssPost = mongoose.model("RssPost");
const rssCrawler = require("../../service/admin/rssCrawler");

router.get("/admin/rss-crawler", (req, res) => {
  res.render("admin/main/rss-crawl", { title: "RSS Fetcher" });
});

router.get("/get-all-page-rss", (req, res) => {
  RssControl.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
router.get("/create-crawl-rss", async (req, res) => {
  let ObjCreateCrawl = req.query.ObjCreateCrawl;
  let searchUrl = await RssControl.findOne({
    urlPage: ObjCreateCrawl.urlpage,
  });
  if (searchUrl === null) {
    let rssControl = new RssControl();
    rssControl.namePage = ObjCreateCrawl.namePage;
    rssControl.urlPage = ObjCreateCrawl.urlpage;
    rssControl.modeTime = ObjCreateCrawl.modeTime;
    rssControl.time = ObjCreateCrawl.time;
    rssControl.modePublic = ObjCreateCrawl.modePublic;
    rssControl.dateLastCrawler = "";
    rssControl.sumPost = 0;
    rssControl.save();
    await rssCrawler(ObjCreateCrawl.namePage, ObjCreateCrawl.urlpage);
    await scheduleRSSCrawler();
    res.send("create-success");
  } else {
    res.send("create-error");
  }
});

router.get("/get-meta-data", async (req, res) => {
  let namePage = req.query.namePage;
  RssPost.find({ namePage: namePage }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
router.get("/rss-control/:id", (req, res) => {
  let id = req.params.id;
  RssControl.findOne({ _id: id }, (err, docs) => {
    if (!err) {
      console.log(docs);
      res.render("admin/rss-control-edit", {
        dataEdit: docs,
        id: req.params.id,
      });
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
router.get("/remove-page-crawl-rss", (req, res) => {
  let valueID = req.query.valueID;
  RssControl.remove({ _id: valueID }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("success");
    }
  });
});
router.get("/edit-page-crawl-rss", async (req, res) => {
  let ObjCreateCrawl = req.query.ObjCreateCrawl;
  await RssControl.updateOne(
    { _id: ObjCreateCrawl.valueID },
    {
      $set: {
        namePage: ObjCreateCrawl.namePage,
        modeTime: ObjCreateCrawl.modeTime,
        time: ObjCreateCrawl.time,
        modePublic: ObjCreateCrawl.modePublic,
      },
    }
  );
  await scheduleRSSCrawler();
  await res.send("success");
});

module.exports = router;
