// Accessing mongoose package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost:27017/ShopDb');

// Schema definition
const Schema = mongoose.Schema;

var NewShopSchema = new Schema({
// ownerId:String,    
// shopNo :Number,
shopName:String,
shopCategory:String,
shopLocation:String,
contactNo : Number,
starRating: Number,

});

// model creation
var Shopdata = mongoose.model('shop',NewShopSchema);
module.exports = Shopdata;