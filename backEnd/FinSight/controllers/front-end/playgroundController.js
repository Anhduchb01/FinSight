
const request = require("request");
const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const multiLanguageSelect = require("../../service/front-end/multiLanguage");
const { getModelPlayGround } = require('../../service/front-end/playGround');
const { getListContactSpam } = require("../../service/admin/contact/contactService");
const Model = mongoose.model('Model')
const dotenv = require('dotenv');
dotenv.config();
router.get("/playground/", async (req, res) => {
  let language = req.cookies.language || "en";
  let multiLanguage = multiLanguageSelect(language);
  res.render("information-frontend/main/playground", {
    language,
    multiLanguage,
    layout: './information-frontend/layouts/container'
  });
});

// predict tags lib 
router.post("/playground/predict-tags-lib", async (req, res) => {
  try {
    await request.post({ url: '${process.env.API_URL}/predict-tag/model-lib', json: true, form: { language: req.body.language, text: req.body.text, page: "waterportal" } }, async function (error, response, body) {

      if (error != null) {
        // await Model.updateOne({ "name": req.query.name }, { "status": 0 })
      }
      res.send(body)
    })
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
})
// predict tag ai
router.post("/playground/predict-tags-ai", async (req, res) => {
  try {
    let model = await Model.find({ "language": req.body.language, "source": "tag", 'isPlayGround': 1 })

    if (model[0].isSystem == 0) {
      if (model[0].name == "AI NER Base (English)") {
        await request.post({ url: '${process.env.API_URL}/predict-tag/model-ai', json: true, form: { id: 'defaultEN', time: model[0].time, language: req.body.language, text: req.body.text, page: "waterportal" } }, async function (error, response, body) {
          // await Model.updateOne({ "name": req.query.name }, { "status": 0 })

          res.send(body)

        })
      }
      else {
        if (model[0].name == "AI NER Base (English)") {
          await request.post({ url: '${process.env.API_URL}/predict-tag/model-ai', json: true, form: { id: 'defaultJP', time: model[0].time, language: req.body.language, text: req.body.text, page: "waterportal" } }, async function (error, response, body) {

            if (error != null) {
              // await Model.updateOne({ "name": req.query.name }, { "status": 0 })
            }
            res.send(body)
          })
        }
      }
    } else {
      await request.post({ url: '${process.env.API_URL}/predict-tag/model-ai', json: true, form: { id: model[0].id, time: model[0].time, language: req.body.language, text: req.body.text, page: "waterportal" } }, async function (error, response, body) {
        if (error != null) {
          // await Model.updateOne({ "name": req.query.name }, { "status": 0 })

        }
        res.send(body)
      })
    }
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
})


// predict classification post
router.post("/playground/predict-classification-ai", async (req, res) => {
  try {
    let model = await Model.find({ "language": req.body.language, "source": "classification", 'isPlayGround': 1 })
    await request.post({ url: '${process.env.API_URL}/predict-classification/model-ai', json: true, form: { id: model[0].id, time: model[0].time, language: req.body.language, text: req.body.text, page: "waterportal" } }, async function (error, response, body) {
      if (error != null) {
        // await Model.updateOne({ "name": req.query.name }, { "status": 0 })
      }
      res.send(body)
    })
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
})

// get model play ground 
router.get("/playground/get-model-playground", async (req, res) => {
  try {
    let model = await getModelPlayGround(req.query.language)
    res.send(model)
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
})
module.exports = router;
