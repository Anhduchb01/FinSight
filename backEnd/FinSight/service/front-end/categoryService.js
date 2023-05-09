const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Category = mongoose.model("Category")
const Post = mongoose.model("Post")

async function getCategories(){
    const categoryArray = []
    const countCategory = await Post.aggregate([ {$match: {$and: [{ status: { $in: ['0'] } },],},
      }, {"$group": {_id:"$category",  count:{$sum:1}}}, {"$sort": { count: -1 } }])
    for ( let category_id of countCategory){
        categoryArray.push({"name": category_id._id, "count": category_id.count})
    }
    return categoryArray
}

module.exports = { getCategories }