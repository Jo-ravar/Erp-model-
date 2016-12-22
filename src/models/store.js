var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var storeSchema = new Schema({
    store_name:{type:String, required:true},
    number:Number,
    email_id:{type:String,required:true,unique:true},
    owner_name:String,
    address:String

});
module.exports = mongoose.model('store',storeSchema);