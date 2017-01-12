var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var storeOrderSchema = new Schema({
    store_name:{type:String, required:true},
    date :{type:Date ,default:moment(new Date()).format('YYYY-MM-DD')},
    origorder:{type:String, required:true},
    invoice:{type:String, required:true},
    orders : [{
    vegetable : String,
    quantity : Number,
    price:Number,
    total:Number
     }]
});
module.exports = mongoose.model('storeorder',storeOrderSchema);