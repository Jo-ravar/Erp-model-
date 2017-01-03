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
       });


router.route('/name')
 .get(function (req,res){
       storeSchema.find({},{store_name:1, _id:0},function(err,data){
             if (err) {
                    console.error(JSON.stringify(err));
                    res.redirect('/');
                }
                else {
                      console.log("Stores Data Send ");
                      var name=new Array();
                      for (var i=0; i<data.length;i++)
                      {
                          name[i]=data[i].store_name;
                      }
                        res.send(name);
                }
            });
       });



router.route('/add')
 .post(function(req,res){
  
  if(!req.body.storename || !req.body.email){
         res.json({ success: false, message: 'Please enter email and Store Name.' });
  }else{
         var namestr= req.body.storename.toUpperCase();
         var addstr= req.body.address.toUpperCase();
         var email=req.body.email.toLowerCase();
         var ownstr=req.body.ownername.toUpperCase();
      var newStore = new storeSchema({
          store_name:namestr,
          email_id:email,
          owner_name:ownstr,
          address:addstr,
          number:req.body.number,
          store_id:req.body.storeid
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
         var namestr= req.body.storename.toUpperCase();
         var addstr= req.body.address.toUpperCase();
         var email=req.body.email.toLowerCase();
         var ownstr=req.body.ownername.toUpperCase();
      var newData={
          store_name:namestr,
          email_id:email,
          owner_name:ownstr,
          address:addstr,
          number:req.body.number,
          store_id:req.body.storeid
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