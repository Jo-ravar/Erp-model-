var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    cust_name:{type:String,required:true,unique:true},
    number:{type:Number,unique:true},
    email_id:{type:String,required:true,unique:true},
    address:String

});
module.exports = mongoose.model('customer',customerSchema);