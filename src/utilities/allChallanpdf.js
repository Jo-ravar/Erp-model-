var router = require('express').Router();
var PDFDocument = require('pdfkit');
var PdfTable = require('voilab-pdf-table');
var fs=require('fs');
 

 module.exports = {
   billpdf : function(data,address,date,rand){
       var pdf = new PDFDocument({
                autoFirstPage: true
            });
for(var i=0; i<data.length;i++)
{ 
  var order=   [];
  for(var j=0; j<data[i].orders.length;j++)
  {
      order.push({
            "vegetable":String(data[i].orders[j].vegetable),
             "quantity":Number(data[i].orders[j].quantity).toFixed(2),
          });
  }
console.log( "Array "+order);
   var name=data[i].store_name.toUpperCase();
   var addrs=address[i].toUpperCase();
    
        
pdf.fontSize(30)
   .text('SaralHai ', 250, 80);
   pdf.fontSize(15)
   .text('INVOICE ', 450, 100);
    pdf.fontSize(13)
   .text('B-402 MOTI AVENUE,SCHEME 71,Gumasta Nagar ', 150, 130);
   pdf.fontSize(13)
   .text('INDORE(MADHYA PRADESH) ', 230, 150);
   pdf.fontSize(20)
   .text('CHALLAN:-- ',70, 190);
     pdf.fontSize(15)
     .font('Times-Roman')
   .text(name, 70, 220);
    pdf.fontSize(9)
   .text(addrs, 70, 240);
    pdf.fontSize(10)
   .text('Date: ', 400, 190);
     pdf.fontSize(10)
   .text(date[i], 450, 190);
    pdf.fontSize(10)
   .text('Invoice no. :  ', 400, 210);
     pdf.font('Helvetica-Bold')
     .fontSize(10)
   .text("  "+rand[i], 450, 210);
   pdf.font('Times-Roman')
   .fontSize(10)
   .text('Email: ', 400, 230);
    pdf.fillColor('blue')
       .fontSize(10)
        .text('info@saralhai.com ', 450, 230,{
              underline:true
        });
 pdf.fillColor('black')
  pdf.fontSize(10)
   .text('Website: ', 400, 250);
    pdf.fillColor('blue')
       .fontSize(10)
        .text('www.saralhai.com ', 450, 250,{
              underline:true
        });
 pdf.fillColor('black')
pdf.fontSize(10)
   .text('Contact: ', 400, 270);
   pdf.fontSize(10)
   .text('7047985752 ', 450, 270)
    .moveDown(2.0);
pdf.fontSize(12)
            var table = new PdfTable(pdf, {
                bottomMargin: 30
            });
        table
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'
            }))
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'right'
            })
            .addColumns([
            
                 {
                    id: "vegetable",
                    header: 'Description',
                    align:'left',
                     width: 350
                },
                {
                    id: "quantity",
                    header: 'Quantity(kg/pc)',
                    width: 90
                },
            
                
            ])
           
        table.addBody(order);

pdf.moveDown(1.5);
var y= pdf.y;
pdf.font('Times-Italic')
.fontSize(15)
.text("Happy Ordering!",250,y);
 pdf.font('Times-Roman')
 
if(i<data.length-1) 
pdf.addPage();

}
   return pdf;
}

} 