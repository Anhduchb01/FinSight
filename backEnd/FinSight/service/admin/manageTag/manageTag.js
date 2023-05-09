const mongoose = require("mongoose");
const Post = mongoose.model("Post");
var slugify = require('slugify');
const { ObjectID } = require("bson");
const Model = mongoose.model('Model')
const HistoryGenerateTag = mongoose.model('HistoryGenerateTag')
const TagHistory = mongoose.model('TagHistorys')
const Tags = mongoose.model("Tag")
const Tagmap = mongoose.model("Tagmap");
var _ = require('lodash');
slugify('some string', {
    lower: true,

})
var capitalize = require('capitalize')

async function getListGenerateHistory() {
    let data = await HistoryGenerateTag.find({})
    let array = []
    for (let i = 0; i < data.length; i++) {
        let model_id = data[i].model_id
        let lang
        if (model_id === 'Library (English)') { lang = await Model.find({ name: 'Library (English)' }) }
        else if (model_id === 'Library (Japanese)') { lang = await Model.find({ name: 'Library (Japanese)' }) }
        else if (model_id === 'defaultEN') { lang = await Model.find({ name: 'AI NER Base (English)' }) }
        else if (model_id === 'defaultJP') { lang = await Model.find({ name: 'AI NER Base (Japanese)' }) }
        else { lang = await Model.find({ _id: ObjectID(model_id) }) }

        let obj = { model_id: data[i].model_id, lang: lang[0].language, time: data[i].time, name: lang[0].name ,isPlayGround:lang[0].isPlayGround}
        array.push(obj)
    }
    return array
}

async function getListTagHistory(idModel, time, charSelectFilter) {
    let data
    idModel = String(idModel)
    time = String(time)
    if (idModel === 'Library (English)' || idModel === 'Library (Japanese)' || idModel === 'defaultEN' || idModel === 'defaultJP') {
        data = await TagHistory.find({ 'model_id': idModel, 'name': { '$regex': '^' + charSelectFilter, '$options': 'i' } })
    }
    else data = await TagHistory.find({ 'model_id': idModel, time: time, 'name': { '$regex': '^' + charSelectFilter, '$options': 'i' } })
    return data
}

async function applyResultTagHistory(idModel, time) {
    let data
    idModel = String(idModel)
    time = String(time)
    let source = ''
    let lang
    let modelFind
    let tagId

    if (idModel === 'Library (English)' || idModel === 'Library (Japanese)' || idModel === 'defaultEN' || idModel === 'defaultJP') data = await TagHistory.find({ 'model_id': idModel })
    else data = await TagHistory.find({ 'model_id': idModel, time: time })
    if (idModel === 'Library (English)') { modelFind = await Model.find({ name: 'Library (English)' }) }
    else if (idModel === 'Library (Japanese)') { modelFind = await Model.find({ name: 'Library (Japanese)' }) }
    else if (idModel === 'defaultEN') { modelFind = await Model.find({ name: 'AI NER Base (English)' }) }
    else if (idModel === 'defaultJP') { modelFind = await Model.find({ name: 'AI NER Base (Japanese)' }) }
    else { modelFind = await Model.find({ _id: ObjectID(idModel) }) }
    lang = modelFind[0].language


    if (idModel === 'Library (English)' || idModel === 'Library (Japanese)') source = '0'
    else source = '1'

    let listTagRemove = await Tags.find({ source: source, language: lang })
    let arrayIdTag = []
    for (let j = 0; j < listTagRemove.length; j++) {
        tagId = listTagRemove[j]._id
        tagId = String(tagId)
        arrayIdTag.push(ObjectID(tagId))
    }
    await Tagmap.deleteMany({ 'tag_id': { '$in': arrayIdTag } })
    await Tags.deleteMany({ '_id': { '$in': arrayIdTag } })


    for (let i = 0; i < data.length; i++) {
        let tag = data[i]
        let tags = new Tags();
        tags.name = tag.name
        tags.type = tag.type
        tags.score = tag.score
        tags.slug = tag.slug
        tags.source = source
        tags.language = lang
        tags.tagStatus = 1
        tags.save();
        let tag_id = tags._id
        for (let j = 0; j < tag.listTagMap.length; j++) {
            let tagMap = tag.listTagMap[j]
            let tagMapDB = new Tagmap();
            tagMapDB.article_id = tagMap.article_id
            tagMapDB.year = tagMap.year
            tagMapDB.language = tagMap.language
            tagMapDB.tag_id = ObjectID(tag_id)
            tagMapDB.save();
        }
    }
    if (idModel === 'Library (English)' || idModel === 'Library (Japanese)') {
        if (idModel === 'Library (English)') {
            await Post.updateMany({ languageCrawl: 'en' }, { $unset: { isTag: "" } })
        }
        if (idModel === 'Library (Japanese)') {
            await Post.updateMany({ languageCrawl: 'jp' }, { $unset: { isTag: "" } })
        }
        let dataHistoryGenerateTag = await HistoryGenerateTag.find({ 'model_id': idModel, time: time })
        let arrayDataHistoryGenerateTag = dataHistoryGenerateTag[0].listArticleHasProcessed
        for (let k = 0; k < arrayDataHistoryGenerateTag.length; k++) {
            let idArticleHasProcessed = arrayDataHistoryGenerateTag[k].article_id
            let status = arrayDataHistoryGenerateTag[k].isTag
            status = Boolean(status)
            idArticleHasProcessed = String(idArticleHasProcessed)
            await Post.updateOne({ "_id": ObjectID(idArticleHasProcessed) }, { $set: { 'isTag': status } })
        }
    } else {
        await Post.updateMany({ languageCrawl: lang }, { $unset: { isTagAi: "" } })
        let dataHistoryGenerateTag = await HistoryGenerateTag.find({ 'model_id': idModel, time: time })
        let arrayDataHistoryGenerateTag = dataHistoryGenerateTag[0].listArticleHasProcessed
        for (let k = 0; k < arrayDataHistoryGenerateTag.length; k++) {
            let idArticleHasProcessed = arrayDataHistoryGenerateTag[k].article_id
            let status = arrayDataHistoryGenerateTag[k].isTagAi
            status = Boolean(status)
            idArticleHasProcessed = String(idArticleHasProcessed)
            await Post.updateOne({ "_id": ObjectID(idArticleHasProcessed) }, { $set: { 'isTagAi': status } })
        }
    }
    return 'finish'
}

async function mergeResultTagHistory(idModel, time) {
    let data
    idModel = String(idModel)
    time = String(time)
    let source = ''
    if (idModel === 'Library (English)' || idModel === 'Library (Japanese)' || idModel === 'defaultEN' || idModel === 'defaultJP') data = await TagHistory.find({ 'model_id': idModel })
    else data = await TagHistory.find({ 'model_id': idModel, time: time })

    if (idModel === 'Library (English)' || idModel === 'Library (Japanese)') source = '0'
    else source = '1'

    for (let i = 0; i < data.length; i++) {
        let tag = data[i]
        let nameTag = tag.name
        let tagExist = await Tags.find({ 'source': source, 'name': nameTag })
        if (tagExist.length !== 0) continue
        else {
            let tags = new Tags();
            tags.name = tag.name
            tags.type = tag.type
            tags.score = tag.score
            tags.slug = tag.slug
            tags.source = source
            tags.tagStatus = 1
            tags.save();
            let tag_id = tags._id
            for (let j = 0; j < tag.listTagMap.length; j++) {
                let tagMap = tag.listTagMap[j]
                let tagMapDB = new Tagmap();
                tagMapDB.article_id = tagMap.article_id
                tagMapDB.year = tagMap.year
                tagMapDB.language = tagMap.language
                tagMapDB.tag_id = ObjectID(tag_id)
                tagMapDB.save();
            }
        }
    }

    if (idModel === 'Library (English)' || idModel === 'Library (Japanese)') {
        let dataHistoryGenerateTag = await HistoryGenerateTag.find({ 'model_id': idModel, time: time })
        let arrayDataHistoryGenerateTag = dataHistoryGenerateTag[0].listArticleHasProcessed
        for (let k = 0; k < arrayDataHistoryGenerateTag.length; k++) {
            let idArticleHasProcessed = arrayDataHistoryGenerateTag[k].article_id
            let status = arrayDataHistoryGenerateTag[k].isTag
            status = Boolean(status)
            idArticleHasProcessed = String(idArticleHasProcessed)
            await Post.updateOne({ "_id": ObjectID(idArticleHasProcessed) }, { $set: { 'isTag': status } })
        }
    } else {
        let dataHistoryGenerateTag = await HistoryGenerateTag.find({ 'model_id': idModel, time: time })
        let arrayDataHistoryGenerateTag = dataHistoryGenerateTag[0].listArticleHasProcessed
        for (let k = 0; k < arrayDataHistoryGenerateTag.length; k++) {
            let idArticleHasProcessed = arrayDataHistoryGenerateTag[k].article_id
            let status = arrayDataHistoryGenerateTag[k].isTagAi
            status = Boolean(status)
            idArticleHasProcessed = String(idArticleHasProcessed)
            await Post.updateOne({ "_id": ObjectID(idArticleHasProcessed) }, { $set: { 'isTagAi': status } })
        }
    }
    console.log('finish');
    return 'finish'
}


async function getDataProcessTag(idModelOne, timeOne, idModelTwo, timeTwo) {
    let arrayStatusTag = []
    let arrayTypeTag = []
    let arrayTypeTagResultOne = []
    let arrayTypeTagResultTwo = []
    arrayStatusTag = await Tags.aggregate([
        { "$group": { _id: { type: "$tagStatus" }, count: { $sum: 1 } } }
    ])

    arrayTypeTag = await Tags.aggregate([
        { "$group": { _id: { type: "$type" }, count: { $sum: 1 } } }
    ])
    if (idModelOne !== '') {
        if (idModelOne === 'Library (English)' || idModelOne === 'Library (Japanese)' || idModelOne === 'defaultEN' || idModelOne === 'defaultJP') {
            arrayTypeTagResultOne = await TagHistory.aggregate([
                { "$match": { 'model_id': idModelOne } },
                { "$group": { _id: '$type', count: { $sum: 1 } } }
            ])
        }
        else {
            arrayTypeTagResultOne = await TagHistory.aggregate([
                { "$match": { 'model_id': idModelOne, time: timeOne } },
                { "$group": { _id: '$type', count: { $sum: 1 } } }
            ])
        }

    }

    if (idModelTwo !== '') {
        if (idModelTwo === 'Library (English)' || idModelTwo === 'Library (Japanese)' || idModelTwo === 'defaultEN' || idModelTwo === 'defaultJP') {
            arrayTypeTagResultTwo = await TagHistory.aggregate([
                { "$match": { 'model_id': idModelTwo } },
                { "$group": { _id: '$type', count: { $sum: 1 } } }
            ])
        }
        else {
            arrayTypeTagResultTwo = await TagHistory.aggregate([
                { "$match": { 'model_id': idModelTwo, time: timeTwo } },
                { "$group": { _id: '$type', count: { $sum: 1 } } }
            ])
        }

    }
    let array = [arrayStatusTag, arrayTypeTag, arrayTypeTagResultOne, arrayTypeTagResultTwo]
    return array
}

async function getDataStatusCharSelectFilter() {
    let arrayChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M','N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Japanese']
    let arrData = []
    let countStatusVerify = 0
    let countStatusPending = 0
    let countStatusIgnore = 0
    let objitem = {}
    const lisTag = []
    for (let i = 0; i < arrayChar.length; i++) {
        countStatusVerify = 0
        countStatusPending = 0
        countStatusIgnore = 0
        objitem = {}
        if (arrayChar[i] !== 'Japanese') {
            const lisTag = await Tags.aggregate([
                { "$match": { language: 'en', "name": { $regex: '^' + arrayChar[i], $options: "i" } } },
                { "$project": { "name": 1, "tagStatus": 1, 'source': 1 } },
                { $group: { _id: "$name", tagStatus: { $push: "$tagStatus" }, source: { $push: "$source" } } }
            ]);


            for (let j = 0; j < lisTag.length; j++) {
                let status
                if (lisTag[j].source.length === 2) {
                    if (lisTag[j].source[0] === '0') status = lisTag[j].tagStatus[1]
                    if (lisTag[j].source[0] === '1') status = lisTag[j].tagStatus[0]
                } else { status = lisTag[j].tagStatus[0] }

                if (status === 2) countStatusIgnore += 1
                if (status === 1) countStatusPending += 1
                if (status === 0) countStatusVerify += 1
            }
            objitem = { 'char': arrayChar[i], 'verify': countStatusVerify, 'pending': countStatusPending, 'ignore': countStatusIgnore }
            arrData.push(objitem)
        }
        else {
            const lisTag = await Tags.aggregate([
                { "$match": { language: 'jp' } },
                { "$project": { "name": 1, "tagStatus": 1, 'source': 1 } },
                { $group: { _id: "$name", tagStatus: { $push: "$tagStatus" }, source: { $push: "$source" } } }
            ]);
            for (let j = 0; j < lisTag.length; j++) {
                let status
                if (lisTag[j].source.length === 2) {
                    if (lisTag[j].source[0] === '0') status = lisTag[j].tagStatus[1]
                    if (lisTag[j].source[0] === '1') status = lisTag[j].tagStatus[0]
                }
                else { status = lisTag[j].tagStatus[0] }
                if (status === 2) countStatusIgnore += 1
                if (status === 1) countStatusPending += 1
                if (status === 0) countStatusVerify += 1
            }
            objitem = { 'char': arrayChar[i], 'verify': countStatusVerify, 'pending': countStatusPending, 'ignore': countStatusIgnore }
            arrData.push(objitem)
        }
    }
    return arrData
}

async function getListTagSame(charSelectFilter, idModelOne, timeOne, idModelTwo, timeTwo) {
    let dataTable = []
    let dataOne = []
    let dataTwo = []
    let dataSame = []
    let objdata
    //query result Tag 
    if (charSelectFilter === 'Japanese') {
        const lisTag = await Tags.aggregate([
            { "$match": { language: 'jp' } },
            {
                "$project": { "name": 1, "type": 1, "tagStatus": 1, 'source': 1, 'score': 1 }
            },

            { $group: { _id: "$name", type: { $push: "$type" }, tagStatus: { $push: "$tagStatus" }, source: { $push: "$source" }, score: { $push: "$score" } } }
        ]);
        let dataListTag = []
        for (let index = 0; index < lisTag.length; index++) {
            let tag = lisTag[index]
            dataListTag.push({ name: tag._id, type: tag.type[0], status: tag.tagStatus, source: tag.source, scoreOrigin: tag.score })
        }
        dataTable = dataListTag
        dataSame = _.cloneDeep(dataListTag)
        dataTable = _.cloneDeep(dataListTag)

        //query result 1
        if (idModelOne === '' && timeOne === '') { dataOne = [] }
        else {
            if (idModelOne === 'Library (English)' || idModelOne === 'Library (Japanese)' || idModelOne === 'defaultEN' || idModelOne === 'defaultJP') {
                dataOne = await TagHistory.find({ 'model_id': idModelOne })
            }
            else dataOne = await TagHistory.find({ 'model_id': idModelOne, time: timeOne })
        }


        //query result 2
        if (idModelTwo === '' && timeTwo === '') { dataTwo = [] }
        else {
            if (idModelTwo === 'Library (English)' || idModelTwo === 'Library (Japanese)' || idModelTwo === 'defaultEN' || idModelTwo === 'defaultJP') {
                dataTwo = await TagHistory.find({ 'model_id': idModelTwo })
            }
            else dataTwo = await TagHistory.find({ 'model_id': idModelTwo, time: timeTwo })
        }

        for (let i = 0; i < dataOne.length; i++) {
            let itemSame = dataSame.find(x => x.name === dataOne[i].name)
            if (!itemSame) {
                dataSame.push(dataOne[i])
            }
        }
        for (let j = 0; j < dataTwo.length; j++) {
            let itemSame = dataSame.find(x => x.name === dataTwo[j].name)

            if (!itemSame) {
                dataSame.push(dataTwo[j])
            }
        }

        objdata = { table: dataTable, dataOne: dataOne, dataTwo: dataTwo, dataSame: dataSame }

    }
    else {
        const lisTag = await Tags.aggregate([
            { "$match": { language: 'en', "name": { $regex: '^' + charSelectFilter, $options: "i" } } },
            {
                "$project": { "name": 1, "type": 1, "tagStatus": 1, 'source': 1, 'score': 1 }
            },

            { $group: { _id: "$name", type: { $push: "$type" }, tagStatus: { $push: "$tagStatus" }, source: { $push: "$source" }, score: { $push: "$score" } } }
        ]);
        let dataListTag = []
        for (let index = 0; index < lisTag.length; index++) {
            let tag = lisTag[index]
            dataListTag.push({ name: tag._id, type: tag.type[0], status: tag.tagStatus, source: tag.source, scoreOrigin: tag.score })
        }
        dataSame = _.cloneDeep(dataListTag)
        dataTable = _.cloneDeep(dataListTag)

        //query result 1 
        if (idModelOne === 'Library (English)' || idModelOne === 'Library (Japanese)' || idModelOne === 'defaultEN' || idModelOne === 'defaultJP') {
            dataOne = await TagHistory.find({ 'model_id': idModelOne, 'name': { '$regex': '^' + charSelectFilter, '$options': 'i' } })
        }
        else dataOne = await TagHistory.find({ 'model_id': idModelOne, time: timeOne, 'name': { '$regex': '^' + charSelectFilter, '$options': 'i' } })

        //query result 2
        if (idModelTwo === 'Library (English)' || idModelTwo === 'Library (Japanese)' || idModelTwo === 'defaultEN' || idModelTwo === 'defaultJP') {
            dataTwo = await TagHistory.find({ 'model_id': idModelTwo, 'name': { '$regex': '^' + charSelectFilter, '$options': 'i' } })
        }
        else dataTwo = await TagHistory.find({ 'model_id': idModelTwo, time: timeTwo, 'name': { '$regex': '^' + charSelectFilter, '$options': 'i' } })
        for (let i = 0; i < dataOne.length; i++) {
            let itemSame = dataSame.find(x => x.name === dataOne[i].name)
            if (!itemSame) {
                dataSame.push(dataOne[i])
            }
        }
        for (let j = 0; j < dataTwo.length; j++) {
            let itemSame = dataSame.find(x => x.name === dataTwo[j].name)

            if (!itemSame) {
                dataSame.push(dataTwo[j])
            }
        }

        objdata = { table: dataTable, dataOne: dataOne, dataTwo: dataTwo, dataSame: dataSame }

    }
    return objdata
}

async function getPercentTagVerify(pointVerify) {
    pointVerify = Number(pointVerify / 100)
    let tagVerify = await Tags.find({ score: { $gt: pointVerify } })
    let totalTagAi = await Tags.find({})
    let data = [totalTagAi, tagVerify]
    return data
}

async function savePercentTagVerify(pointVerify) {
    pointVerify = Number(pointVerify / 100)
    let data = await Tags.find({ score: { $gt: pointVerify } })
    await Tags.updateMany({ score: { $gt: pointVerify } }, { $set: { tagStatus: 0 } })
    await Tags.updateMany({ score: { $lt: pointVerify } }, { $set: { tagStatus: 1 } })
    return 'finish'
}




module.exports = { getListGenerateHistory, getListTagHistory, applyResultTagHistory, mergeResultTagHistory, getDataProcessTag, getDataStatusCharSelectFilter, getListTagSame, savePercentTagVerify, getPercentTagVerify }