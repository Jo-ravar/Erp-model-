var router = require('express').Router();
var customerSchema = require('../models/customer');
var mongoose = require('mongoose');


router.route('/')
 .get(function (req,res){
       customerSchema.find({},function(err,data){
             if (err) {
                    console.error(JSON.stringify(err));
                    res.redirect('/');
                }
                else {
                      console.log("Customer Data send ");
                        res.send(data);
                }
            });
       })

router.route('/add')
 .post(function(req,res){
  
  if(!req.body.customername || !req.body.email){
         res.json({ success: false, message: 'Please enter email and Customer Name.' });
  }else{
      var newCustomer = new customerSchema({
          cust_name:req.body.customername,
          email_id:req.body.email,
          address:req.body.address,
          number:req.body.number
      });
      newCustomer.save(function(err,result) {
      if (err) {
         console.log("Error in insert " + JSON.stringify(err));
        return res.json({ success: false, message: 'That email address or number already exists.'});
      }
      else
      {  
          console.log("Insert Successful " + JSON.stringify(result));
          res.json({ success: true, message: 'Successfully created new customer.' });
      }
    });

  }
});

router.route('/edit')
 .post(function(req,res){
     if(!req.body.customername || !req.body.email){
         res.json({ success: false, message: 'Please enter email and Store Name.' });
  }else{
      var newData={
          cust_name:req.body.customername,
          email_id:req.body.email,
          address:req.body.address,
          number:req.body.number
      }; 
      var id=req.query.id;
      console.log(" id "+id);
    
      var query= {_id:id};
       customerSchema.update(query, {$set:newData},{new:false},function(err,result){
           if (err) {
         console.log("Error in Editing " + JSON.stringify(err));
        return res.json({ success: false, message: 'That email address or number already exists.'});
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
       customerSchema.remove(query,function(err,result){
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