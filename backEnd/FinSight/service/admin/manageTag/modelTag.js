const mongoose = require("mongoose");
const Model = mongoose.model('Model')
const dayjs = require('dayjs')
const request = require("request");
var path = require('path');
const { ObjectID } = require("bson");
const { resolve } = require("path");
const TagHistory = mongoose.model('TagHistorys')
const HistoryGenerateTag = mongoose.model('HistoryGenerateTag')


/** Get all Models */
async function listModel(sourceModel) {
    let model = await Model.find({ 'source': sourceModel, "isSystem": 1 }).sort("time")
    

    
    // for (let indexmodel = 0; indexmodel < arrmodel.length; indexmodel++) {
    //     for (let index = 0; index < arrayTotalTagResult.length; index++) {
        
            
            // if (arrayTotalTagResult[index]._id == 'defaultEN' ){
            //     console.log('for check defaultEN')
            //     if (arrmodel[indexmodel].name == 'AI NER Base (English)'){
            //         arrmodel[indexmodel].totalTag = arrayTotalTagResult[index].count

            //     }
            // }
            // if (arrayTotalTagResult[index]._id == 'defaultJP' ){
                
            //     if (arrmodel[indexmodel].name == 'AI NER Base (Japanese)'){
            //         arrmodel[indexmodel].totalTag = arrayTotalTagResult[index].count

            //     }
            // }
            // if (arrayTotalTagResult[index]._id == 'Library (English)' ){
            //     console.log('for check Library (English)')
            //     if (arrmodel[indexmodel].name == 'Library (English)'){
            //         arrmodel[indexmodel].totalTag = arrayTotalTagResult[index].count

            //     }
            // }
            // if (arrayTotalTagResult[index]._id == 'Library (Japanese)' ){
            //     if (arrmodel[indexmodel].name == 'Library (Japanese)'){
            //         arrmodel[indexmodel].totalTag = arrayTotalTagResult[index].count

            //     }
            // }

    //         if (arrmodel[indexmodel]._id  == arrayTotalTagResult[index]._id ){
                
    //             arrmodel[indexmodel].totalTag = arrayTotalTagResult[index].count
                
    //             // console.log(arrmodel[indexmodel])


    //         }
    //     }
    // }
    // arrmodel.map(function(model) {

    //     for (let index = 0; index < arrayTotalTagResult.length; index++) {
    //         if (model._id  == arrayTotalTagResult[index]._id ){           
    //             model.totalTag = arrayTotalTagResult[index].count
    //         }
    //     }
    //     return model;
    // });
    
    return model
}

/** Get all default Models  */
async function listModelDefault(sourceModel) {
    let model_en = await Model.findOne({ 'source': sourceModel, "name": "Library (English)" })
    let model_jp = await Model.findOne({ 'source': sourceModel, "name": "Library (Japanese)" })
    let model_bert_en = await Model.findOne({ 'source': sourceModel, "isAi": 1, "isSystem": 0, language: 'en' })
    let model_bert_jp = await Model.findOne({ 'source': sourceModel, "isAi": 1, "isSystem": 0, language: 'jp' })
    
    
    let data = { "data": { "en": model_en, "jp": model_jp, "bert_en": model_bert_en, "bert_jp": model_bert_jp } }
    return data
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
    console.log(idModelParent)
    if (idModelParent == 'defaultEN') {
        console.log('defaultEN')
        modelParent = await Model.findOne({ 'source': sourceModel, "name": "AI NER Base (English)" })
    }
    else if (idModelParent == 'defaultJP') {
        console.log('defaultJP')
        modelParent = await Model.findOne({ 'source': sourceModel, "name": "AI NER Base (Japanese)" })
    }
    else{ 
        console.log('else')
        modelParent = await Model.findOne({ _id: ObjectID(idModelParent) })
    }   
    let model = { "time": time, "name": name, "language": modelParent.language, status: 0, score: 0, isAi: 1, isSystem: 1, source: sourceModel, lastScore: modelParent.lastScore , score : modelParent.score,lastTotalTag:modelParent.lastTotalTag,totalTag: modelParent.totalTag,articleHasTraining:[]}
    let id = await Model.create(model)
    let nameFileModel = id._id
    if (sourceModel === 'tag') {
        const message = await doRequest(`http://localhost:3001/clone-model-ai?id=${nameFileModel}&idparent=${idModelParent}&page=waterportal`)
        console.log('message = ', message)
        return id
    }
}

/** Create 3 default models  */
async function createModelDefault(sourceModel) {
    let time = dayjs().format('YYYY/MM/DD HH:mm:ss')
    let model_en = await Model.findOne({ 'source': sourceModel, "name": "Library (English)" })
    if (model_en == null) {
        let model = { "time": time, "name": "Library (English)", "language": "en", "status": 0, "score": 0, "isAi": 0, "isSystem": 0, 'source': sourceModel,'lastScore':0,'score':0,'lastTotalTag':0,'totalTag':0 }
        model_en = await Model.create(model)
    }
    let model_jp = await Model.findOne({ 'source': sourceModel, "name": "Library (Japanese)" })
    if (model_jp == null) {
        let model = { "time": time, "name": "Library (Japanese)", "language": "jp", "status": 0, "score": 0, "isAi": 0, "isSystem": 0, 'source': sourceModel ,'lastScore':0,'score':0,'lastTotalTag':0,'totalTag':0}
        model_jp = await Model.create(model)
    }

    let model_bert = await Model.findOne({ 'source': sourceModel, "isAi": 1, language: "en" })
    if (model_bert == null) {
        if (sourceModel === 'tag') {
            let model = { "time": time, "name": "AI NER Base (English)", "language": "en", "status": 0, "score": 0, "isAi": 1, "isSystem": 0, 'source': sourceModel ,'lastScore':0,'score':0,'lastTotalTag':0,'totalTag':0}
            model_bert = await Model.create(model)
        }
    }

    let model_bert_jp = await Model.findOne({ 'source': sourceModel, "isAi": 1, language: "jp" })
    if (model_bert_jp == null) {
        if (sourceModel === 'tag') {
            let model = { "time": time, "name": "AI NER Base (Japanese)", "language": "jp", "status": 0, "score": 0, "isAi": 1, "isSystem": 0, 'source': sourceModel ,'lastScore':0,'score':0,'lastTotalTag':0,'totalTag':0}
            model_bert_jp = await Model.create(model)
        }
    }
    let message = { "message": "successfully" }
    return message
}

/** Delete Model by id */
async function deleteModel(id) {
    await Model.deleteOne({ "_id": id })
    await HistoryGenerateTag.remove({ "model_id": id })
    await TagHistory.remove({ "model_id": id })
    await request(`http://localhost:3001/remove-model?id=${id}&page=waterportal`, async function (error, response, body) {
        if (error != null) {
        }
    })
}

/** Update Model */
async function updateModel(id, name) {
    await Model.updateOne({ "_id": id }, { "name": name })
}
// Choose model to play ground
async function updateModelPlayGround(idModel,language){
   
    if (idModel=='defaultEN' || idModel=='defaultJP') {
        await Model.updateMany({ "source":"tag" ,"language":language},{$set:{"isPlayGround":0}})
            
        if (idModel=='defaultEN'){
            
            
            
            await Model.updateOne({ "name": 'AI NER Base (English)' },{$set:{"isPlayGround":1}})
        }
        if (idModel=='defaultJP'){
            
            
            await Model.updateOne({ "name": 'AI NER Base (Japanese)' },{$set:{"isPlayGround":1}})
            }
        

    }
    else{
        model_choose = await Model.find({ "_id": ObjectID(idModel) })
        model_choose_source = model_choose[0].source
        await Model.updateMany({ "source":model_choose_source ,"language":language },{$set:{"isPlayGround":0}})
        await Model.updateOne({ "_id": ObjectID(idModel) },{$set:{"isPlayGround":1}})
    }
    
}
async function clearModelPlayGround(language,source){
    await Model.updateMany({ "language": language,"source":source },{$set:{"isPlayGround":0}})
    
}


module.exports = { createModelDefault, listModelDefault, createModel, listModel, deleteModel, updateModel ,updateModelPlayGround,clearModelPlayGround}