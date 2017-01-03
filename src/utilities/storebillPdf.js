var router = require('express').Router();
var PDFDocument = require('pdfkit');
var PdfTable = require('voilab-pdf-table');
var fs=require('fs');

 module.exports = {
   billpdf : function(data,address,date,total){
  var order=   [];
  for(var i=0; i<data.orders.length;i++)
  {
      order.push({
            "vegetable":String(data.orders[i].vegetable),
             "quantity":Number(data.orders[i].quantity).toFixed(2),
             "price":Number(data.orders[i].price).toFixed(2),
             "total":Number(data.orders[i].total).toFixed(2),
          });
  }
console.log( "Array "+order);
   var name=data.store_name.toUpperCase();
   var addrs=address.toUpperCase();
     var pdf = new PDFDocument({
                autoFirstPage: true
            });
        
pdf.fontSize(30)
   .text('SaralHai ', 250, 80);
   pdf.fontSize(15)
   .text('INVOICE ', 450, 100);
    pdf.fontSize(13)
   .text('B-402 MOTI AVENUE,SCHEME 71,Gumasta Nagar ', 150, 130);
   pdf.fontSize(13)
   .text('INDORE(MADHYA PRADESH) ', 230, 150);
   pdf.fontSize(20)
   .text('BILL:-- ',70, 190);
     pdf.fontSize(15)
     .font('Times-Roman')
   .text(name, 70, 220);
    pdf.fontSize(9)
   .text(addrs, 70, 240);
    pdf.fontSize(10)
   .text('Date: ', 400, 190);
     pdf.fontSize(10)
   .text(date, 450, 190);
   pdf.fontSize(10)
   .text('Email: ', 400, 210);
    pdf.fillColor('blue')
       .fontSize(10)
        .text('info@saralhai.com ', 450, 210,{
              underline:true
        });
 pdf.fillColor('black')
  pdf.fontSize(10)
   .text('Website: ', 400, 230);
    pdf.fillColor('blue')
       .fontSize(10)
        .text('www.saralhai.com ', 450, 230,{
              underline:true
        });
 pdf.fillColor('black')
pdf.fontSize(10)
   .text('Contact: ', 400, 250);
   pdf.fontSize(10)
   .text('7047985752 ', 450, 250)
    .moveDown(2.0);
pdf.fontSize(13)
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
                     width: 250
                },
                {
                    id: "quantity",
                    header: 'Quantity(kg)',
                    width: 70
                },
                {
                    id: 'price',
                    header: 'Price(Rs.)',
                    width: 60
                },
                {
                    id: 'total',
                    header: 'Total(Rs.)',
                    width: 70,
                    renderer: function (tb, data) {
                        return  data.total;
                    }
                } 
                
            ])
           
        table.addBody(order);

pdf.moveDown(0.5);
var y= pdf.y;
pdf.font('Helvetica-Bold')
.fontSize(15)
.text("Total :-- Rs. "+total.toFixed(2),400,y);
pdf.moveDown(1.0);
var y= pdf.y;
pdf.font('Times-Italic')
.fontSize(15)
.text("Happy Ordering!",250,y);

   return pdf;
}

 } 