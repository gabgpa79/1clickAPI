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

  static sendMailVerificacion(user, fecha) {
    return new Promise((resolve, reject) => {
      Promise.all([EmpresaService.getEmpresa(1)]).then(([empresa]) => {
        Promise.all([sVerificacion(empresa, user, fecha)]).then(([mail]) => {
          resolve(mail);
        });
      });
    });
  }

  static sendMailAprobacionIngreso(cliente) {
    return new Promise((resolve, reject) => {
      Promise.all([EmpresaService.getEmpresa(1)]).then(([empresa]) => {
        Promise.all([sAprobacion(empresa, cliente)]).then(([mail]) => {
          resolve(mail);
        });
      });
    });
  }

  static sendMailAprobacionCliente(user) {
    return new Promise((resolve, reject) => {
      Promise.all([EmpresaService.getEmpresa(1)]).then(([empresa]) => {
        Promise.all([sApr(empresa, user)]).then(([mail]) => {
          resolve(mail);
        });
      });
    });
  }

  static sendRestore(user, fecha) {
    return new Promise((resolve, reject) => {
      Promise.all([EmpresaService.getEmpresa(1)]).then(([empresa]) => {
        Promise.all([sRestore(empresa, user, fecha)]).then(([mail]) => {
          resolve(mail);
        });
      });
    });
  }
}

function sRestore(empresa, user, fecha) {
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

    let mailOptions = {
      to: user.email,
      subject: `Resestablecer Usuario`,
      html: `<body><h2>Hola ${user.nombres} ,</h2>      
      <p>Solicito la modificación de acceso al sistema.</p>      
      <p>Ingrese al siguiente enlace para cambiar sus datos de acceso</p>
      <p>             
         <a href="${hostname}/restore/${fecha}Wser&TreWq20200704xmlm80033GaBg1=${(user.id + 4745) * 3
        }">Resetear Contraseña</a>    
      </p>     
      <p></p>
      <p></p>
      <p></p>
      <p>El equipo 1click-bo.com</p>
      <p>Si no es usted reporte directamente a este LINK.</p>
      </body>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({ mail: "error" });
      }
      resolve({ mail: "ok" });
    });
  });
}

function sApr(empresa, user) {
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

    let mailOptions = {
      to: user.email,
      subject: `Solicitud Aprobada`,
      html: `<body><h2>Hola ${user.nombres} ,</h2>            
      <p>Ahora ya podes acceder a tu panel de control. </p>      
      <p>
      <a href="${hostname}/login">Iniciar Login</a>         
      </p>
      <p>En esta dirección de correo recibirás solo lo importante. </p>            
      <p>El equipo 1Click</p>
      </body>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({ mail: "error" });
      }
      resolve({ mail: "ok" });
    });
  });
}

function sVerificacion(empresa, user, fecha) {
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

    let mailOptions = {
      to: user.email,
      subject: `Confirma tu cuenta para continuar`,
      html: `<body><h2>Hola ${user.username} ,</h2>      
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
      </body>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({ mail: "error" });
      }
      resolve({ mail: "ok" });
    });
  });
}

function sAprobacion(empresa, cliente) {
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

    let mailOptions = {
      to: cliente.email,
      subject: `Bienvenido a 1Click`,
      html: `<body>      
      <h3>Estimado cliente, ${cliente.nombres}</h3>      
      <p>Ahora forma parte de 1Click, tu empresa puede ser, buscada, contactada y consultada en nuestra APP.</p>
      <p>Para ingresar a la plataforma de administración de su empresa puede consultar el siguiente LINK:</p>
      <p>      
       <a href="${hostname}/login">Ingreso a Plataforma</a>         
      </p>
      <p>En esta dirección de correo recibirás solo lo importante. </p>      
      <p></p>
      <p>El equipo 1Click</p>
      </body>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve({ mail: "error" });
      }
      resolve({ mail: "ok" });
    });
  });
}

function createPdfPedido(user, nota) {
  let img = `http://${hostname}:${port}/api/static/images/empresa/md/logoin.png`;
  let im = `http://${hostname}:${port}/api/static/images/notas/md/${nota.imagen}`;

  pdf
    .create(pdfPedido(user, nota, img, im), {})
    .toFile(`${process.cwd()}/api/documents/nota.pdf`, (err) => {
      if (err) {
        return err;
      }
      return 0;
    });
}

function getAllMensajes(id, page, num) {
  return new Promise((resolve, reject) => {
    let der = num * page - num;
    Mensaje.findAndCountAll({
      raw: true,
      nest: true,
      offset: der,
      limit: num,
      order: [["id", "DESC"]],
      where: { usuarioId: Number(id) },
    }).then((mensajes) =>
      resolve({
        paginas: Math.ceil(mensajes.count / num),
        pagina: page,
        total: mensajes.count,
        data: mensajes.rows,
      })
    );
  });
}

export default MailController;
