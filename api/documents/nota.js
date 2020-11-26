module.exports = ( user, nota, img, im) => {
const today = new Date();
const moment = require('moment');
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Nota</title>
          <style>
             .invoice-box {
             max-width: 800px;             
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);             
             line-height: 10px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;             
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {                          
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             border: solid 1px #4d4d4d;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;             
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             .tit{
              font-weight: bold;
              border: solid #eaeaea 1px;
              font-size: 0.6rem;
             }
             .cnt{              
              text-align: left;
              border: solid #eaeaea 1px;
              font-size: 0.6rem;
             }
             .fecha{              
              text-align: left;              
              font-size: 0.6rem;
             }
             .h5{
                text-align: center;
                margin: 0 auto;
             }
             .table-basica{
              margin-top: 20px;
              border: solid 1px #eaeaea;
              font-size: 0.6rem;
             }

             .logo{
                         
             }
             .logo img{              
              margin-top: 5px;
              margin-right: 5px;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>    
        <div class="logo">
        <img src="${img}" border="0" alt="logo" width="100" height="40">
        </div>            
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr>
                  <td class="fecha">
                    Fecha Nota: ${moment().format('DD-MM-YYYY HH:mm:ss')}
                  </td>
                  <td>
    
                  </td>
                </tr>                
              </table>  

              <h5>NOTA N° ${nota.id}</h5>              
              <table cellpadding="0" cellspacing="0">
                <tr>                   
                  <td width="15%" class="tit">Nro:</td>
                  <td width="35%" class="cnt">${nota.id}</td>
                  <td width="15%" class="tit">Monto:</td>
                  <td width="35%" class="cnt">${nota.monto} $US</td>
                </tr>
                <tr>
                  <td width="15%" class="tit">Usuario:</td>
                  <td colspan="3" width="85%" class="cnt">${user.nombres}</td>                                    
                </tr>                 
              </table>                          
          </div>  
          <div class="invoice-box">
            <h5><b>Comprobante Adjunto</b></h5>  
            <img src="${im}" border="0" alt="logo" width="500" height="340">                          
          </div>        
       </body>
    </html>
    `;
};