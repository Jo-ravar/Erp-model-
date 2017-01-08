var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stProSchema = new Schema({
    pro_name:{type:String,required:true,unique:true},
    price:Number,
   });

module.exports = mongoose.model('storeProduct',stProSchema);