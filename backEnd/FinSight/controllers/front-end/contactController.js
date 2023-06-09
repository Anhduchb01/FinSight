const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const multiLanguageSelect = require("../../service/front-end/multiLanguage");
const contacts = mongoose.model("Contacts");
const axios = require("axios");
const secret = "6Lf4oewaAAAAAE9yVh78rz9uhBViXK2cO1E7Yvmn";
var dayjs = require("dayjs");
var xss = require("xss");
const { getArticleHasTag, getYearArray } = require("../../service/front-end/articleService");
const Tagmap = mongoose.model("Tagmap");


router.get("/test-tree", (req, res) => {
  try {
    let language = req.cookies.language || "en";
    let multiLanguage = multiLanguageSelect(language);
    res.render("information-frontend/main/testTree", { language, multiLanguage, layout: './information-frontend/layouts/container' });
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

router.get("/contacts", (req, res) => {
  try {
    let language = req.cookies.language || "en";
    let multiLanguage = multiLanguageSelect(language);
    res.render("information-frontend/main/contacts", { language, multiLanguage, layout: './information-frontend/layouts/container' });
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});

function Sanitizing(htmlString) {
  var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
  return xss(stripedHtml);
}
//post contact form
router.post("/post-contacts", (req, res) => {
  try {
    if (!xss(req.body.captcha)) {
      return res.json({
        success: false,
        message: "Undefined !",
      });
    }
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.captcha}&remoteip=${req.ip}`;
    axios.get(verifyUrl).then((response) => {
      const data = response.data;
      if (!data.success) {
        return res.json({
          success: false,
          message: "Server Google captcha error.Please try again",
        });
      } else {
        let statusOfSpam = false;
        if (data.score < 0.5) {
          statusOfSpam = true;
        }
        var Contacts = new contacts();
        let timeCreate = dayjs().format("YYYY/MM/DD HH:mm:ss");
        Contacts.customerName = Sanitizing(req.body.name);
        Contacts.customerEmail = Sanitizing(req.body.email);
        Contacts.customerPhone = Sanitizing(req.body.phone);
        Contacts.customerMsg = Sanitizing(req.body.msg);
        Contacts.customerSub = Sanitizing(req.body.subject);
        Contacts.timeCreateContacts = timeCreate;
        Contacts.scoreCaptcha = data.score * 10;
        Contacts.status = true;
        Contacts.statusSpam = statusOfSpam;
        Contacts.statusTrash = false;

        Contacts.save()
          .then((contact) => {
            return res.status(201).json({
              success: true,
              message: "Thanks for contacting us",
              Contact: contact,
              score: data.score,
            });
          })
          .catch((error) => {
            res.status(500).json({
              success: false,
              message: "Server error. Please try again.",
              error: error.message,
              score: data.score,
            });
          });
      }
    }),
      (error) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: error.message,
        });
      };
  } catch (err) {
    console.log(err)
    res.status(502).send(err.message);
  }
});


module.exports = router;
