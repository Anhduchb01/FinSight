const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Crawler = mongoose.model("Crawler");
const ConfigCrawler = mongoose.model("ConfigCrawler");
const ConfigDefaultCrawler = mongoose.model("ConfigDefaultCrawler");
const Post = mongoose.model("Post");
const KeywordCrawler = mongoose.model("KeywordCrawler");


router.get("/admin/crawler", (req, res) => {
  res.render("admin/main/crawler", { title: 'Crawler' });
});
// Crawl By Website
router.post("/crawpage-cafef", async (req, res) => {
  let address = req.body.address;
  let objDataConfig = req.body.objDataConfig;
  await pageCrawler(address,objDataConfig);
  res.send("cafef");
});
router.post("/crawpage-cafebiz", async (req, res) => {
  console.log('dan an button crawl')
  let address = req.body.address;
  let objDataConfig = req.body.objDataConfig;
  await pageCrawler(address,objDataConfig);
  res.send("cafebiz");
});
router.post("/crawpage-baodautu", async (req, res) => {
  let address = req.body.address;
  let objDataConfig = req.body.objDataConfig;
  await pageCrawler(address,objDataConfig);
  res.send("baodautu");
});
router.post("/crawpage-vneconomy", async (req, res) => {
  let address = req.body.address;
  let objDataConfig = req.body.objDataConfig;
  await pageCrawler(address,objDataConfig);
  res.send("vneconomy");
});

//Crawl By Keyword Analysis
router.post("/crawdata-by-keyword", async (req, res) => {
  let objCrawl = req.body.objCrawl;
  let datas = await pageCrawler(objCrawl);
  res.send(datas);
});

//Crawl By Keyword
router.post("/crawl-page-by-keyword", async (req, res) => {
  let objDataConfig = req.body.objDataConfig;
  await pageCrawlerByKeyword(objDataConfig);
  res.send("addressgsi");
});


router.get("/crawler-information", async (req, res) => {
  let arrayeleAddress = req.query.arrayeleAddress;
  let arrDataAfterCrawler = [];
  let searchSumPost = await Crawler.find({});
  for (let index = 0; index < arrayeleAddress.length; index++) {
    let objDataCrawler = {};
    objDataCrawler.address = arrayeleAddress[index];
    objDataCrawler.sumPost = searchSumPost[index].sumPost;
    arrDataAfterCrawler.push(objDataCrawler);
  }

  for (let index = 0; index < arrayeleAddress.length; index++) {
    let urlPageCrawl = arrayeleAddress[index];
    //post success
    await Post.find(
      {
        urlPageCrawl: urlPageCrawl,
        status:'0',
      },
      async (err, docs) => {
        if (!err) {
          await Crawler.updateOne(
            { addressPage: urlPageCrawl},
            {
              $set: {
                sumPost: docs.length,
              },
            }
          );
        } else {
          console.log("Error in retrieving employee list :" + err);
        }
      }
    );
    //post block
    await Post.find(
      {
        urlPageCrawl: urlPageCrawl,
        status:'1',
      },
      async (err, docs) => {
        if (!err) {
          await Crawler.updateOne(
            { addressPage: urlPageCrawl},
            {
              $set: {
                sumPostBlock: docs.length,
              },
            }
          );
        } else {
          console.log("Error in retrieving employee list :" + err);
        }
      }
    );
    //post skip
    await Post.find(
      {
        urlPageCrawl: urlPageCrawl,
        status:'2',
      },
      async (err, docs) => {
        if (!err) {
          await Crawler.updateOne(
            { addressPage: urlPageCrawl},
            {
              $set: {
                sumPostSkip: docs.length,
              },
            }
          );
        } else {
          console.log("Error in retrieving employee list :" + err);
        }
      }
    );
  }

  await Crawler.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});

router.get("/get-data-edit-crawl", (req, res) => {
  ConfigCrawler.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
router.get("/get-data-default-edit-crawl", (req, res) => {
  ConfigDefaultCrawler.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});

router.post("/save-edit-crawl", async (req, res) => {
  let objDataEdit = req.body.objDataEdit;
  objDataEdit.removeRuleQuery.EN = objDataEdit.removeRuleQuery.EN || []
  objDataEdit.removeRuleQuery.JP = objDataEdit.removeRuleQuery.JP || []
  for (let i = 0; i < objDataEdit.timeSchedule.length; i++) {
    objDataEdit.timeSchedule[i].hour = objDataEdit.timeSchedule[i].hour || []
    if( objDataEdit.timeSchedule[i].hour.length !== 0)objDataEdit.timeSchedule[i].hour.map(j=>Number(j))
  }
  await ConfigCrawler.updateOne(
    { titlePage: objDataEdit.titlePage },
    {
      $set: {
        modeSchedule: objDataEdit.modeSchedule,
        timeSchedule: objDataEdit.timeSchedule,
        modePublic: objDataEdit.modePublic,
        modeCookies: objDataEdit.modeCookies,
        modeRobotsParser: objDataEdit.modeRobotsParser,
        timeOutCrawl: objDataEdit.timeOutCrawl,
        timeRetryCrawl: objDataEdit.timeRetryCrawl,
        timeDelayCrawl: objDataEdit.timeDelayCrawl,
        userAgent: objDataEdit.userAgent,
        cookies: objDataEdit.cookies,
        httpHeader: objDataEdit.httpHeader,
        UrlQuery: objDataEdit.UrlQuery,
        articleUrlQuery: objDataEdit.articleUrlQuery,
        titleQuery: objDataEdit.titleQuery,
        descriptionQuery: objDataEdit.descriptionQuery,
        imageQuery: objDataEdit.imageQuery,
        postDateQuery: objDataEdit.postDateQuery,
        contentQuery: objDataEdit.contentQuery,
        removeRuleQuery: objDataEdit.removeRuleQuery,
      },
    }
  );
    await scheduleCrawler(objDataEdit);
   await res.send("success");
});

// crawl keyword
router.get("/create-keyword-crawl", async (req, res) => {
  let ObjCreateCrawl = req.query.ObjCreateCrawl;
  let searchUrl = await KeywordCrawler.findOne({
    keyword: ObjCreateCrawl.keyword,
    site: ObjCreateCrawl.site,
  });
  if (searchUrl === null) {
    let keywordCrawler = new KeywordCrawler();
    keywordCrawler.keyword = ObjCreateCrawl.keyword;
    keywordCrawler.site = ObjCreateCrawl.site;
    keywordCrawler.modeTime = ObjCreateCrawl.modeTime;
    keywordCrawler.timeSchedule = ObjCreateCrawl.timeSchedule;
    keywordCrawler.dateLastCrawler = '';
    keywordCrawler.statusPageCrawl = "Off";
    keywordCrawler.sumPost = 0;
    keywordCrawler.increasePost = 0;
    keywordCrawler.save();
    // await scheduleRSSCrawler();
    res.send("create-success");
  } else {
    res.send("create-error");
  }
});

router.get("/get-all-keyword-crawl", (req, res) => {
  KeywordCrawler.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
router.get("/remove-keyword-crawl", (req, res) => {
  let valueID = req.query.valueID;
  KeywordCrawler.remove({ _id: valueID }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("success");
    }
  });
});
router.post("/edit-keyword-crawl", async (req, res) => {
  let ObjCreateCrawl = req.body.ObjCreateCrawl;
  await KeywordCrawler.updateOne(
    { _id: ObjCreateCrawl.valueID },
    {
      $set: {
        modeTime: ObjCreateCrawl.modeTime,
        timeSchedule: ObjCreateCrawl.timeSchedule,
      },
    }
  );
  // await scheduleRSSCrawler();
  await res.send("success");
});



module.exports = router;
