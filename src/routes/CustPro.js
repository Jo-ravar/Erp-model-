var router = require('express').Router();
var custProSchema = require('../models/custproduct');
var mongoose = require('mongoose');

router.route('/')
 .get(function (req,res){
       custProSchema.find({},function(err,data){
             if (err) {
                    console.error(JSON.stringify(err));
                    res.redirect('/');
                }
                else {
                      console.log("Customers Products Data Send ");
                        res.send(data);
                }
            });
       });

router.route('/add')
 .post(function(req,res){
  
  if(!req.body.productname || !req.body.price){
         res.json({ success: false, message: 'Please enter productname and price.' });
  }else{
      var newProduct = new  custProSchema({
          pro_name: req.body.productname,
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
      var newData={
         pro_name: req.body.productname,
         price:req.body.price
      };

      var id=req.query.id;
      console.log(" id "+id);
       var query= {_id:id};
     custProSchema.update(query, {$set:newData},{new:false},function(err,result){
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
      custProSchema.remove(query,function(err,result){
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
       