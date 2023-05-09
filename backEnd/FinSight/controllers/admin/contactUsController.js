const express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const schedule = require("node-schedule");
var moment = require("moment");
const contactService = require("../../service/admin/contact/contactService");
const auth = require("../../middleware");

//get list contact
router.get("/admin/contact-us", (req, res) => {
  res.render("admin/main/contact-us",{ title: 'Contact Us'});
});

router.get("/admin/contact-us/:id", (req, res) => {
  res.render("admin/main/contact-us",{ title: 'Contact Us'});
});

// get contact detail
router.get("/mail-detail/:id", async (req, res) => {
  var id = req.params.id;
  const result = await contactService.getContactById(id);
  if (result) {
    res.send(result);
  } else{
    res.send('Not Found')
  }
});

// mark as read
router.post("/mark-as-read", async (req, res) => {
  var arrayId = req.body.data;
  const result = await contactService.markAsRead(arrayId);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});
//mark to unread
router.post("/mark-as-unread", async (req, res) => {
  var arrayId = req.body.data;
  const result = await contactService.markAsUnRead(arrayId);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});

//move - to - trash
router.post("/move-to-trash", async (req, res) => {
  var arrayId = req.body.data;
  const result = await contactService.moveToTrash(arrayId);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});
//mark-to-spam
router.post("/move-to-spam", async (req, res) => {
  var arrayId = req.body.data;
  const result = await contactService.moveToSpam(arrayId);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});
//get contact spam
router.get("/contact-spam", async (req, res) => {
  let data = req.query.data;
  const result = await contactService.getListContactSpam(data);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});

router.get("/list-contact", async (req, res) => {
  let data = req.query.data;
  const result = await contactService.getListContactInbox(data);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});
//get contact trash
router.get("/contact-trash", async (req, res) => {
  let data = req.query.data;
  const result = await contactService.getListContactTrash(data);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});

//mark to unread
router.post("/delete-trash", async (req, res) => {
  var arrayId = req.body.data;
  const result = await contactService.DeletePermanentlyTrash(arrayId);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});

//revive contact:
router.post("/revive-trash", async (req, res) => {
  var arrayId = req.body.data;
  const result = await contactService.ReviveMailTrash(arrayId);
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});
//get contact thong bao
router.get("/contact-notification", async (req, res) => {
  const result = await contactService.GetListContactNotification();
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});

router.get("/count-contact-notification", async (req, res) => {
  const result = await contactService.GetCountNotification();
  if (result) {
    res.status(200).json(result);
  } else{
    res.send('0')
  }
});

router.get("/get-count-unread", async (req, res) => {
  const result = await contactService.getCountUnreadContact();
  if (result) {
    res.send(result);
  } else{
    res.send('error')
  }
});

// const job = schedule.scheduleJob("0 15 0 * * *",async function () {
//   let day = moment().subtract(1, "days").format("YYYY/MM/DD HH:mm:ss");
//   const result = await contactService.deleteTrashAfterDays(day);
//   if (result) {
//     console.log(result+' was delete after 30 days');
//   } else{
//     res.send('error')
//   }
// });


module.exports = router;
