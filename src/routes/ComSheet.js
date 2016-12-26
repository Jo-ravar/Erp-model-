var router = require('express').Router();
var storeOrderSchema = require('../models/storeorder');
var custOrderSchema = require('../models/customerorder');
var moment = require('moment'); 
var mongoose = require('mongoose');

router.route('/str')
.post(function(req,res){
    if(!req.body.startDate || !req.body.endDate)
  {
    res.json({ success: false, message: 'Please enter both dates.'});
  }
else{  
      var SD= moment(req.body.startDate).subtract(1, "days");
      var StDes= Date.parse(SD.format('YYYY-MM-DD'));
      var startDates=new Date(StDes).toISOString();

      var ED=moment(req.body.endDate);
      var EtDes= Date.parse(ED.format('YYYY-MM-DD'));
      var endDates=new Date(EtDes).toISOString();

      console.log(" startDate "+startDates+" endDate "+endDates);
      storeOrderSchema.find({date:{$gt:startDates,$lte:endDates}},function(err,data){
      if (err) {
                console.error(JSON.stringify(err));
                res.redirect('/');
                }
                else {
                console.log("Orders Data Send ");
                res.send(data);
                }
      });
    }

});

router.route('/strveg')
.post(function(req,res){
 if(!req.body.startDate || !req.body.endDate)
  {
    res.json({ success: false, message: 'Please enter both dates.'});
  }
 else
 {
      var SD= moment(req.body.startDate).subtract(1, "days");
      var StDes= Date.parse(SD.format('YYYY-MM-DD'));
      var startDates=new Date(StDes).toISOString();

      var ED=moment(req.body.endDate);
      var EtDes= Date.parse(ED.format('YYYY-MM-DD'));
      var endDates=new Date(EtDes).toISOString();

   storeOrderSchema.aggregate([{$match:{date:{$gt:new Date(startDates),$lte:new Date(endDates)}}},{$unwind:'$orders'},{$group:{_id:"$orders.vegetable",packets:{$push:"$orders.quantity"}}}]).exec(function(err,data){
      if (err) {
         console.log("Error in sending " + JSON.stringify(err));
        return res.json({ success: false, message: 'Something went wrong.'});
      }
      else
      {  
          console.log("aggregation Successful " + JSON.stringify(data));
          res.send(data);
      }  
 });  

 } 
});

router.route('/cust')
.post(function(req,res){
    if(!req.body.startDate || !req.body.endDate)
  {
    res.json({ success: false, message: 'Please enter both dates.'});
  }
else{  
      var SD= moment(req.body.startDate).subtract(1, "days");
      var StDes= Date.parse(SD.format('YYYY-MM-DD'));
      var startDates=new Date(StDes).toISOString();

      var ED=moment(req.body.endDate);
      var EtDes= Date.parse(ED.format('YYYY-MM-DD'));
      var endDates=new Date(EtDes).toISOString();

      console.log(" startDate "+startDates+" endDate "+endDates);
     custOrderSchema.find({date:{$gt:startDates,$lte:endDates}},function(err,data){
      if (err) {
                console.error(JSON.stringify(err));
                res.redirect('/');
                }
                else {
                console.log("Orders Data Send ");
                res.send(data);
                }
      });
    }

});

router.route('/custveg')
.post(function(req,res){
 if(!req.body.startDate || !req.body.endDate)
  {
    res.json({ success: false, message: 'Please enter both dates.'});
  }
 else
 {
      var SD= moment(req.body.startDate).subtract(1, "days");
      var StDes= Date.parse(SD.format('YYYY-MM-DD'));
      var startDates=new Date(StDes).toISOString();

      var ED=moment(req.body.endDate);
      var EtDes= Date.parse(ED.format('YYYY-MM-DD'));
      var endDates=new Date(EtDes).toISOString();

   custOrderSchema.aggregate([{$match:{date:{$gt:new Date(startDates),$lte:new Date(endDates)}}},{$unwind:'$orders'},{$group:{_id:"$orders.vegetable",packets:{$push:"$orders.quantity"}}}]).exec(function(err,data){
      if (err) {
         console.log("Error in sending " + JSON.stringify(err));
        return res.json({ success: false, message: 'Something went wrong.'});
      }
      else
      {  
          console.log("aggregation Successful " + JSON.stringify(data));
          res.send(data);
      }  
 });  

 } 
});


module.exports = router;   