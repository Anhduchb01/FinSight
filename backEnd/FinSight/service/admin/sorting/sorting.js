const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const Tagmap = mongoose.model("Tagmap");
const Tags = mongoose.model("Tag")
const Post = mongoose.model("Post");
const Sorting = mongoose.model("Sorting");
const { google } = require('googleapis');
var dayjs = require("dayjs");
const cron = require('node-cron');


let key = {
    "type": "service_account",
    "project_id": "waterportal-analytics",
    "private_key_id": "9fd24ffdd25cbdffb81ef7c9794037c63e50b938",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCUgy/gjb0Jy72n\n5alJ6XjctlYIQDY4WYnbzcT2fuVGZabo9luBo0n7N1Z3P5vkGN33cBB4duGWAoIl\niNiOv7cqmnmh7eUm6qBqahBnOXkIIR/hum4mbF/gXVkMXFzI97btgT2KnP84msPs\n7yNlBWehcOxN6d3K0u2MhmrqR7eKUQUr+r82DjPoSa+G4mA9YH/8fQ5AOHwDMyr3\nHZ2AYXsftQaph+PfziNnQdHiZzgok0MHq16UVeQ38nrXDLOAOctEvb/atX5KjJL9\nIoKQFfcguxuFQaRfJ6QpImrUAN8m0GF3t6UTCEk6cb8tiCecx+4CwCE39snFQ6pV\n8AZO0cV1AgMBAAECggEAIH1wwHYRuK5nf+848XAP3m1Pdf+iPQKtq7YhFHIfc56y\nfL3EuCBCg6CQHIeAcc7U5JiSKeCMKpbC5TZCdjxP9JSV7oyOeMyUqqMokoSay2H/\nyRDRnztPYFTbsd4U+GxlCyGelpARL89/9Ho+qo+bo9CCCeuTd5dcm8UeZ8Gn0Czi\n/2GJNreRgX5uWt9Aj5BT3Z+xWKx0Y5R++3mk7PbDk5kQRU3rQqxIgLBRAswPOHUP\nGiIjYUxLMvIUFkTJ+e+bgJ4DLGRnH/HGIzR4RKH4ligr0wLiIx1y8Tr9ZzZMgxc8\nO0g2CP+30Gz3AOT5NBa1yrYN+mhpeSfBohT2iKKpMQKBgQDNhjFvgK0GMkt+IHWW\ngowpAwdG1z1/CTRjJqCpOnfh84ovwm3dEnGI51Nsjz2HqW6MTqDkncAPCAb3FDof\nyi2QHsqsZsTb1TlD8nxOYQNRJp6ar2rc758CbxZguFWK7R4Ax+YF6wMvM7MDGzL1\n9QJDEclo54MqeJ7bLHMR+ISRHQKBgQC4/IbVoKK676PLXqEUEIlpTcNA5lZBGkwn\nvgzelf+6ri/b8LadvXhCGUjURodrnqBOkc8AEP/CXQtSwoxLVKwrt58bOwZhzFO6\nFZe0sgTnoOkklTC0WTH6pI81+9tB6rET0cxm/SLOqBtsMtRtzLvuCKtbwNEdVqyi\nNJMTN09uOQKBgQCsJQNRPrkuIIBlE3EKcSxOya+VoYFr31zW06rsNAHn6uJK4JK/\nAczA++k/W7cQ41SqBs3yz0LoFDQpTfLlX6XMOk5OGwI2k6EUjY2a5N0vYqakL9vV\nVIueMUfQGXXlGHjx9H1xZYhUR/xf1K9Zni+X19UYnhmaQE/mipOTcNIw7QKBgFbf\n8Yq+J+5WwLuvs0IzCfV0WbBO/E8SxJUdgfm+xByt1TgbcgfehW21Ziia/toh4vND\nMs27LgHfpIO3bh+qojjdwVEOhU7EoMWRgm+P8xG81gEiN39bLEejpMYbg7sPNx4x\ntybe1svq0wYbUPxH3DJLy/4JLavzmpuKyU+K+DixAoGAIl4e34yNXzRYL3FepR4f\n729rI5Ip3wIZaNw+al4s5HgaHw3PW97x/dDV7NqGJFzgdPlTlaF0w8f16t4X/Owr\n9kl0Y7mDOMKTVTyoBvCoiBSOE6x++yAEaU+tB6yJjte1Lr8qmmM92g5zrlcROxpz\njqMHtaHd8Bb+xu/ww3wAQbk=\n-----END PRIVATE KEY-----\n",
    "client_email": "waterportal-api@waterportal-analytics.iam.gserviceaccount.com",
    "client_id": "114881642122125236867",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/waterportal-api%40waterportal-analytics.iam.gserviceaccount.com"
}

// 12 hour chạy 1 lần
cron.schedule('0 0 */12 * * *', async function () {
    await getViewArticle()
    await calculatorHotPointForArticle
});

async function getViewArticle() {
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
    const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)
    const view_id = '254408545'
    const response = await jwt.authorize()
    const result = await google.analytics('v3').data.ga.get({
        'auth': jwt,
        'ids': 'ga:' + view_id,
        'start-date': '30daysAgo',
        'end-date': 'today',
        'metrics': "ga:pageviews",
        "dimensions": "ga:pagepath",
        // 'filters': 'ga:hostname==waterportal.sinka.vn',
    })
    let arrTopIDArticle = []
    for (let i = 0; i < result.data.rows.length; i++) {
        let objArticle = {}
        let path = result.data.rows[i]
        let arrPath = path[0].split('/')
        if (arrPath[1] === 'detail-new') {
            objArticle.id = arrPath[2]
            objArticle.count = path[1]
            arrTopIDArticle.push(objArticle)
        }
    }
    arrTopIDArticle.sort((a, b) => b.count - a.count);
    for (let i = 0; i < arrTopIDArticle.length; i++) {
        await Post.updateMany({ _id: ObjectID(arrTopIDArticle[i].id) }, {
            $set: {
                view: arrTopIDArticle[i].count,
            },
        });
    }
}
async function valueTotalSeenPage() {
    const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
    const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)
    const view_id = '254408545'
    const response = await jwt.authorize()
    const result = await google.analytics('v3').data.ga.get({
        'auth': jwt,
        'ids': 'ga:' + view_id,
        'start-date': '30daysAgo',
        'end-date': 'today',
        'metrics': "ga:pageviews",
    })
    return result.data.rows[0][0]
}


async function configValueSorting(percentLaster, percentViewed, pointDecreasePerDay, pointIncreasePerView, pointRequiredForTag, viewRequiredForTag) {
    let data = await Sorting.find({})
    if (data.length === 0) {
        var sorting = new Sorting();
        sorting.percentLaster = percentLaster
        sorting.percentViewed = percentViewed
        sorting.pointDecreasePerDay = pointDecreasePerDay
        sorting.pointIncreasePerView = pointIncreasePerView
        sorting.pointRequiredForTag = pointRequiredForTag
        sorting.viewRequiredForTag = viewRequiredForTag
        sorting.save()
    } else {
        await Sorting.updateMany({}, {
            $set: {
                percentLaster: percentLaster,
                percentViewed: percentViewed,
                pointDecreasePerDay: pointDecreasePerDay,
                pointIncreasePerView: pointIncreasePerView,
                pointRequiredForTag: pointRequiredForTag,
                viewRequiredForTag: viewRequiredForTag,
            },
        }
        );
    }

    let setupData = await calculatorHotPointForArticle()
    return 'finish'
}

async function calculatorHotPointForArticle() {
    //get data config sorting
    let dataConfigSort = await Sorting.find({})
    let percentLaster = dataConfigSort[0].percentLaster;
    let percentViewed = dataConfigSort[0].percentViewed;
    let pointDecreasePerDay = dataConfigSort[0].pointDecreasePerDay;
    let pointIncreasePerView = dataConfigSort[0].pointIncreasePerView;
    let pointRequiredForTag = dataConfigSort[0].pointRequiredForTag;
    let viewRequiredForTag = dataConfigSort[0].viewRequiredForTag;
    // get Time
    let articles = await Post.find({ status: '0' })
    for (let i = 0; i < articles.length; i++) {
        let article = articles[i]
        let timeHasPassed = dayjs().diff(article.timeCrawlPage, 'days')
        timeHasPassed = Number(timeHasPassed)
        // calculator Hotpoint By Date
        let HPByDate = 100 - (timeHasPassed * pointDecreasePerDay)
        if (HPByDate < 0) HPByDate = 0
        HPByDate = (HPByDate)
        // calculator Hotpoint By View
        let HPByView = (pointIncreasePerView * article.view)
        // calculator Hotpoint By (Date + View + Percent)
        let hotPoint = (HPByDate * (percentLaster / 100)) + (HPByView * (percentViewed / 100))
        await Post.updateMany({ _id: ObjectID(article._id) }, {
            $set: {
                hotPoint: hotPoint,
            },
        })
    }
    return 'finish'
}

async function queryArticle(percentLaster, percentViewed, pointDecreasePerDay, pointIncreasePerView, pointRequiredForTag, viewRequiredForTag) {
    let arrayPost = []
    let arrPostLaster = []
    let arrPostViewed = []
    let arrPostLaster1 = []

    if (percentLaster === 0) {
        arrayPost = await Post.find({ status: '0' }).limit(8).sort({ view: -1, hotPoint: -1 });
        for (let i = 0; i < arrayPost.length; i++) {
            let article = arrayPost[i]
            let timeHasPassed = dayjs().diff(article.timeCrawlPage, 'days')
            timeHasPassed = Number(timeHasPassed)
            arrayPost[i].timeCrawlPage = timeHasPassed + ' day ago'
        }
    } else if (percentLaster === 100) {
        arrayPost = await Post.find({ status: '0' }).limit(8).sort({ timeCrawlPage: -1, hotPoint: -1 });
        for (let i = 0; i < arrayPost.length; i++) {
            let article = arrayPost[i]
            let timeHasPassed = dayjs().diff(article.timeCrawlPage, 'days')
            timeHasPassed = Number(timeHasPassed)
            arrayPost[i].timeCrawlPage = timeHasPassed + ' day ago'
        }
    } else {
        let articles = await Post.find({ status: '0' })
        for (let i = 0; i < articles.length; i++) {
            let article = articles[i]
            let timeHasPassed = dayjs().diff(article.timeCrawlPage, 'days')
            timeHasPassed = Number(timeHasPassed)
            // calculator Hotpoint By Date
            let HPByDate = 100 - (timeHasPassed * pointDecreasePerDay)
            if (HPByDate < 0) HPByDate = 0
            HPByDate = HPByDate
            // calculator Hotpoint By View
            let HPByView = pointIncreasePerView * article.view
            // calculator Hotpoint By (Date + View + Percent)
            let hotPoint = (HPByDate * (percentLaster / 100)) + (HPByView * (percentViewed / 100))
            articles[i].timeCrawlPage = timeHasPassed + ' day ago'
            articles[i].hotPoint = hotPoint
        }
        articles.sort((a, b) => b.hotPoint - a.hotPoint);
        arrayPost = articles.slice(0, 8)
    }
    arrPostLaster = await Post.find({ status: '0' }).limit(10).sort({ timeCrawlPage: -1, hotPoint: -1 });

    arrPostLaster.sort(function (a, b) {
        return new Date(b.timeCreatePostOrigin) - new Date(a.timeCreatePostOrigin);
    }),

        arrPostViewed = await Post.find({ status: '0' }).limit(10).sort({ view: -1, hotPoint: -1 });
    let array = [arrayPost, arrPostLaster, arrPostViewed]
    return array
}


module.exports = { configValueSorting, queryArticle, valueTotalSeenPage }
