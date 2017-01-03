var router = require('express').Router();
var storeOrderSchema = require('../models/storeorder');
var stProSchema = require('../models/storeproduct');
var storeSchema = require('../models/store');
var bill=require('../utilities/storebillPdf');
var challan=require('../utilities/challanPdf');
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
      storeOrderSchema.find({date:dates},function(err,data){
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
  if(!req.body.storename)
  {
    res.json({ success: false, message: 'Please enter store name.'});
  }
   else{  
     var str=req.body.storename.toUpperCase();
       storeOrderSchema.find({store_name:str},function(err,data){
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




router.route('/add')
 .post(function(req,res){
  
  if(!req.body.storename  || !req.body.order){
         res.json({ success: false, message: 'Please enter storename and order .' });
  }else{
        var str =req.body.order;
        var atr =str.toUpperCase();
        var myArray =atr.split( ',');
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
    var stornm=req.body.storename.toUpperCase();
     var newOrder = new storeOrderSchema({
          store_name: stornm,
          date:Dates,
          orders:orderss,
          origorder:str
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
  
  if(!req.body.storename  || !req.body.order){
         res.json({ success: false, message: 'Please enter storename and order .' });
  }else{
       var str =req.body.order;
       var atr =str.toUpperCase();
       var myArray =atr.split( ',');
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
          var stornm=req.body.storename.toUpperCase();  
     var newOrder = {
          store_name: stornm,
          date:Dates,
          orders:orderss,
          origorder:str
      };
       var id=req.query.id;
      console.log(" id "+id);
       var query= {_id:id};
      storeOrderSchema.update(query, {$set:newOrder},{new:false},function(err,result) {
      if (err) {
         console.log("Error in Editing " + JSON.stringify(err));
        return res.json({ success: false, message: 'Something went wrong.'});
      }
      else
      {  
          console.log("Insert Successful " + JSON.stringify(result));
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
       storeOrderSchema.remove(query,function(err,result){
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
 storeOrderSchema.aggregate([{$match:{date:new Date(dates)}},{$unwind:'$orders'},{$group:{_id:"$orders.vegetable",packets:{$push:"$orders.quantity"}}}]).exec(function(err,data){
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
  .get(function(req,res){

  var id=req.query.id;
  if(!req.query.id){
       res.json({ success: false, message: 'Please attach id.'});
  }else{
        
   storeOrderSchema.findById(id,function(err,data){
             if (err) {
                    console.error(JSON.stringify(err));
                  res.json({ success: false, message: 'Something went wrong.'});
                }
                else {
                        console.log("Old data "+data);
                        var newData= addprice(data);
                        console.log(" newData "+newData);
                       var date = new Date(newData.date);
                      var dateStr=date.getDate()+'/'+(date.getMonth()+1) + '/'+date.getFullYear() ;  
                      console.log(" date "+dateStr);
                      var newadd=address(newData);
                       console.log(" address "+newadd);
                      var total=0;
                      for(var i=0; i<newData.orders.length;i++)
                          total=total+newData.orders[i].total;

                      console.log(" total "+total);  
                      var pdf=bill.billpdf(newData,newadd,dateStr,total); 
                      pdf.pipe(res);
                      pdf.end(); 

    
                     }
            });    
        }
    });

router.route('/genchallan')
 .get(function(req,res){
 var id=req.query.id;
  if(!req.query.id){
       res.json({ success: false, message: 'Please attach id.'});
  }
  else{
     storeOrderSchema.findById(id,function(err,data){
             if (err) {
                    console.error(JSON.stringify(err));
                  res.json({ success: false, message: 'Something went wrong.'});
                }
                else {
                        console.log("Old data "+data);
                        
                       var date = new Date(data.date);
                      var dateStr=date.getDate()+'/'+(date.getMonth()+1) + '/'+date.getFullYear() ;  
                      console.log(" date "+dateStr);
                      var newadd=address(data);
                       console.log(" address "+newadd);
                      var pdf=challan.billpdf(data,newadd,dateStr); 
                      pdf.pipe(res);
                      pdf.end(); 

    
                     }
            });    
  }

 });


function address(data)
{
  var address="No address Present";
  storeSchema.find({store_name:data.store_name},function(err,data){
             if (err) {
                       console.error(JSON.stringify(err));
                    
                     }
                else {
                      console.log("data "+data[0].address);
                      if(data.length>0)
                    address=data[0].address;
                      }
            });
              require('deasync').sleep(100);

            return address;
}

  function addprice(data)
  {
     var i=0,total=0;
    while(i<data.orders.length){
            console.log("name  "+data.orders[i].vegetable);
            var query={pro_name:data.orders[i].vegetable};
         stProSchema.find(query,function(err,result){
             if (err) {
                    console.error(JSON.stringify(err));
                }
                else {
                       console.log(" Result "+result.length);
                        if(result.length>0)
                        {
                        data.orders[i].price=result[0].price;
                        data.orders[i].total=(data.orders[i].price*data.orders[i].quantity);
                        console.log(" orders "+i+" "+data.orders[i].total);
                    }else{
                         data.orders[i].price=0;
                         data.orders[i].total=(data.orders[i].price*data.orders[i].quantity);
                        console.log(" orderswith 0 "+i+" "+data.orders[i].total);
                       }
                }
            });
            require('deasync').sleep(100);
            i++;
     }
       return data;   
  }

module.exports = router;   