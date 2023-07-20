const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Crawler = mongoose.model("Crawler");
const Logger = mongoose.model("Logger");
const ConfigCrawler = mongoose.model("ConfigCrawler");
const ConfigCrawlerPDFs = mongoose.model("ConfigCrawlerPDF");
const ConfigDefaultCrawler = mongoose.model("ConfigDefaultCrawler");
const Post = mongoose.model("Post");
const KeywordCrawler = mongoose.model("KeywordCrawler");
const Report = mongoose.model("Report")
const axios = require("axios");
var dayjs = require("dayjs");
const scheduleCrawler = require("../../service/admin/scheduleCrawler")
router.get("/admin/crawler", (req, res) => {
  res.render("admin/main/crawler", { title: 'Crawler' });
});
// Crawl By Website
router.post("/crawpage-cafef", async (req, res) => {
  let config = await ConfigCrawler.find({ "namePage": "cafef" });
  await Crawler.updateOne(
    { addressPage: "cafef" },
    {
      $set: {
        statusPageCrawl: "Pending",
      },
    }
  );
  let crawler = await Crawler.find({ "addressPage": "cafef" });
  const data = {
    "last_date": crawler[0].dateLastCrawler,
    "number_page_query": config[0].number_page_query,
    "article_url_query": config[0].article_url_query,
    "title_query": config[0].title_query,
    "timeCreatePostOrigin_query": config[0].timeCreatePostOrigin_query,
    "category_query": config[0].category_query,
    "author_query": config[0].author_query,
    "content_title_query": config[0].content_title_query,
    "content_des_query": config[0].content_des_query,
    "content_html_title_query": config[0].content_html_title_query,
    "content_html_des_query": config[0].content_html_des_query,
    "image_url_query": config[0].image_url_query
  }
  
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-CA').format(currentDate); // format date as "Y-M-D"
  const [year, month, day] = formattedDate.split('-'); // split date into year, month, and day
  const Date_now = `${year}/${month}/${day}`; // reformat date as "Y/M/D"

  try {
    axios.post("http://127.0.0.1:5000/crawl/cafef", data).then(async (response) => {
      console.log("Request cafef successful!");
      let msg = response.data
      console.log({ "msg": msg })
      if (msg == 'Success') {
        saveLogAction('cafef', 'Success')
        await Crawler.updateOne(
          { addressPage: "cafef" },
          {
            $set: {
              statusPageCrawl: "Success",
              dateLastCrawler: Date_now,
            },
          }
        );
      } else {
        saveLogAction('cafef', 'Error', msg)
        await Crawler.updateOne(
          { addressPage: "cafef" },
          {
            $set: {
              statusPageCrawl: "Error",
              dateLastCrawler: Date_now,
            },
          }
        );
      }
    })
      .catch(async (error) => {
        console.log(error.response.data.error)
        saveLogAction('cafef', 'Error', error.response.data.error)
        await Crawler.updateOne(
          { addressPage: "cafef" },
          {
            $set: {
              statusPageCrawl: "Error",
              dateLastCrawler: Date_now,
            },
          }
        );
      });

  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status);
    } else {
      console.log(error.message);
    }
    saveLogAction('cafef', 'Error', error.message)
    await Crawler.updateOne(
      { addressPage: "cafef" },
      {
        $set: {
          statusPageCrawl: "Error",
          dateLastCrawler: Date_now,
        },
      }
    );
  }
  
  let result = "Request Crawl CafeF successfull"
  res.send({ "msg": result })
});
router.post("/crawpage-cafefpdf", async (req, res) => {
  let config = await ConfigCrawlerPDFs.find({ "namePage": "cafefpdf" });
  await Crawler.updateOne(
    { addressPage: "cafefpdf" },
    {
      $set: {
        statusPageCrawl: "Pending",
      },
    }
  );
  let crawler = await Crawler.find({ "addressPage": "cafefpdf" });
  const data = {
    "last_date": crawler[0].dateLastCrawler,
    "number_page_query": config[0].number_page_query,
    "article_url_query": config[0].article_url_query,
    "article_url_query1": config[0].article_url_query1,
    "title_query": config[0].title_query,
    "timeCreatePostOrigin_query": config[0].timeCreatePostOrigin_query,
    "source": config[0].source,
    "number_CK": config[0].number_CK,
    "id_pdf": config[0].id_pdf,
  }
  

  
  try {
    axios.post("http://127.0.0.1:5000/crawl/cafefpdf", data).then(async (response) => {
      console.log("Request cafefpdf successful!");
      let msg = response.data
      console.log({ "msg": msg })
      if (msg == 'Success') {
        saveLogAction('cafefpdf', 'Success')
        await Crawler.updateOne(
          { addressPage: "cafefpdf" },
          {
            $set: {
              statusPageCrawl: "Success",
            },
          }
        );
      } else {
        saveLogAction('cafefpdf', 'Error', msg)
        await Crawler.updateOne(
          { addressPage: "cafefpdf" },
          {
            $set: {
              statusPageCrawl: "Error",
            },
          }
        );
      }
    })
      .catch(async (error) => {
        console.log(error.response.data.error)
        console.log(error.response.data.error)
        saveLogAction('cafefpdf', 'Error', error.response.data.error)
        await Crawler.updateOne(
          { addressPage: "cafefpdf" },
          {
            $set: {
              statusPageCrawl: "Error",
            },
          }
        );
      });

  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status);
    } else {
      console.log(error.message);
    }
    saveLogAction('cafef', 'Error', error.message)
    await Crawler.updateOne(
      { addressPage: "cafef" },
      {
        $set: {
          statusPageCrawl: "Error",
          dateLastCrawler: Date_now,
        },
      }
    );
  }
  
  let result = "Request Crawl CafeF successfull"
  res.send({ "msg": result })
});
router.post("/crawpage-cafebiz", async (req, res) => {
  let config = await ConfigCrawler.find({ "namePage": "cafebiz" });
  await Crawler.updateOne(
    { addressPage: "cafebiz" },
    {
      $set: {
        statusPageCrawl: "Pending",
      },
    }
  );
  let crawler = await Crawler.find({ "addressPage": "cafebiz" });
  const data = {
    "last_date": crawler[0].dateLastCrawler,
    "number_page_query": config[0].number_page_query,
    "article_url_query": config[0].article_url_query,
    "title_query": config[0].title_query,
    "timeCreatePostOrigin_query": config[0].timeCreatePostOrigin_query,
    "category_query": config[0].category_query,
    "author_query": config[0].author_query,
    "content_title_query": config[0].content_title_query,
    "content_des_query": config[0].content_des_query,
    "content_html_title_query": config[0].content_html_title_query,
    "content_html_des_query": config[0].content_html_des_query,
    "image_url_query": config[0].image_url_query
  }
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-CA').format(currentDate); // format date as "Y-M-D"
  const [year, month, day] = formattedDate.split('-'); // split date into year, month, and day
  const Date_now = `${year}/${month}/${day}`; // reformat date as "Y/M/D"
  try {
    axios.post("http://127.0.0.1:5000/crawl/cafebiz", data).then(async (response) => {
      console.log("Request cafebiz successful!");
      let msg = response.data
      console.log({ "msg": msg })
      if (msg == 'Success') {
        saveLogAction('cafebiz', 'Success')
        await Crawler.updateOne(
          { addressPage: "cafebiz" },
          {
            $set: {
              statusPageCrawl: "Success",
              dateLastCrawler: Date_now,
            },
          }
        );
      } else {
        saveLogAction('cafebiz', 'Error', msg)
        await Crawler.updateOne(
          { addressPage: "cafebiz" },
          {
            $set: {
              statusPageCrawl: "Error",
              dateLastCrawler: Date_now,
            },
          }
        );
      }
    })
      .catch(async (error) => {
        console.log(error.response.data.error)
        console.log(error.response.data.error)
        saveLogAction('cafebiz', 'Error', error.response.data.error)
        await Crawler.updateOne(
          { addressPage: "cafebiz" },
          {
            $set: {
              statusPageCrawl: "Error",
              dateLastCrawler: Date_now,
            },
          }
        );
      });
  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status);
    } else {
      console.log(error.message);
    }
    saveLogAction('cafebiz', 'Error', error.message)
    await Crawler.updateOne(
      { addressPage: "cafebiz" },
      {
        $set: {
          statusPageCrawl: "Error",
          dateLastCrawler: Date_now,
        },
      }
    );
  }
  let result = "Request Crawl CafeBiz successfull"
  res.send({ "msg": result })
});
router.post("/crawpage-baodautu", async (req, res) => {
  let config = await ConfigCrawler.find({ "namePage": "baodautu" });
  await Crawler.updateOne(
    { addressPage: "baodautu" },
    {
      $set: {
        statusPageCrawl: "Pending",
      },
    }
  );
  let crawler = await Crawler.find({ "addressPage": "baodautu" });
  const data = {
    "last_date": crawler[0].dateLastCrawler,
    "number_page_query": config[0].number_page_query,
    "article_url_query": config[0].article_url_query,
    "title_query": config[0].title_query,
    "timeCreatePostOrigin_query": config[0].timeCreatePostOrigin_query,
    "category_query": config[0].category_query,
    "author_query": config[0].author_query,
    "content_title_query": config[0].content_title_query,
    "content_des_query": config[0].content_des_query,
    "content_html_title_query": config[0].content_html_title_query,
    "content_html_des_query": config[0].content_html_des_query,
    "image_url_query": config[0].image_url_query
  }
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-CA').format(currentDate); // format date as "Y-M-D"
  const [year, month, day] = formattedDate.split('-'); // split date into year, month, and day
  const Date_now = `${year}/${month}/${day}`; // reformat date as "Y/M/D"
  try {
    axios.post("http://127.0.0.1:5000/crawl/baodautu", data)
      .then(async (response) => {
        console.log("Request baodautu successful!");
        let msg = response.data
        console.log({ "msg": msg })
        if (msg == 'Success') {
          saveLogAction('baodautu', 'Success')
          await Crawler.updateOne(
            { addressPage: "baodautu" },
            {
              $set: {
                statusPageCrawl: "Success",
                dateLastCrawler: Date_now,
              },
            }
          );
        } else {
          saveLogAction('baodautu', 'Error', msg)
          await Crawler.updateOne(
            { addressPage: "baodautu" },
            {
              $set: {
                statusPageCrawl: "Error",
                dateLastCrawler: Date_now,
              },
            }
          );
        }
      })
      .catch(async (error) => {
        console.log(error.response.data.error)
        console.log(error.response.data.error)
        saveLogAction('baodautu', 'Error', error.response.data.error)
        await Crawler.updateOne(
          { addressPage: "baodautu" },
          {
            $set: {
              statusPageCrawl: "Error",
              dateLastCrawler: Date_now,
            },
          }
        );
      });
  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status);
    } else {
      console.log(error.message);
    }
    saveLogAction('baodautu', 'Error', error.message)
    await Crawler.updateOne(
      { addressPage: "baodautu" },
      {
        $set: {
          statusPageCrawl: "Error",
          dateLastCrawler: Date_now,
        },
      }
    );
  }
  let result = "Request Crawl baodautu successfull"
  res.send({ "msg": result })
});
router.post("/crawpage-vneconomy", async (req, res) => {
  let config = await ConfigCrawler.find({ "namePage": "vneconomy" });
  await Crawler.updateOne(
    { addressPage: "vneconomy" },
    {
      $set: {
        statusPageCrawl: "Pending",
      },
    }
  );
  let crawler = await Crawler.find({ "addressPage": "vneconomy" });
  const data = {
    "last_date": crawler[0].dateLastCrawler,
    "number_page_query": config[0].number_page_query,
    "article_url_query": config[0].article_url_query,
    "title_query": config[0].title_query,
    "timeCreatePostOrigin_query": config[0].timeCreatePostOrigin_query,
    "category_query": config[0].category_query,
    "author_query": config[0].author_query,
    "content_title_query": config[0].content_title_query,
    "content_des_query": config[0].content_des_query,
    "content_html_title_query": config[0].content_html_title_query,
    "content_html_des_query": config[0].content_html_des_query,
    "image_url_query": config[0].image_url_query
  }
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-CA').format(currentDate); // format date as "Y-M-D"
  const [year, month, day] = formattedDate.split('-'); // split date into year, month, and day
  const Date_now = `${year}/${month}/${day}`; // reformat date as "Y/M/D"
  try {
    axios.post("http://127.0.0.1:5000/crawl/vneconomy", data)
      .then(async (response) => {
        console.log("Request vneconomy successful!");
        let msg = response.data
        console.log({ "msg": msg })
        if (msg == 'Success') {
          saveLogAction('vneconomy', 'Success')
          await Crawler.updateOne(
            { addressPage: "vneconomy" },
            {
              $set: {
                statusPageCrawl: "Success",
                dateLastCrawler: Date_now,
              },
            }
          );
        } else {
          saveLogAction('vneconomy', 'Error', msg)
          await Crawler.updateOne(
            { addressPage: "vneconomy" },
            {
              $set: {
                statusPageCrawl: "Error",
                dateLastCrawler: Date_now,
              },
            }
          );
        }
      })
      .catch(async (error) => {
        console.log(error.response.data.error)
        console.log(error.response.data.error)
        saveLogAction('vneconomy', 'Error', error.response.data.error)
        await Crawler.updateOne(
          { addressPage: "vneconomy" },
          {
            $set: {
              statusPageCrawl: "Error",
              dateLastCrawler: Date_now,
            },
          }
        );
      });
  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status);
    } else {
      console.log(error.message);
    }
    saveLogAction('vneconomy', 'Error', error.message)
    await Crawler.updateOne(
      { addressPage: "vneconomy" },
      {
        $set: {
          statusPageCrawl: "Error",
          dateLastCrawler: Date_now,
        },
      }
    );
  }
  let result = "Request Crawl vneconomy successfull"
  res.send({ "msg": result })

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
    if(urlPageCrawl=='cafefpdf'){
      await Report.find(
        {},
        async (err, docs) => {
          if (!err) {
            await Crawler.updateOne(
              { addressPage: urlPageCrawl },
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

    }
    else{
       //post success
      await Post.find(
        {
          urlPageCrawl: urlPageCrawl,
          status: '0',
        },
        async (err, docs) => {
          if (!err) {
            await Crawler.updateOne(
              { addressPage: urlPageCrawl },
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
          status: '1',
        },
        async (err, docs) => {
          if (!err) {
            await Crawler.updateOne(
              { addressPage: urlPageCrawl },
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
          status: '2',
        },
        async (err, docs) => {
          if (!err) {
            await Crawler.updateOne(
              { addressPage: urlPageCrawl },
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
    
  }

  await Crawler.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
router.get("/crawler-pdf-information", async (req, res) => {
  await Crawler.find({type:"pdf"}, (err, docs) => {
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
router.get("/get-data-edit-pdf", (req, res) => {
  ConfigCrawlerPDFs.find({}, (err, docs) => {
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
  for (let i = 0; i < objDataEdit.timeSchedule.length; i++) {
    objDataEdit.timeSchedule[i].hour = objDataEdit.timeSchedule[i].hour || []
    if (objDataEdit.timeSchedule[i].hour.length !== 0) objDataEdit.timeSchedule[i].hour.map(j => Number(j))
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
        number_page_query: objDataEdit.number_page_query,
        article_url_query: objDataEdit.article_url_query,
        title_query: objDataEdit.title_query,
        timeCreatePostOrigin_query: objDataEdit.timeCreatePostOrigin_query,
        category_query: objDataEdit.category_query,
        author_query: objDataEdit.author_query,
        content_title_query: objDataEdit.content_title_query,
        content_des_query: objDataEdit.content_des_query,
        // content_html_title_query: objDataEdit.content_html_title_query,
        // content_html_des_query: objDataEdit.content_html_des_query,
        image_url_query: objDataEdit.image_url_query,
      },
    }
  );
  scheduleCrawler(objDataEdit)
  res.send("success edit config");
});

router.post("/save-edit-crawl-pdf", async (req, res) => {
  let objDataEdit = req.body.objDataEdit;
  for (let i = 0; i < objDataEdit.timeSchedule.length; i++) {
    objDataEdit.timeSchedule[i].hour = objDataEdit.timeSchedule[i].hour || []
    if (objDataEdit.timeSchedule[i].hour.length !== 0) objDataEdit.timeSchedule[i].hour.map(j => Number(j))
  }
  await ConfigCrawlerPDFs.updateOne(
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
        number_page_query: objDataEdit.number_page_query,
        article_url_query: objDataEdit.article_url_query,
        title_query: objDataEdit.title_query,
        timeCreatePostOrigin_query: objDataEdit.timeCreatePostOrigin_query,
        source: objDataEdit.source,
        number_CK: objDataEdit.number_CK,
        id_pdf: objDataEdit.id_pdf,
      },
    }
  );
  scheduleCrawler(objDataEdit)
  res.send("success edit pdf config");
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

function saveLogAction(page, action, message) {
  let timeCrawlPage = dayjs().format("YYYY/MM/DD h:mm:ss");
  let stringMessage = "";
  if (message === null || message == '') {
    if (action === "Create") stringMessage = "Start Crawler Page :";
    if (action === "Success") stringMessage = "Crawler Success :";
  } else {
    if (action === "Error") stringMessage = message.replace(/['"()]/g, '');
  }
  var logger = new Logger();
  logger.status = action;
  logger.page = page;
  logger.message = stringMessage;
  logger.timelog = timeCrawlPage;
  logger.save();
}

module.exports = router;
