var router = require('express').Router();
var storeSchema = require('../models/store');
var mongoose = require('mongoose');


router.route('/')
 .get(function (req,res){
       storeSchema.find({},function(err,data){
             if (err) {
                    console.error(JSON.stringify(err));
                    res.redirect('/');
                }
                else {
                      console.log("Stores Data Send ");
                        res.send(data);
                }
            });
       })

router.route('/add')
 .post(function(req,res){
  
  if(!req.body.storename || !req.body.email){
         res.json({ success: false, message: 'Please enter email and Store Name.' });
  }else{
      var newStore = new storeSchema({
          store_name: req.body.storename,
          email_id:req.body.email,
          owner_name:req.body.ownername,
          address:req.body.address,
          number:req.body.number
      });
      newStore.save(function(err,result) {
      if (err) {
         console.log("Error in insert " + JSON.stringify(err));
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      else
      {  
          console.log("Insert Successful " + JSON.stringify(result));
          res.json({ success: true, message: 'Successfully created new store.' });
      }
    });

  }
});

router.route('/edit')
 .post(function(req,res){
     if(!req.body.storename || !req.body.email){
         res.json({ success: false, message: 'Please enter email and Store Name.' });
  }else{
      var newData={
          store_name: req.body.storename,
          email_id:req.body.email,
          owner_name:req.body.ownername,
          address:req.body.address,
          number:req.body.number
      };
      var id=req.query.id;
      console.log(" id "+id);
    
      var query= {_id:id};
      storeSchema.update(query, {$set:newData},{new:false},function(err,result){
           if (err) {
         console.log("Error in Editing " + JSON.stringify(err));
        return res.json({ success: false, message: 'That email address already exists.'});
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
      storeSchema.remove(query,function(err,result){
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