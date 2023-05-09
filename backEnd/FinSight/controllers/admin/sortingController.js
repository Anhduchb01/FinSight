const request = require("request");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Sorting = mongoose.model("Sorting");
const { configValueSorting ,queryArticle,valueTotalSeenPage} = require('../../service/admin/sorting/sorting')


router.get("/admin/sorting", (req, res) => {
    res.render("admin/main/sorting", { title: 'Sorting' });
});

router.get("/sorting/get-data-config-sorting", async (req, res) => {
    let data = await Sorting.find({})
    res.send(data)
});


router.get("/sorting/article-see-more", async (req, res) => {

    let percentLaster = req.query.percentLaster;
    percentLaster = Number(percentLaster)
    let percentViewed = req.query.percentViewed;
    let pointDecreasePerDay = req.query.pointDecreasePerDay;
    let pointIncreasePerView = req.query.pointIncreasePerView;
    let pointRequiredForTag = req.query.pointRequiredForTag;
    let viewRequiredForTag = req.query.viewRequiredForTag;
    let array = await queryArticle(percentLaster,percentViewed,pointDecreasePerDay,pointIncreasePerView,pointRequiredForTag,viewRequiredForTag)
    res.send(array)

});

router.get("/sorting/config-value-sorting", async (req, res) => {
    let percentLaster = req.query.percentLaster;
    let percentViewed = req.query.percentViewed;
    let pointDecreasePerDay = req.query.pointDecreasePerDay;
    let pointIncreasePerView = req.query.pointIncreasePerView;
    let pointRequiredForTag = req.query.pointRequiredForTag;
    let viewRequiredForTag = req.query.viewRequiredForTag;
    let data = await configValueSorting(percentLaster, percentViewed, pointDecreasePerDay, pointIncreasePerView, pointRequiredForTag, viewRequiredForTag)
    res.send('finish')
});
router.get("/sorting/get-data-sum-seen-page", async (req, res) => {
    let data = await valueTotalSeenPage()
    res.send(data)
});


module.exports = router;
