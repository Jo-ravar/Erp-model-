var router = require('express').Router();
var uniquenum=0;
var arr = [];
 module.exports = {
 uniqueNumber: function() {
  var date =new Date();
  var dateStr=date.getDate()+(date.getMonth()+1)+date.getFullYear() ;
  dateStr=dateStr+783; 
  console.log(" datestr "+dateStr);
  while(1)
  {
      
    if(arr.indexOf(dateStr) > -1){
        dateStr++;
        continue; 
    } 
    else
    {
        arr.push(dateStr);
        uniquenum=dateStr;
        console.log(" unique number "+uniquenum);
        break;  
    }  
  }
  return uniquenum;
}
}