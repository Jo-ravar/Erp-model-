var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var custProSchema = new Schema({
    pro_name:{type:String, required:true},
    price:Number,
   });

module.exports = mongoose.model('custProduct',custProSchema);