const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const { generateWordCloud, generateDataByYear, countTotalTagAllYear, countTopTag, countTagByCategoryAllYear } = require("../../service/front-end/analyticTagService");
const { getArticleHasTag, getYearArray, getTimeLineOfTag ,getStatisticTag } = require("../../service/front-end/articleService");
const multiLanguageSelect = require("../../service/front-end/multiLanguage");
const apicache = require('apicache')
const Sorting = mongoose.model("Sorting");

let cache = apicache.middleware

router.get("/get-article-has-tag", async (req, res) => {
  try {
    let text = req.query.key;
    let numberPage = req.query.page;
    if (text == "" || text == null || text == undefined) {
      let articles = []
      return res.send(articles)
    } else {
      if (myCache.has("get-article-has-tag-" + String(text)+'-'+String(numberPage))) {
        return res.send(myCache.get("get-article-has-tag-" +String(text)+'-'+String(numberPage)));
      } else {
        let articles = await getArticleHasTag(text,numberPage);
        myCache.set("get-article-has-tag-"+String(text)+'-'+String(numberPage), articles)
        return res.send(articles);
      }
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

router.get("/word-cloud?", async (req, res) => {
  let list_date
  try {
    if (myCache.has("year-array")) {
      list_date = myCache.get("year-array");
    } else {
      list_date = await getYearArray();
      myCache.set("year-array", list_date);
    }
  } catch (err) {
    console.log(err)
  }
  try {
    let year
    if (req.query.year == '' || req.query.year == null) {
      year = list_date[list_date.length - 1];
    } else {
      year = req.query.year
    }
    if (myCache.has("word-cloud-" + String(year))) {
      console.log("load node -cache")
      res.send(myCache.get("word-cloud-" + String(year)));
    } else {
      console.log("load db")
      const data = await generateWordCloud(year);
      myCache.set("word-cloud-" + String(year), data);
      res.send(data);
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

router.get("/get-statistic-tag", async (req, res) => {
  try {
    let text = req.query.text;
    if (text == "" || text == null || text == undefined) {
      let articles = []
      return res.send(articles)
    } else {
      if (myCache.has("get-statistic-tag-" + String(text))) {
        return res.send(myCache.get("get-statistic-tag-" + String(text)));
      } else {
        let articles = await getStatisticTag(text);
        myCache.set("get-statistic-tag-" + String(text), articles)
        return res.send(articles);
      }
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

router.get("/get-timeline-of-tag", async (req, res) => {
  try {
    let text = req.query.text;
    if ( text == "" || text == null || text == undefined){
      let timeline = []
      return res.send(timeline);

    }else{
      
      if (myCache.has("get-timeline-of-tag-" + String(text))) {
        return res.send(myCache.get("get-timeline-of-tag-" + String(text)));
      } else {
  
        let timeline = await getTimeLineOfTag(text);
        myCache.set("get-timeline-of-tag-" + String(text), timeline)
        return res.send(timeline);
      }
    }
    
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

router.get("/year-array", async (req, res) => {
  try {
    if (myCache.has("year-array")) {
      return res.send(myCache.get("year-array"));
    } else {
      const data = await getYearArray();
      myCache.set("year-array", data);
      res.send(data);
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

router.get("/generate-data-year", async (req, res) => {
  let list_date
  try {
    if (myCache.has("year-array")) {
      list_date = myCache.get("year-array");
    } else {
      list_date = await getYearArray();
      myCache.set("year-array", list_date);
    }
  } catch (err) {
    console.log(err)
  }
  try {
    let year
    if (req.query.year == '' || req.query.year == null) {
      year = list_date[list_date.length - 1];
    } else {
      year = req.query.year
    }
    if (myCache.has("generate-data-year-" + String(year))) {
      return res.send(myCache.get("generate-data-year-" + String(year)));
    } else {
      let data = await generateDataByYear(year);
      myCache.set("generate-data-year-" + String(year), data);
      res.send(data);
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
})
router.get("/count-total-tag-all-year", async (req, res) => {
  try {
    if (myCache.has("count-total-tag-all-year")) {
      return res.send(myCache.get("count-total-tag-all-year"));
    } else {
      const data = await countTotalTagAllYear();
      myCache.set("count-total-tag-all-year", data);
      res.send(data);
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

let arrName = []
router.get("/count-top-tag", async (req, res) => {
  try {
    let year = req.query.year;
    if (myCache.has("count-top-tag-" + String(year))) {
      return res.send(myCache.get("count-top-tag-" + String(year)));
    } else {
      const data = await countTopTag(year);
      //Lấy key của top tag
      for (let index = 0; index < data.length; index++) {
        arrName.push(data[index]._id.name)
      }
      myCache.set("count-top-tag-" + String(year), data);
      res.send(data);
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});
router.get("/count-tag-by-category-all-year", async (req, res) => {
  try {
    if (myCache.has("count-tag-by-category-all-year")) {
      return res.send(myCache.get("count-tag-by-category-all-year"));
    } else {
      const data = await countTagByCategoryAllYear();
      myCache.set("count-tag-by-category-all-year", data);
      res.send(data);
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});
function checkKeyword(key) {
  // var keySearch = ['Circle Of Blue', 'United States', 'Brett Walton', 'Water News', 'Jet Propulsion Laboratory', 'Goddard Space Flight Center'
  //   , 'North America', 'S. Geological Survey', 'J. Carl Ganter', 'U.S. Geological Survey', 'Great Lakes', 'Keith Schneider'
  //   , 'Codi Kozacek', 'New York', 'National Weather Service', 'Carl Ganter', 'Central Valley', '環境省', 'Environmental Protection Agency', 'United Nations'
  //   , 'North Carolina', 'Kaye Lafond', 'Water Policy & Politics', 'Colorado River', 'U.S. Environmental Protection Agency'];
  for (let i = 0; i < arrName.length; i++) {
    if (key === arrName[i]) {
      return true;
    }
  }
  return false;
}



module.exports = router;
