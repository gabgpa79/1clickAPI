import model from '../src/models'
import nodeMailer from 'nodemailer'

import pdfPedido from '../../documents/pedido'

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const path = require('path');
const pdf = require('html-pdf');
const hostname = 'localhost'
const port = 4000
const { Mensaje } = model;

class MensajesController{	
	/*Metodos
  * getMensajesUsuario(page,num)
  * sendPedido(compraId,email)
	*/
		
	/* Interfaces */
  static sendMailVerificacion(token,user) {          
    return new Promise((resolve, reject) => {           
           Promise.all([ sVerificacion(user,token)])
            .then(([mail]) =>{              
              resolve(mail) 
          })           
    })
  }

}

function sVerificacion(user,token) {
  return new Promise((resolve, reject) => {    
   let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth:{
        user: 'beggugb@gmail.com',
        pass: 'ileana800'

      }
    });

    let mailOptions = {
      to: user.email,
      subject: `Orden de Compra N° ${user.nombres}`,      
      html:`<body><h3>Orden de Compra N° ${user.id}</h3>
      <p>Solicitamos los productos descritos en el archivo adjunto</p>
      <p>Quedamos atentos a su respuesta</p>
      <p></p>
      <p><b>Email:</b>info@beguu.com</p>
      <p><b>Web:</b>info@beguu.com</p>
      </body>`,      
      attachments: [
        {   
            filename: 'compra.pdf',
            path: `${process.cwd()}/api/documents/pedido.pdf`
        }]   
    };

    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){

        resolve({mail:'error'})
      }      
        resolve({mail:'ok'})
        
    });
  })
}


function createPdfPedido(item, items) {      
  let img = `http://${hostname}:${port}/api/static/images/empresa/md/logoin.png`;   
    pdf.create(pdfPedido(item,items,img), {}).toFile(`${process.cwd()}/api/documents/pedido.pdf`, (err) => {
      if(err) {      
      return err
      }       
      return 0
      }   
    ) 
}

function getAllMensajes(id, page, num) {
  return new Promise((resolve, reject) => {        
    let der = (num * page) - num;    
   Mensaje
   .findAndCountAll({
    raw:true,
      nest:true,
        offset: der,                
        limit: num,         
        order:  [['id', 'DESC'],],            
        where: { usuarioId: Number(id) }
      })
    .then(mensajes =>
        resolve({'paginas':(Math.ceil(mensajes.count/num)),'pagina':page,'total':mensajes.count,'data': mensajes.rows }))   
  })    
}

export default MensajesController;