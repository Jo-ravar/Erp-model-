var router = require('express').Router();
var custOrderSchema = require('../models/customerorder');
var custProSchema = require('../models/custproduct');
var moment = require('moment'); 
var mongoose = require('mongoose');


router.route('/')
 .post(function (req,res){
  if(!req.body.date)
  {
    res.json({ success: false, message: 'Please enter date.'});
  }
else{  
      var D= moment(req.body.date);
      var Des= Date.parse(D.format('YYYY-MM-DD'));
      var dates=new Date(Des).toISOString();
      console.log(" Date "+dates);
     custOrderSchema.find({date:dates},function(err,data){
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

router.route('/name')
 .post(function (req,res){
  if(!req.body.custname)
  {
    res.json({ success: false, message: 'Please enter customer name.'});
  }
   else{  
     custOrderSchema.find({cust_name:req.body.custname},function(err,data){
             if (err) {
                       console.error(JSON.stringify(err));
                      res.json({ success: false, message: 'Something went wrong.'});
                     }
                else {
                      console.log("Orders Data Send ");
                      res.send(data);
                      }
            });
       }
 });




router.route('/add')
 .post(function(req,res){
  
  if(!req.body.custname  || !req.body.order){
         res.json({ success: false, message: 'Please enter customername and order .' });
  }else{
        var str =req.body.order;
        var str =str.toLowerCase();
        var myArray =str.split( ',');
        var check=0;
        var boolcheck; 
       
        var orderss = [];
           for(var i=0; i<myArray.length;i=i+2)
        {
              var obj=myArray[i].trim();
              console.log("Elemnts at "+(i+1)+" is "+myArray[i]);
              boolcheck=isNaN(myArray[i+1]);
          if(boolcheck)
           {
             check=1;
             break;
           }
          else{orderss.push({
            "vegetable":String(obj),
             "quantity":Number(myArray[i+1])
          });
        }
     }
   if(check===1)
   {
      res.json({ success: false, message: 'Please place order in correct format'});
   }
   else{
     var Dates;
     if(!req.body.date)
     {
       Dates=req.body.date;
     }
    else{ 
    console.log(req.body.date);
    var D= moment(req.body.date);
     Dates= D.format('YYYY-MM-DD');
    console.log(" Date "+Dates);
    }
     var newOrder = new custOrderSchema({
          cust_name: req.body.custname,
          date:Dates,
          orders:orderss
      });
      newOrder.save(function(err,result) {
      if (err) {
         console.log("Error in insert " + JSON.stringify(err));
        return res.json({ success: false, message: 'Something went wrong.'});
      }
      else
      {  
          console.log("Insert Successful " + JSON.stringify(result));
          res.json({ success: true, message: 'Successfully Placed new order.' });
      }
    });

   } 
  }
});


router.route('/edit')
.post(function(req,res){
  
  if(!req.body.custname  || !req.body.order){
         res.json({ success: false, message: 'Please enter customername and order .' });
  }else{
       var str =req.body.order;
       var str =str.toLowerCase();
       var myArray =str.split( ',');
       var check=0;
       var boolcheck; 
       
       var orderss = [];
         for(var i=0; i<myArray.length;i=i+2)
       {
          var obj=myArray[i].trim();
          console.log("Elemnts at "+(i+1)+" is "+myArray[i]);
          boolcheck=isNaN(myArray[i+1]);
          if(boolcheck)
           {
             check=1;
             break;
           }
          else{orderss.push({
            "vegetable":String(obj),
             "quantity":Number(myArray[i+1])
          });
        }
      }
   if(check===1)
   {
      res.json({ success: false, message: 'Please place order in correct format'});
   }
   else{
         var Dates;
           if(!req.body.date)
           {
              Dates=req.body.date;
           }
        else{ 
             console.log(req.body.date);
             var D= moment(req.body.date);
             Dates= D.format('YYYY-MM-DD');
             console.log(" Date "+Dates);
           }
     var newOrder = {
          cust_name: req.body.custname,
          date:Dates,
          orders:orderss
      };
       var id=req.query.id;
      console.log(" id "+id);
       var query= {_id:id};
    custOrderSchema.update(query, {$set:newOrder},{new:false},function(err,result) {
      if (err) {
         console.log("Error in Editing " + JSON.stringify(err));
        return res.json({ success: false, message: 'Something went wrong.'});
      }
      else
      {  
          console.log("Editing Successful " + JSON.stringify(result));
          res.json({ success: true, message: 'Successfully Edited.' });
      }
    });

   } 
  }
});

router.route('/delete')
 .delete(function(req,res){
       var id=req.query.id;
      console.log(" id "+id);
       var query= {_id:id};
       custOrderSchema.remove(query,function(err,result){
          if (err) {
         console.log("Error in deleting " + JSON.stringify(err));
        return res.json({ success: false, message: 'Deletion failed'});
      }else{
           console.log("Deletion Successful " + JSON.stringify(result));
          res.json({ success: true, message: 'Successfully Deleted.' });
      }
      });
  });




router.route('/totalveg')
.post(function(req,res){
    if(!req.body.date){
         res.json({ success: false, message: 'Please select date .'});
 }
else{
      var D= moment(req.body.date);
      var Des= Date.parse(D.format('YYYY-MM-DD'));
      var dates=new Date(Des).toISOString();
          console.log(" Date "+dates);
 custOrderSchema.aggregate([{$match:{date:new Date(dates)}},{$unwind:'$orders'},{$group:{_id:"$orders.vegetable",packets:{$push:"$orders.quantity"}}}]).exec(function(err,data){
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

router.route('/genbill')
  .post(function(req,res){

  var id=req.query.id;
  if(!req.query.id){
       res.json({ success: false, message: 'Please attach id.'});
  }else{
        
  custOrderSchema.findById(id,function(err,data){
             if (err) {
                    console.error(JSON.stringify(err));
                  res.json({ success: false, message: 'Something went wrong.'});
                }
                else {
                        console.log("Old data "+data);
                        var newData= addprice(data);
                        console.log(" newData "+newData);
                        res.send(newData);
                     }
            });    
  }
});



  function addprice(data)
  {
     var i=0;
    while(i<data.orders.length){
            console.log("name  "+data.orders[i].vegetable);
            var query={pro_name:data.orders[i].vegetable};
         custProSchema.find(query,function(err,result){
             if (err) {
                    console.error(JSON.stringify(err));
                }
                else {
                       console.log(" Result "+result.length);
                        if(result.length>0)
                        {
                        data.orders[i].price=result[0].price;
                        console.log(" orders "+i+" "+data.orders[i].price);
                    }else{
                         data.orders[i].price=0;
                        console.log(" orders "+i+" "+data.orders[i].price);
                       }
                }
            });
            require('deasync').sleep(100);
            i++;
     }
       return data;   
  }

module.exports = router;   