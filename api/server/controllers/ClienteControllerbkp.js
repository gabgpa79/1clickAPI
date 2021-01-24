import ClienteService from "../services/ClienteService";
import ModuloService from "../services/ModuloService";
import ProcesoService from "../services/ProcesoService";
import EmpresaService from "../services/EmpresaService";
import SucursalService from "../services/SucursalService";
import HorarioService from "../services/HorarioService"
import MailController from "./MailController";

import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt-nodejs");

class ClienteControllers {

  static restore(req, res) {     
    var d = new Date()
    var formatted = (new Date(d + 'UTC')).toISOString().replace(/-/g, '').split('T')[0] 
    Promise.all([ ClienteService.verificarEmail(req.body.email)])
      .then(([usuario]) =>{
        if(usuario){
          Promise.all([ 
            MailController.sendRestore(usuario,formatted),
            ProcesoService.add('solicitud de cambio de contraseña',usuario.id)
            ])
            .then(([mail]) =>{ 
                res.status(200).json({ mail}) 
              })   
        }else{
          res.status(400).send({'message':'no existe usuario' }) 
        }
      })
      .catch(reason => { 
        res.status(400).send({'message':'no existe usuario' }) 
      })

}

static restorePassword(req, res) {  
    const { password  } = req.body
    let newpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    const obj = {
      password: newpassword
    }    
    Promise.all([ ClienteService.updt(obj, req.params.id)])
    .then(([usuario]) =>{
      res.status(200).json({ usuario }) 
    })
    .catch(reason => { 
      res.status(400).send({'message':'no existe usuario' }) 
    })  
}  

  static regConfirmacion(req, res) {
    const enlace = req.params.enlace;
    const fecha = enlace.substring(0, 8);
    const usuario = parseInt(enlace.substring(41, 68)) / 3 - 4745;
    var d = new Date();
    var formatted = new Date(d + "UTC")
      .toISOString()
      .replace(/-/g, "")
      .split("T")[0];

    if (usuario && fecha === formatted) {
      Promise.all([ClienteService.verificarConf(usuario)]).then(([usuario]) => {
        if (usuario) {
          res.status(200).send({ message: "registrado", result: usuario });
        } else {
          res
            .status(200)
            .send({ message: "no existe usuario", result: usuario });
        }
      });
    } else {
      res.status(200).send({ message: "enlace caducado", usuario: null });
    }
  }

  static actualizar(req, res) {
    Promise.all([ClienteService.update(req.body, req.params.id)])
      .then(([cliente]) => {
        res.status(200).send({ message: "cliente", result: cliente });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }

  static addCliente(req, res) {
    if (req.body.nombres) {
      Promise.all([ClienteService.add(req.body)])
        .then(([cliente]) => {          
          let horas = Array()
            for (let i = 1; i <= 7; i++) {
              let date = {}
                date.dia = i;
                date.hinicio = '07:00:00'
                date.hfin = '19:00:00'
                date.clienteId = cliente.id
                horas.push(date)
            }
            Promise.all([HorarioService.add(horas)])
            .then(([horas]) => {              
              res.status(200).send({ message: "cliente", result: cliente });
            })                
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static deleteCliente(req, res) {
    Promise.all([ClienteService.del(req.params.id)])
      .then(([cliente]) => {
        Promise.all([ClienteService.getAll(1, 12)]).then(([clientes]) => {
          res.status(200).send({ message: "cliente", result: clientes });
        });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }

  static registrarCliente(req, res) {
    if (req.body.email) {
      Promise.all([ClienteService.add(req.body)])
        .then(([cliente]) => {
          var d = new Date();
          var formatted = new Date(d + "UTC")
            .toISOString()
            .replace(/-/g, "")
            .split("T")[0];
          Promise.all([
            MailController.sendMailVerificacion(cliente, formatted),
          ]).then(([cliente]) => {
            res.status(200).send({ message: "cliente", result: cliente });
          });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static add(req, res) {        
    if (req.body.email) {
      const dato = req.body
      dato.password = 'onclickbo'       
      dato.username = dato.nombres     
      dato.registrado = true      
      Promise.all([ClienteService.add(dato)])
        .then(([cliente]) => {      
          let horas = Array()
            for (let i = 1; i <= 7; i++) {
              let date = {}
                date.dia = i;
                date.hinicio = '07:00:00'
                date.hfin = '19:00:00'
                date.clienteId = cliente.id
                horas.push(date)
            }
            Promise.all([HorarioService.add(horas)])
            .then(([horas]) => {              
              res.status(200).send({ message: "cliente", result: cliente });
            })             
        })
        .catch((reason) => {         
          console.log(reason) 
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static aprobarCliente(req, res) {
    if (req.body.id) {
      Promise.all([ClienteService.updt(req.body, req.body.id)])
        .then(([cliente]) => {
          Promise.all([ClienteService.getId(req.body.id)]).then(([client]) => {
            Promise.all([
              MailController.sendMailAprobacionCliente(client),
            ]).then(([cliente]) => {
              Promise.all([ClienteService.getAll(1, 12)]).then(([clientes]) => {
                res.status(200).send({ message: "clientes", result: clientes });
              });
            });
          });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "cliente ya habilitado" });
    }
  }

  static getItem(req, res) {
    if (req.params.id) {
      Promise.all([
        ClienteService.getId(req.params.id),
        SucursalService.getAll(req.params.id)
      ])
        .then(([cliente,sucursales]) => {
          res.status(200).send({ message: "cliente", result: { cliente, sucursales } });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }



  static verificarUsername(req, res) {
    if (req.body.username) {
      Promise.all([ClienteService.getUsername(req.body.username)])
        .then(([cliente]) => {
          res.status(200).send({ message: "cliente", result: cliente });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static lista(req, res) {
    Promise.all([ClienteService.getAll(req.params.page, req.params.num)])
      .then(([clientes]) => {
        res.status(200).send({ message: "lista", result: clientes });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }

  

  static search(req, res) {
    const { nombres } = req.body
    Promise.all([ClienteService.search(1, 12, nombres)])
      .then(([clientes]) => {
        console.log(clientes)
        res.status(200).send({ message: "lista", result: clientes });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }
  static login(req, res) {
    const { username, password } = req.body;
    Promise.all([ClienteService.login(username, password)]).then(
      ([cliente]) => {
        if (cliente.user) {
          Promise.all([
            ModuloService.getRol(cliente.user.rolId),
            ProcesoService.add("Ingreso al sistema", cliente.user.id),
          ]).then(([modulos]) => {
            res.status(200).json({ cliente, modulos });
          });
        } else {
          res.status(400).send({ success: false, message: cliente.message });
        }
      }
    );
  }

  static getServicios(req, res) {
    Promise.all([ClienteService.getMapas('servicio'),SucursalService.getMapas('servicio')])
      .then(([clientes, sucursales]) => {
        const data = refactorizar(clientes, sucursales)
        res.status(200).send({ message: "lista", result: data });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }


  static getEmergencias(req, res) {
    Promise.all([ClienteService.getMapas('emergencia'),SucursalService.getMapas('emergencia')])
      .then(([clientes, sucursales]) => {
        const data = refactorizar(clientes, sucursales)
        res.status(200).send({ message: "lista", result: data });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }

  static getComidas(req, res) {
    Promise.all([ClienteService.getMapas('comida'),SucursalService.getMapas('comida')])
      .then(([clientes, sucursales]) => {
        const data = refactorizar(clientes, sucursales)
        res.status(200).send({ message: "lista", result: data });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });
  }

  static consulta(req, res) {            
    Promise.all([ClienteService.consulta(req.params.page,req.params.num,req.params.categoria,req.params.estado,req.params.nombre)])
        .then(([clientes]) => { 
          /*const data = horariosRefactorizar(clientes)*/
          res.status(200).send({ message: "lista", result: clientes });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    }

}

function refactorizar(data1, data2){
  const newData = []
  data1.map((item)=>{
    let tem = {}
    tem.key = item.id,
    tem.title = item.nombres,
    tem.description = item.descripcion,
    tem.tipo = item.tipo,    
    tem.icon = item.icon,
    tem.telefono = item.telefono,
    tem.celular = item.celular,
    tem.longitude = parseFloat(item.longitude),
    tem.latitude = parseFloat(item.latitude)
    newData.push(tem)
  })
  data2.map((item)=>{
    let tem = {}
    tem.key = item.id,
    tem.title = item.nombre,    
    tem.tipo = item.tipo,    
    tem.icon = item.icon,
    tem.description = "",
    tem.telefono = item.telefono,
    tem.celular = item.celular,
    tem.longitude = parseFloat(item.longitude),
    tem.latitude = parseFloat(item.latitude)
    newData.push(tem)
  })
  return newData

}





export default ClienteControllers;
