
require('./models/database');
const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 4000
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
var cookieParser = require('cookie-parser')
var expressLayouts = require('express-ejs-layouts');
const socket = require('socket.io');
const cron = require('node-cron');
var cors = require('cors')
var app = express();
var favicon = require('serve-favicon');


const server = require('http').createServer(app)
// const wss = new WebSocket.Server({ server: server, path: "/get-os" })


// admin Controller
const dashboardController = require('./controllers/admin/dashboardController');
const crawlerController = require('./controllers/admin/crawlerController');
// const rssFetcherController = require('./controllers/admin/rssFetcherController');
const contactUsController = require('./controllers/admin/contactUsController');
const settingController = require('./controllers/admin/settingController');
const loginController = require('./controllers/admin/loginController');
const manageTagController = require('./controllers/admin/manageTagController');
const osUtilsController = require('./controllers/admin/osUtilsController')
const classificationController = require('./controllers/admin/classificationController')
const sortingController = require('./controllers/admin/sortingController')
const pagesErrorController = require('./controllers/admin/pagesErrorController')
// front-end Controller
const middleware = require('./middleware');
const keywordAnalytics = require('./controllers/front-end/keywordAnalytics');

// admin service

const { collectOsMetric, averageFiveMinutes, removeOsMetricData } = require('./service/admin/osUtil')


app.use(cookieParser())
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extend: true }));
app.use(express.static(__dirname + '/public'));

app.use(favicon(__dirname + '/public/img/favicon.ico'));

// socker io init
const io = socket(server);
var getOs = io.of('/get-os');
getOs.on('connection', function (socket) {
    socket.on("disconnect", () => {
    });
});

// every 10s will run
cron.schedule('*/10 * * * * *', async function () {
    let new_value = await collectOsMetric()
    let update_value = { 'cpu': [{"x": new_value.time, "y": new_value.cpu.usagePer}], 'memory': [{"x": new_value.time, "y": new_value.memory.usagePer}] }
    getOs.emit('message', JSON.stringify(update_value));
});

// every 5 min will run
cron.schedule('0 */5 * * * *', async function () {
    await averageFiveMinutes()
});

// every 1 hour will run
cron.schedule('0 0 */1 * * *', async function () {
    await removeOsMetricData()
});


server.listen(port, () => {
    console.log('Express server started http://localhost:' + port);
});
app.use(cors())
app.use('/', loginController);
app.use('/', middleware);
app.use('/', dashboardController);
app.use('/', crawlerController);
// app.use('/', rssFetcherController);
app.use('/', contactUsController);
app.use('/', classificationController);
app.use('/', sortingController)
app.use('/', settingController);
app.use('/', osUtilsController);
app.use('/', manageTagController);
app.use('/',keywordAnalytics)
// app.use('/', homePageController);
// app.use('/', newsController);
// app.use('/', newsDetailController);
// app.use('/', keywordAnalytics);
// app.use('/', contacts);
// app.use('/', newsletter);
// app.use('/', playground);

// app.use('/', pagesErrorController);

