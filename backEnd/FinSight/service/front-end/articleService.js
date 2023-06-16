const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Tagmap = mongoose.model("Tagmap");
const Tag = mongoose.model("Tag")
const Post = mongoose.model("Post");
const logToFile = require("../logger");

function order(a, b) {
    return a < b ? -1 : (a > b ? 1 : 0);
}


async function getYearArray() {
    const yearArray = await Tagmap.aggregate([{ "$group": { _id: {
        $concat: [
          { $arrayElemAt: [{ $split: ["$year", "/"] }, 0] },
          "/",
          { $arrayElemAt: [{ $split: ["$year", "/"] }, 1] }
        ]
        }, } }])
    const yearArrays = yearArray.map(year => year._id).sort(order)
    return yearArrays
}


async function getArticleHasTag(text, numberPage) {

    var regex = new RegExp('^' + text + '$', 'i');
    var tag_id = await Tag.findOne({ "name": { $regex: regex } })
    console.log(tag_id)
    var articles = await Tagmap.aggregate([{ "$match": { tag_id: ObjectId(tag_id._id) } }, { "$group": { _id: "$article_id" } }, { "$lookup": { from: "posts", localField: "_id", foreignField: "_id", as: "article" } }, {
        "$project": {
            "_id": 1,
            "article.title": 1,
            "article.content": 1,
            "article.timeCreatePostOrigin": 1,
            "article.content_html": 1,
            "article.urlPageCrawl": 1,
            "article.category": 1,
            "article.type": 1,
        }
    }, { "$sort": { 'article.timeCreatePostOrigin': -1 } },
    { "$skip": (numberPage - 1) * 8 },
    { "$limit": 8 },
    ])
    
    return articles
}
async function getTimeLineOfTag(text) {

    var regex = new RegExp('^' + text + '$', 'i');
    var tag_id = await Tag.findOne({ "name": { $regex: regex } })
    console.log(tag_id)
    var timeline = await Tagmap.aggregate([
        {
          '$match': {
            'tag_id': ObjectId(tag_id._id)
          }
        }, {
          '$group': {
            '_id': '$article_id'
          }
        }, {
          '$lookup': {
            'from': 'posts', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'article'
          }
        }, {
          '$project': {
            '_id': 1, 
            'article.timeCreatePostOrigin': 1, 
            'article.category': 1
          }
        }, {
          '$unwind': '$article'
        }, {
          '$group': {
            '_id': '$article.timeCreatePostOrigin', 
            'articles': {
              '$push': {
                'category': '$article.category'
              }
            }
          }
        }
      ])
    let result = []
    
    for (let i =0;i<timeline.length;i++){
        let objTimeLine = {}
        let arrCountDate = {}
        arrCountDate.POS = 0
        arrCountDate.NEG = 0
        arrCountDate.NEU = 0
        let arrCategory = timeline[i].articles
        for (let j =0;j<arrCategory.length;j++){
            
            if (arrCategory[j].category=='POS'){
                arrCountDate.POS +=1
            }else if (arrCategory[j].category=='NEU'){
                arrCountDate.NEG +=1
            }else {
                arrCountDate.NEU +=1
            }
        }
        let time =timeline[i]._id
        objTimeLine[time] = arrCountDate
        result.push(objTimeLine)
    }
    return result
}

function sortObject(obj) {
    var arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                key: prop,
                value: obj[prop],
            });
        }
    }
    arr.sort(function (a, b) {
        return b.value - a.value;
    });
    return arr; // returns array
}

async function recommendArticle(article_id) {
    recommend_article = [];
    try {
        category_of_article = await (await Post.findOne({ _id: ObjectId(article_id) }))
        const article_in_category = await Post.find({
            status: '0',
            "$and": [{
                category: category_of_article.category,
            }, { languageCrawl: category_of_article.languageCrawl }]
        }).select("article_id");
        const tag_array = await Tagmap.find({
            article_id: ObjectId(article_id),
        }).select("tag_id");
        let article_tag_array = [];
        for (let tag of tag_array) {
            const article_find = await Tagmap.find({
                "$and": [{
                    tag_id: ObjectId(tag.tag_id),
                }, { language: category_of_article.languageCrawl }]
            }).select("article_id");
            article_tag_array.push(...article_find);
        }
        score_with_tag = {};
        for (let article of article_tag_array) {
            score_with_tag[article.article_id] = score_with_tag[article.article_id]
                ? score_with_tag[article.article_id] + 1
                : 1;
        }
        score_total = {};

        for (let article of article_in_category) {
            if (score_with_tag[article._id] === undefined) {
                score_total[article._id] = 1;
            } else {
                score_total[article._id] =
                    1 + score_with_tag[article._id];
            }
        }
        let sort_score_total = sortObject(score_total).slice(0, 5);
        sort_score_total.shift();
        for (let post of sort_score_total) {
            let article = await Post.findOne(
                { _id: post.key },
                { urlimage: 1, title: 1, timeCreatePostOrigin: 1 }
            );
            recommend_article.push(article);
        }
        recommend_article = recommend_article.sort(function (a, b) {
            return new Date(b.timeCreatePostOrigin) - new Date(a.timeCreatePostOrigin);
        });
        return recommend_article
    } catch (error) {
        logToFile.error("error of recommendArticle.js :" + error);
    }
    return recommend_article;
}





module.exports = { getArticleHasTag, getYearArray, recommendArticle ,getTimeLineOfTag}