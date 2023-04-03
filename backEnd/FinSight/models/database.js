const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(`${process.env.DB_URL}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true, }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.'+`${process.env.DB_URL}`) }
    else { console.log('Error in DB connection : ' + err) }
});





require('./category.model');
require('./categorymap.model');
require('./configcrawler.model');
require('./configquerydefault.model');
require('./contacts.model');
require('./crawler.model');
require('./keywordcrawler.model');
require('./logger.model');
require('./model.model')
require('./post.model');
require('./schedule.model');
require('./users.model');





