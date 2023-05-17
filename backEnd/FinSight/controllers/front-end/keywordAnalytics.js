const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const { generateWordCloud, generateDataByYear, countTotalTagAllYear, countTopTag, countTagByCategoryAllYear } = require("../../service/front-end/analyticTagService");
const { getArticleHasTag, getYearArray } = require("../../service/front-end/articleService");
const multiLanguageSelect = require("../../service/front-end/multiLanguage");
const apicache = require('apicache')
const Sorting = mongoose.model("Sorting");

let cache = apicache.middleware

router.get("/keyword-analytics/", async (req, res) => {
  let language = req.cookies.language || "en";
  let multiLanguage = multiLanguageSelect(language);
  res.render("information-frontend/main/keyword-analysis", {
    language,
    multiLanguage,
    layout: './information-frontend/layouts/container',
  });
});
router.get("/keyword-search", async (req, res) => {
  let dataConfigSort = await Sorting.find({})
  let pointRequiredForTag = dataConfigSort[0].pointRequiredForTag;
  let viewRequiredForTag = dataConfigSort[0].viewRequiredForTag;
  let language = req.cookies.language || "en";
  let objData = req.query.objData;
  let number = objData.page;
  let key = objData.key;
  if (key === "") {
    let postDisplay = [];
    let arrDataPost = [postDisplay, 0];
    res.send([arrDataPost, pointRequiredForTag, viewRequiredForTag]);
  } else {
    //check xem dữ liệu đã có trong cache chưa 
    if (checkKeyword(key) == true && myCache.has(key) && myCache.has((key + "1"))) {
      // console.log("sucssesfully")
      res.send([myCache.get(key),myCache.get((key+"1")),myCache.get((key+"2"))]);
    } else {
      let totalPost = await Post.find({
        // languageCrawl: language,
        description: { $regex: key, $options: "i" },
        status: '0',
      });
      let postDisplay = await Post.find({
        // languageCrawl: language,
        description: { $regex: key, $options: "i" },
        status: '0',
      })
        .sort({ timeCrawlPage: -1 })
        .limit(8)
        .skip((number - 1) * 8);
      let arrDataPost = [postDisplay, totalPost.length];
      //if nó trong top 25 key word thì lưu vào cache
      if(checkKeyword(key) == true){
        myCache.set(key,arrDataPost);
        myCache.set((key+"1"),pointRequiredForTag)
        myCache.set((key+"2"),viewRequiredForTag)
      } 
      // console.log("fail ")     
      res.send([arrDataPost, pointRequiredForTag, viewRequiredForTag]);
    }
  }
});

router.get("/word-cloud?", async (req, res) => {
  if (myCache.has("word-cloud")) {
    // console.log("load node -cache")
    res.send(myCache.get("word-cloud"));
  } else {
    // console.log("load db")
    year = req.query.year || "2021";
    const data = await generateWordCloud(year);
    myCache.set("word-cloud", data);
    res.send(data);
  }
});

router.get("/get-article-has-tag", async (req, res) => {
  if (myCache.has("get-article-has-tag")) {
    return res.send(myCache.get("get-article-has-tag"));
  } else {
    let text = req.query.text;
    const articles = await getArticleHasTag(text);
    myCache.set("get-article-has-tag", articles)
    return res.send(articles);
  }
});

router.get("/year-array", async (req, res) => {
  if (myCache.has("year-array")) {
    return res.send(myCache.get("year-array"));
  } else {
    const data = await getYearArray();
    myCache.set("year-array", data);
    res.send(data);
  }
});

router.get("/generate-data-year", async (req, res) => {
  let year = req.query.year;
  if (myCache.has("generate-data-year")) {
    return res.send(myCache.get("generate-data-year"));
  } else {
    let data = await generateDataByYear(year);
    myCache.set("generate-data-year", data);
    res.send(data);
  }
})
router.get("/count-total-tag-all-year", async (req, res) => {
  if (myCache.has("count-total-tag-all-year")) {
    return res.send(myCache.get("count-total-tag-all-year"));
  } else {
    const data = await countTotalTagAllYear();
    myCache.set("count-total-tag-all-year", data);
    res.send(data);
  }
});

let arrName = []
router.get("/count-top-tag", async (req, res) => {
  if (myCache.has("count-top-tag")) {
    return res.send(myCache.get("count-top-tag"));
  } else {
    let year = req.query.year;
    const data = await countTopTag(year);
    //Lấy key của top tag
    for(let index = 0 ; index < data.length;index++){
      arrName.push(data[index]._id.name)
    }
      myCache.set("count-top-tag", data);
    res.send(data);
  }
});
router.get("/count-tag-by-category-all-year", async (req, res) => {
  if (myCache.has("count-tag-by-category-all-year")) {
    return res.send(myCache.get("count-tag-by-category-all-year"));
  } else {
    const data = await countTagByCategoryAllYear();
    myCache.set("count-tag-by-category-all-year", data);
    res.send(data);
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