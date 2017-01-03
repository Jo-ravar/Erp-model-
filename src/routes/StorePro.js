var router = require('express').Router();
var stProSchema = require('../models/storeproduct');
var mongoose = require('mongoose');

router.route('/')
 .get(function (req,res){
      stProSchema.find({},function(err,data){
             if (err) {
                    console.error(JSON.stringify(err));
                    res.redirect('/');
                }
                else {
                      console.log("Stores Products Data Send ");
                        res.send(data);
                }
            });
       });

router.route('/add')
 .post(function(req,res){
  
  if(!req.body.productname || !req.body.price){
         res.json({ success: false, message: 'Please enter productname and price.' });
  }else{
       var str= req.body.productname;  
       str=str.toUpperCase();
      var newProduct = new stProSchema({
          pro_name: str,
          price:req.body.price
      });
      newProduct.save(function(err,result) {
      if (err) {
         console.log("Error in insert " + JSON.stringify(err));
        return res.json({ success: false, message: 'That product already exists.'});
      }
      else
      {  
          console.log("Insert Successful " + JSON.stringify(result));
          res.json({ success: true, message: 'Successfully added new product.' });
      }
    });

  }
});

router.route('/edit')
 .post(function(req,res){
    if(!req.body.productname || !req.body.price){
         res.json({ success: false, message: 'Please enter productname and price.' });
  }else{
        var str= req.body.productname;  
       str=str.toUpperCase();
      var newData={
         pro_name: str,
         price:req.body.price
      };

      var id=req.query.id;
      console.log(" id "+id);
       var query= {_id:id};
    stProSchema.update(query, {$set:newData},{new:false},function(err,result){
           if (err) {
         console.log("Error in Editing " + JSON.stringify(err));
        return res.json({ success: false, message: 'That product already exists.'});
      }else{
           console.log("Editing Successful " + JSON.stringify(result));
          res.json({ success: true, message: 'Successfully Edited.' });
      }
      });

  }

 });

 router.route('/delete')
  .delete(function(req,res){
       var id=req.query.id;
      console.log(" id "+id);
       var query= {_id:id};
      stProSchema.remove(query,function(err,result){
          if (err) {
         console.log("Error in deleting " + JSON.stringify(err));
        return res.json({ success: false, message: 'Deletion failed'});
      }else{
           console.log("Deletion Successful " + JSON.stringify(result));
          res.json({ success: true, message: 'Successfully Deleted.' });
      }
      });
  });

 module.exports = router;   
       