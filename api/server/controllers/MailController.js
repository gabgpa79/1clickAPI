import model from "../src/models";
import nodeMailer from "nodemailer";

import EmpresaService from "../services/EmpresaService";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const path = require("path");
const pdf = require("html-pdf");
const hostname = "http://localhost:3000";
const port = 4000;
const { Mensaje } = model;

class MailController {
  /*Metodos
   * getMensajesUsuario(page,num)
   * sendPedido(compraId,email)
   */

  
  static sendMail(tipo, user, fecha) {
    return new Promise((resolve, reject) => {      
      Promise.all([EmpresaService.getEmpresa(1)]).then(([empresa]) => {
        Promise.all([enviar(tipo, empresa, user, fecha)]).then(([mail]) => {
          resolve(mail);
        });
      });
    });
  }
}

function enviar(tipo, empresa, user, fecha) {  
  return new Promise((resolve, reject) => {
    let transporter = nodeMailer.createTransport({
      host: empresa.smtpHost,
      port: empresa.smtpPort,
      secure: true,
      auth: {
        user: empresa.smtpUser,
        pass: empresa.smtpPassword,
      },
    });
    let template = ""
    let templateMsg = ""
    let emailUser = ""

    switch(tipo){
      case "registro":
        template    = registro(user,hostname,fecha);
        templateMsg = "Confirma tu cuenta";
        emailUser   = user.email;
      break;
      case "aprobacion":
        template    = aprobacion(user,hostname,fecha);
        templateMsg = "Confirma tu cuenta";  
        emailUser   = user.email;
      break;
      case "panico":
        template    = panico(user);
        templateMsg = "Alerta !! última confirmación";  
        emailUser   = user.refemail;
      break;  
    }
   
    let mailOptions = {
      to: emailUser,
      subject: templateMsg,
      html: template
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({ mail: "error" });
      }
      resolve({ mail: "ok" });
    });
  });
}

function registro(user,hostname,fecha){
  let template =`<body><h2>Hola ${user.username} ,</h2>      
                  <p>Para empezar a usar 1Click confirma tu correo, por favor.</p>
                  <p>      
                  <a href="${hostname}/verificar/${fecha}Wser&TreWq20200704xmlm80033GaBg1=${(user.id + 4745) * 3
                    }">Confirma Mail</a>         
                  </p>
                  <p>En esta dirección de correo recibirás solo lo importante. </p>
                  <p>Confírmala lo antes posible para empezar a usar 1Click. </p>
                  <p>No compartiremos tus datos con nadie y no te enviaremos correos no deseados, 
                  ¡lo prometemos! </p>      
                  <p>El equipo 1Click</p>
                </body>`
  return template                  
}

function aprobacion(user,hostname,fecha){
  let template =`<body><h2>Hola ${user.nombres} ,</h2>            
                <p>Ahora ya podes acceder a tu panel de control. </p>      
                <p>
                <a href="${hostname}/login">Iniciar Login</a>         
                </p>
                <p>En esta dirección de correo recibirás solo lo importante. </p>            
                <p>El equipo 1Click</p>
                </body>`
  return template                  
}

function panico(user){  
  let fecha = new Date()
  let template =`<body><h2>Hola ${user.refnombre} ,</h2>            
                <p>Posiblemente el la persona ${user.nombre} , necesita mandar su ubicación para mantenerlo informado. </p>
                <p>Hora: ${fecha}  </p>
                <p> 
                <a href="https://www.google.com/maps/place/${user.latitude},${user.longitude}">Ultimo punto</a>         
                </p>
                <p>Si recibes este mail, seguramente quieren que sepas donde esta ubicado. </p>
                <p>Comunicate de forma inmediata. </p>                  
                <p>El equipo 1Click</p>
                </body>`
  return template                  
}

export default MailController;
