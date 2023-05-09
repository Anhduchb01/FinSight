const request = require("request");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { getArticleHasTag } = require('../../service/front-end/articleService')
const { getStatisticTag, getListTag, updateScoreTag, addTag, getEditTag } = require('../../service/front-end/tagService')
const { getListGenerateHistory, getListTagHistory, applyResultTagHistory, mergeResultTagHistory, getDataStatusCharSelectFilter, getListTagSame, getDataProcessTag, savePercentTagVerify, getPercentTagVerify } = require('../../service/admin/manageTag/manageTag.js')
const { createModel, listModel, deleteModel, updateModel, createModelDefault, listModelDefault,updateModelPlayGround  ,clearModelPlayGround} = require('../../service/admin/manageTag/modelTag.js');
const { ObjectID } = require("bson");
const Model = mongoose.model('Model')
var _ = require('lodash');

router.get("/admin/manage-tag", (req, res) => {
    res.render("admin/main/manage-tag", { title: 'Tag' });
});

// api GET: list tags
router.get("/tags", async (req, res) => {
    let data = await getListTag(req.query.charSelectFilter)
    res.send(data)
})

// api GET: get article which has tag 
router.get("/tags/article", async (req, res) => {
    let number = req.query.page || 1
    const articles = await getArticleHasTag(req.query.text, number);
    res.send(articles);
});

// api GET: statistic tag
router.get('/tags/stat', async (req, res) => {
    let total = await getStatisticTag()
    res.send(total)
})

router.get('/tags/save-edit-tag', async (req, res) => {
    let tagEdit = await getEditTag(req.query.tag, req.query.type, req.query.statusTag)
    res.send(tagEdit)
})

// api POST: create BERT model
router.post("/models/bert", async (req, res) => {
    console.log('oke create ner')
    let model = await createModel(req.body.time, req.body.name, req.body.idModelParent, req.body.sourceModel)
    res.send(model)
})

// api GET: list BERT model
router.get("/models/bert", async (req, res) => {
    let model = await listModel(req.query.sourceModel)
    res.send(model)
})

// api DELETE: remove BERT model with ID
router.delete("/models/bert/:id", async (req, res) => {
    await deleteModel(req.params.id)
    res.send({ "message": "model has been successfully" })
})

// api PUT: change BERT model name with ID
router.put("/models/bert/:id", async (req, res) => {
    await updateModel(req.params.id, req.body.name)
    res.send({ "message": "model has updated successfully" })
})

// api POST: create Default model
router.post("/models/lib", async (req, res) => {
    let message = await createModelDefault(req.body.sourceModel)
    res.send(message)
})

// api GET: list Default model
router.get("/models/lib", async (req, res) => {
    let data = await listModelDefault(req.query.sourceModel)
    res.send(data)
})

router.get("/tags/update-score-tag", async (req, res) => {
    let data = await updateScoreTag(req.query.tag, req.query.score)
    res.send(data)
})
router.get("/tags/add-tag", async (req, res) => {
    let data = await addTag(req.query.arrayAddTag)
    res.send(data)
})

router.get('/tags/get-list-model-generate-history', async (req, res) => {
    let data = await getListGenerateHistory()
    res.send(data)
})

router.get('/tags/get-list-tag-history', async (req, res) => {
    let data = await getListTagHistory(req.query.idModel, req.query.time, req.query.charSelectFilter)
    res.send(data)
})

router.get('/tags/apply-result-tag-history', async (req, res) => {
    let data = await applyResultTagHistory(req.query.idModel, req.query.time)
    res.send('finish')
})

router.get('/tags/merge-result-tag-history', async (req, res) => {
    let data = await mergeResultTagHistory(req.query.idModel, req.query.time)
    res.send('finish')
})

router.get('/tags/get-percent-tag-verify', async (req, res) => {
    let data = await getPercentTagVerify(req.query.pointVerify)
    res.send(data)
})

router.get('/tags/save-percent-tag-verify', async (req, res) => {
    let data = await savePercentTagVerify(req.query.pointVerify)
    res.send('finish')
})
router.get('/save-model-play-ground', async (req, res) => {
    let data = await updateModelPlayGround(req.query.idModel,req.query.language)
    res.send('finish')
})
router.get('/clear-model-play-ground', async (req, res) => {
    let data = await clearModelPlayGround(req.query.language, req.query.source)
    res.send('finish')
})

router.get('/tags/get-data-process-tag', async (req, res) => {
    let data = await getDataProcessTag(req.query.idModelOne, req.query.timeOne, req.query.idModelTwo, req.query.timeTwo)
    res.send(data)
})

router.get('/tags/get-status-char-select-filter', async (req, res) => {
    let data = await getDataStatusCharSelectFilter()
    res.send(data)
})

router.get('/tags/get-tag-same', async (req, res) => {
    let data = await getListTagSame(req.query.charSelectFilter, req.query.idModelOne, req.query.timeOne, req.query.idModelTwo, req.query.timeTwo)
    res.send(data)
})

// api GET: execute lib model 
router.get("/models/lib/execute", async (req, res) => {
    let result =request(`http://localhost:3001/process-tag/model-lib?language=${req.query.language}&page=waterportal`, async function (error, response, body) {
        if (error != null) {
            await Model.updateOne({ "name": req.query.name }, { "status": 0 })
        }
        console.log(body)
    })
    res.send('request execute cussess')
})
router.get("/models/ai/execute", async (req, res) => {
    let id = req.query.id
    request(`http://localhost:3001/process-tag/model-ai?language=${req.query.language}&id=${req.query.id}&time=${req.query.time}&page=waterportal`, async function (error, response, body) {
    if (error != null) {
            if (req.query.language === 'en') {
                if (id === 'default') { await Model.updateOne({ "name": 'AI NER Base (English)' }, { "status": 0 }) }
                else { await Model.updateOne({ "_id": ObjectID(id) }, { "status": 0 }) }
            }
            if (req.query.language === 'jp') {
                if (id === 'default') { await Model.updateOne({ "name": 'AI NER Base (Japanese)' }, { "status": 0 }) }
                else { await Model.updateOne({ "_id": ObjectID(id) }, { "status": 0 }) }
            }

        }
        console.log(body)
    })
    res.send('request execute cussess')
})
//evaluate model tag
router.get("/models/ai/evaluate", async (req, res) => {
    request(`http://localhost:3001/evaluate-tag/model-ai?language=${req.query.language}&id=${req.query.id}&page=waterportal`, async function (error, response, body) {
        if (error != null) {
            
                await Model.updateOne({ "_id": ObjectID(req.query.id) }, { "status": 0 }) 
            }

        res.send(body)
    })
})

// training model tag

router.get("/models/tag/training-model", async (req, res) => {
    await request(`http://localhost:3001/training-tag/model-ai?language=${req.query.language}&id=${req.query.id}&page=waterportal`, async function (error, response, body) {
        if (error) { await Model.updateOne({ "_id": ObjectID(req.query.id) }, { "status": 2 }) }
        console.log(body)
    })
    res.send('request train cussess')
})

// router.get('/get-article', async (req, res) => {
//     let number = req.query.page;
//     let totalPost = await Post.find({ "$and": [{ "languageCrawl": "en", "status": "0" }] }).count();
//     let postDisplay = await Post.find({ "$and": [{ "languageCrawl": "en", "status": "0" }] })
//         .limit(8)
//         .skip((number - 1) * 8);
//     let arrDataPost = [postDisplay, totalPost];
//     res.send(arrDataPost)
// })

module.exports = router;
