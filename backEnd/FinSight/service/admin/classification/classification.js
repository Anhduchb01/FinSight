const mongoose = require("mongoose");
const Model = mongoose.model('Model')
const Post = mongoose.model("Post");
const { ObjectID } = require("bson");
const dayjs = require('dayjs')
const request = require("request");
const HistoryClassification = mongoose.model('HistoryClassification')
const { resolve } = require("path");

async function getListArticle(number,language) {
    let totalPost = await Post.find({ status: '0', isClassification: true  },
        (err, docs) => {
            if (!err) {
            } else {
                console.log("Error in retrieving employee list :" + err);
            }
        }
    )
    let totalPostLanguage = await Post.find({ status: '0', isClassification: true ,languageCrawl:language },
        (err, docs) => {
            if (!err) {
            } else {
                console.log("Error in retrieving employee list :" + err);
            }
        }
    )
    
    let allPost = await Post.find({ status: '0', isClassification: true ,languageCrawl:language},
        (err, docs) => {
            if (!err) {
            } else {
                console.log("Error in retrieving employee list :" + err);
            }
        }
    ).skip((number - 1) * 10).limit(10).sort({ _id: 1 });


    return [totalPost.length, allPost,totalPostLanguage.length]
}
async function getDataFlowChart() {
    let postSuccess = await Post.aggregate([
        { "$match": { status: '0' } },
        { "$group": { _id: "$urlPageCrawl", count: { $sum: 1 } } }
    ])
    let postPending = await Post.aggregate([
        { "$match": { status: '1' } },
        { "$group": { _id: "$urlPageCrawl", count: { $sum: 1 } } }
    ])
    let postSkip = await Post.aggregate([
        { "$match": { status: '2' } },
        { "$group": { _id: "$urlPageCrawl", count: { $sum: 1 } } }
    ])
    let arrColorDefault = [
        { from: "", to: "Success", nodeColor: "#009688" },
        // { from: "", to: "Skip", nodeColor: "#e2a03f" },
        { from: "", to: "Error", nodeColor: "#e7515a" },
        { from: "", to: "News", nodeColor: "#79db72" },
        { from: "", to: "Event", nodeColor: "#578ef7" },
        { from: "", to: "Publications", nodeColor: "#00dde1" },
        { from: "", to: "Other", nodeColor: "#a259cb" },
        { from: "", to: "Un-process", nodeColor: "#68666a" },
    ]
    for (let j = 0; j < postSuccess.length; j++) {

        postSuccess[j].from = postSuccess[j]._id
        delete postSuccess[j]._id
        postSuccess[j].to = 'Success'
        postSuccess[j].value = postSuccess[j].count
        delete postSuccess[j].count
        if (postSuccess[j].from === 'addressgsi') {
            postSuccess[j].nodeColor = '#67b7dc'
            postSuccess[j].linkColor = '#67b7dc'
            postSuccess[j].from = 'gsj.jp'
            postSuccess[j].textTip = 'gsj.jp'

        }
        if (postSuccess[j].from === 'addressenv') {
            postSuccess[j].nodeColor = '#a367dc'
            postSuccess[j].linkColor = '#a367dc'
            postSuccess[j].from = 'env.go.jp'
            postSuccess[j].textTip = 'env.go.jp'


        }
        if (postSuccess[j].from === 'addresscob') {
            postSuccess[j].nodeColor = '#dc67ce'
            postSuccess[j].linkColor = '#dc67ce'
            postSuccess[j].from = 'circleofblue.org'
            postSuccess[j].textTip = 'circleofblue.org'

        }
        if (postSuccess[j].from === 'addressusgs') {
            postSuccess[j].nodeColor = '#dc6788'
            postSuccess[j].linkColor = '#dc6788'
            postSuccess[j].from = 'waterdata.usgs.gov'
            postSuccess[j].textTip = 'circleofblue.org'

        }
        if (postSuccess[j].from === 'addressnasa') {
            postSuccess[j].nodeColor = '#dc8c67'
            postSuccess[j].linkColor = '#dc8c67'
            postSuccess[j].from = 'nasa.gov'
            postSuccess[j].textTip = 'nasa.gov'

        }
    }

    for (let q = 0; q < postPending.length; q++) {
        postPending[q].from = postPending[q]._id
        delete postPending[q]._id
        postPending[q].to = 'Skip'
        postPending[q].value = postPending[q].count
        delete postPending[q].count
        if (postPending[q].from === 'addressgsi') {
            postPending[q].nodeColor = '#67b7dc'
            postPending[q].linkColor = '#67b7dc'
            postPending[q].from = 'gsj.jp'
            postPending[q].textTip = 'gsj.jp'
        }
        if (postPending[q].from === 'addressenv') {
            postPending[q].nodeColor = '#a367dc'
            postPending[q].linkColor = '#a367dc'
            postPending[q].from = 'env.go.jp'
            postPending[q].textTip = 'env.go.jp'

        }
        if (postPending[q].from === 'addresscob') {
            postPending[q].nodeColor = '#dc67ce'
            postPending[q].linkColor = '#dc67ce'
            postPending[q].from = 'circleofblue.org'
            postPending[q].textTip = 'circleofblue.org'


        }
        if (postPending[q].from === 'addressusgs') {
            postPending[q].nodeColor = '#dc6788'
            postPending[q].linkColor = '#dc6788'
            postPending[q].from = 'waterdata.usgs.gov'
            postPending[q].textTip = 'waterdata.usgs.gov'

        }
        if (postPending[q].from === 'addressnasa') {
            postPending[q].nodeColor = '#dc8c67'
            postPending[q].linkColor = '#dc8c67'
            postPending[q].from = 'nasa.gov'
            postPending[q].textTip = 'nasa.gov'

        }
    }
    for (let k = 0; k < postSkip.length; k++) {
        postSkip[k].from = postSkip[k]._id
        delete postSkip[k]._id
        postSkip[k].to = 'Error'
        postSkip[k].value = postSkip[k].count
        delete postSkip[k].count
        if (postSkip[k].from === 'addressgsi') {
            postSkip[k].nodeColor = '#67b7dc'
            postSkip[k].linkColor = '#67b7dc'
            postSkip[k].from = 'gsj.jp'
            postSkip[k].textTip = 'gsj.jp'

        }
        if (postSkip[k].from === 'addressenv') {
            postSkip[k].nodeColor = '#a367dc'
            postSkip[k].linkColor = '#a367dc'
            postSkip[k].from = 'env.go.jp'
            postSkip[k].textTip = 'env.go.jp'

        }
        if (postSkip[k].from === 'addresscob') {
            postSkip[k].nodeColor = '#dc67ce'
            postSkip[k].linkColor = '#dc67ce'
            postSkip[k].from = 'circleofblue.org'
            postSkip[k].textTip = 'circleofblue.org'

        }
        if (postSkip[k].from === 'addressusgs') {
            postSkip[k].nodeColor = '#dc6788'
            postSkip[k].linkColor = '#dc6788'
            postSkip[k].from = 'waterdata.usgs.gov'
            postSkip[k].textTip = 'waterdata.usgs.gov'

        }
        if (postSkip[k].from === 'addressnasa') {
            postSkip[k].nodeColor = '#dc8c67'
            postSkip[k].linkColor = '#dc8c67'
            postSkip[k].from = 'nasa.gov'
            postSkip[k].textTip = 'nasa.gov'

        }
    }


    let categorySuccess = await Post.aggregate([
        { "$match": { status: '0' } },
        { "$group": { _id: { urlPageCrawl: "$urlPageCrawl", category: "$category" }, count: { $sum: 1 } } }
    ])
    for (let j = 0; j < categorySuccess.length; j++) {
        if (categorySuccess[j]._id.category === undefined) { categorySuccess[j].to = 'Un-process' }
        // if (categorySuccess[j]._id === null) break
        if (categorySuccess[j]._id.category === 'news') { categorySuccess[j].to = 'News' }
        if (categorySuccess[j]._id.category === 'event') { categorySuccess[j].to = 'Event' }
        if (categorySuccess[j]._id.category === 'publications') { categorySuccess[j].to = 'Publications' }
        if (categorySuccess[j]._id.category === 'other') { categorySuccess[j].to = 'Other' }
        categorySuccess[j].from = 'Success'
        // categorySuccess[j].to = categorySuccess[j]._id.category
        categorySuccess[j].value = categorySuccess[j].count

        if (categorySuccess[j]._id.urlPageCrawl === 'addressgsi') {
            categorySuccess[j].nodeColor = '#67b7dc'
            categorySuccess[j].linkColor = '#67b7dc'
            categorySuccess[j].textTip = 'gsj.jp'
        }
        if (categorySuccess[j]._id.urlPageCrawl === 'addressenv') {
            categorySuccess[j].nodeColor = '#a367dc'
            categorySuccess[j].linkColor = '#a367dc'
            categorySuccess[j].textTip = 'env.go.jp'
        }
        if (categorySuccess[j]._id.urlPageCrawl === 'addresscob') {
            categorySuccess[j].nodeColor = '#dc67ce'
            categorySuccess[j].linkColor = '#dc67ce'
            categorySuccess[j].textTip = 'circleofblue.org'
        }
        if (categorySuccess[j]._id.urlPageCrawl === 'addressusgs') {
            categorySuccess[j].nodeColor = '#dc6788'
            categorySuccess[j].linkColor = '#dc6788'
            categorySuccess[j].textTip = 'waterdata.usgs.gov'
        }
        if (categorySuccess[j]._id.urlPageCrawl === 'addressnasa') {
            categorySuccess[j].nodeColor = '#dc8c67'
            categorySuccess[j].linkColor = '#dc8c67'
            categorySuccess[j].textTip = 'nasa.gov'
        }
        delete categorySuccess[j].count
        delete categorySuccess[j]._id
    }

    let arr = []
    let arrPostToStatus = arr.concat(arrColorDefault).concat(postSuccess).concat(postPending).concat(postSkip).concat(categorySuccess)
    return arrPostToStatus
}
async function getArticleSelect(number, idModel, time) {

    if (idModel === 'default') {
        data = await HistoryClassification.find({ 'model_id': idModel }).limit(number * 10).sort({ article_id: 1 });
        result = await HistoryClassification.aggregate([{ "$match": { 'model_id': idModel } }, { "$group": { _id: "$category", count: { $sum: 1 } } }])
    }
    else {
        data = await HistoryClassification.find({ 'model_id': idModel, time: time }).limit(number * 10).sort({ article_id: 1 });
        result = await HistoryClassification.aggregate([{ "$match": { 'model_id': idModel, time: time } }, { "$group": { _id: "$category", count: { $sum: 1 } } }])
    }
    return [data, result]
}

async function getArticleAppend(number, idModel, time) {
    if (idModel === 'default') {
        data = await HistoryClassification.find({ 'model_id': idModel }).skip((number - 1) * 10).limit(10).sort({ article_id: 1 });
    }
    else data = await HistoryClassification.find({ 'model_id': idModel, time: time }).skip((number - 1) * 10).limit(10).sort({ article_id: 1 });
    return data
}

async function applyArticleHasProcessed(idModel, time) {
    let modelapply
    if (idModel=='default'){
        modelapply = await Model.find({ name : idModel})
    }else{
        modelapply = await Model.find({ _id : ObjectID(idModel)})
    }
    
    await Post.updateMany({'languageCrawl':modelapply.language}, { $unset: { classificationScore: "" } })
    await Post.updateMany({'languageCrawl':modelapply.language}, { $unset: { category: "" } })
    await Post.updateMany({'languageCrawl':modelapply.language}, { $unset: { isClassification: "" } })
    articleHasProcessed = await HistoryClassification.find({ 'model_id': idModel, time: time })
    for (let i = 0; i < articleHasProcessed.length; i++) {
        let article = articleHasProcessed[i]
        let idArticle = String(article.article_id)
        await Post.updateMany({ _id: ObjectID(idArticle) }, { $set: { classificationScore: article.classificationScore, category: article.category, isClassification: Boolean(true), classificationStatus: 1 } })
    }
    return 'finish'
}

async function queryArticleClassificationSuccess() {
    let articleNoCategory = await Post.find({ status: '0', category: null })
    let sumArticle = await Post.find({ status: '0' })
    let percentArticleClassificationSuccess = (sumArticle.length - articleNoCategory.length) / sumArticle.length * 100
    let data = Math.floor(percentArticleClassificationSuccess)
    return data + '-%'
}
async function getEditArticle(id, category, status) {
    await Post.updateMany(
        { _id: ObjectID(id) },
        {
            $set: {
                classificationStatus: status,
                category: category,
            },
        }
    );
    return 'finish'
}

async function createModelDefault(sourceModel) {
    let time = dayjs().format('YYYY/MM/DD HH:mm:ss')
    let model_bert_en = await Model.findOne({'name': "AI Classification Base (English)", 'source': sourceModel, "isAi": 1, "isSystem": 0 })
    if (model_bert_en == null) {
        let model = { "time": time, "name": "AI Classification Base (English)", "language": "en", "status": 0, "score": 95, "isAi": 1, "isSystem": 0, 'source': sourceModel }
        model_bert_en = await Model.create(model)
    }
    let model_bert_jp = await Model.findOne({'name': "AI Classification Base (Japanese)", 'source': sourceModel, "isAi": 1, "isSystem": 0 })
    if (model_bert_jp == null) {
        let model = { "time": time, "name": "AI Classification Base (Japanese)", "language": "jp", "status": 0, "score": 95, "isAi": 1, "isSystem": 0, 'source': sourceModel }
        model_bert_jp = await Model.create(model)
    }
    let message = { "message": "successfully" }
    return message
}

function doRequest(url) {
    return new Promise((resolve, reject) => {
        request(url, function (err, response, body) {
            console.log('request oke')

            if (err) {
                reject(err)
            } else {
                resolve(body)
            }
        })
    })
}

/** Create a new Model */
async function createModel(time, name, idModelParent, sourceModel) {
  
    let modelParent
    // if (idModelParent === '64353de7103838517c053cea'){ 
    //     console.log('trung id')
        
    // }
    // if (idModelParent === '64353de7103838517c053cee'){
    //      modelParent = await Model.findOne({ _id: ObjectID(idModelParent) })
    // }
    // if (idModelParent !== '64353de7103838517c053cea' && idModelParent !== '64353de7103838517c053cee') {
    //     console.log('ko trung id')
    //     modelParent = await Model.findOne({ _id: ObjectID(idModelParent) })
    // }
    console.log(idModelParent)
    modelParent =await Model.findOne({ _id: ObjectID(idModelParent) })
    console.log(modelParent)
    let model = { "time": time, "name": name, "language": modelParent.language, status: 0, score: 0, isAi: 1, isSystem: 1, source: sourceModel, lastScore: 0,score :0}
    let id = await Model.create(model)
    let nameFileModel = id._id
    console.log(`http://localhost:3001/process-classification/clone-model-ai?id=${nameFileModel}&idparent=${idModelParent}&page=waterportal`)
    if (sourceModel === 'classification') {
        const message = await doRequest(`http://localhost:3001/process-classification/clone-model-ai?id=${nameFileModel}&idparent=${idModelParent}&page=waterportal`)
        console.log('message = ', message)
        return id
    }
}

/** Get List Model Classification */
async function listModelClassification(sourceModel) {
    let modelAiDefault = await Model.find({ 'source': sourceModel, "isSystem": 0 })
    let modelAi = await Model.find({ 'source': sourceModel, "isSystem": 1 })
    let data = [modelAiDefault, modelAi]
    return data
}

async function updateModelClassification(id, name) {
    await Model.updateOne({ "_id": id }, { "name": name })
}

/** Delete Model by id */
async function deleteModelClassification(id) {
    await Model.deleteOne({ "_id": id })
    await HistoryClassification.remove({ "model_id": id })
    await request(`http://localhost:3001/process-classification/remove-model?id=${id}&page=waterportal`, async function (error, response, body) {
        if (error != null) {
        }
    })
}

async function getArticleSelectPopup(id) {
    let article = await Post.find({ _id: ObjectID(id) })
    return article
}

async function getListModelClassificationHistory() {
    let data = await HistoryClassification.aggregate([
        { "$group": { _id: { 'model_id': "$model_id", 'time': "$time" } } }
    ])
    let array = []
    for (let i = 0; i < data.length; i++) {
        let model_id = data[i]._id.model_id
        let lang
        if (model_id === 'defaultEN') { lang = await Model.find({ name: 'AI Classification Base (English)' }) }
        else if (model_id === 'defaultJP') { lang = await Model.find({ name: 'AI Classification Base (Japanese)' }) }
        else { lang = await Model.find({ _id: ObjectID(model_id)  }) }
        let obj = { model_id: model_id, time: data[i]._id.time, name: lang[0].name,language:lang[0].language }
        array.push(obj)
        
    }
    return array
}

async function getPercentArticleVerify(pointVerify,language) {
    pointVerify = Number(pointVerify / 100)
    let data = await Post.find({ languageCrawl:language, isClassification: true, $or: [{ 'classificationScore.news': { $gt: pointVerify } }, { 'classificationScore.event': { $gt: pointVerify } }, { 'classificationScore.publications': { $gt: pointVerify } }, { 'classificationScore.other': { $gt: pointVerify } }] })
    return data
}

async function savePercentArticleVerify(pointVerify,language) {
    pointVerify = Number(pointVerify / 100)
    let data = await Post.find({ languageCrawl:language, isClassification: true, $or: [{ 'classificationScore.news': { $gt: pointVerify } }, { 'classificationScore.event': { $gt: pointVerify } }, { 'classificationScore.publications': { $gt: pointVerify } }, { 'classificationScore.other': { $gt: pointVerify } }] })
    await Post.updateMany({languageCrawl:language, isClassification: true, $or: [{ 'classificationScore.news': { $gt: pointVerify } }, { 'classificationScore.event': { $gt: pointVerify } }, { 'classificationScore.publications': { $gt: pointVerify } }, { 'classificationScore.other': { $gt: pointVerify } }] }, { $set: { classificationStatus: 0 } })
    await Post.updateMany({languageCrawl:language, isClassification: true, $and: [{ 'classificationScore.news': { $lt: pointVerify } }, { 'classificationScore.event': { $lt: pointVerify } }, { 'classificationScore.publications': { $lt: pointVerify } }, { 'classificationScore.other': { $lt: pointVerify } }] }, { $set: { classificationStatus: 1 } })
    return 'finish'
}
module.exports = { savePercentArticleVerify, getPercentArticleVerify, getListModelClassificationHistory, applyArticleHasProcessed, getArticleAppend, getListArticle, getDataFlowChart, getArticleSelectPopup, getArticleSelect, getEditArticle, createModelDefault, createModel, listModelClassification, updateModelClassification, deleteModelClassification, queryArticleClassificationSuccess }