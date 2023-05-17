const request = require("request");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const { ObjectID } = require("bson");
const Model = mongoose.model('Model')

var _ = require('lodash');

async function getModelPlayGround(language){
        model = await Model.find({"language":language,"isAi":1,'isPlayGround':1})
        return model
}

module.exports = { getModelPlayGround}