import ClienteService from "../services/ClienteService";
import ModuloService from "../services/ModuloService";
import ProcesoService from "../services/ProcesoService";
import EmpresaService from "../services/EmpresaService";
import SucursalService from "../services/SucursalService";
import HorarioService from "../services/HorarioService"
import MailController from "./MailController";
import PaqueteService from "../services/PaqueteService"
import ContratoService from "../services/ContratoService"
import NotaService from "../services/NotaService"
import PlanService from "../services/PlanService"
import fFecha from "../utils/fFecha"

import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt-nodejs");

class ClienteController {

  static lista(req, res) {            
    Promise.all([ClienteService.getAll(req.params.page,req.params.num,req.params.prop,req.params.orden)])                
      .then(([clientes]) => {
           res.status(200).send({ result: clientes });
        })                     
      .catch((reason) => {
        res.status(400).send({ reason });
      });   
  }

  static add(req, res) {            
    const newClient = req.body
    newClient.username = newClient.nombres + "0" 
    Promise.all([ClienteService.add(newClient)])
      .then(([usuario]) => {                     
        Promise.all([PaqueteService.getId(usuario.client.paqueteId)])
        .then(([paquete]) => {         
        let dd = usuario
        dd.habilitado = true  
        dd.hestado = true           
        dd.estado = true
        dd.coordenadas = "temporal"
        var d = new Date()
        const dato = {
          'motivo': 'Contrato Nro :' + usuario.client.id,
          'subTotal': paquete.valor,
          'totalSaldo': paquete.valor,
          'total': paquete.valor,
          'estado': 'false',
          'fContrato': d,
          'fVencimiento': d,
          'paqueteId': paquete.id,
          'clienteId': usuario.client.id
        }
        Promise.all([ContratoService.add(dato)]).then(([contrato]) => {
          let newNota = { nro: contrato.id,monto: contrato.total,estado: true,imagen: 'default.jpg',contratoId: contrato.id}
            Promise.all([NotaService.add(newNota)]).then(([nota]) => {
            const { id, monto } = nota
            let pagos = Array()
              for (let i = 1; i <= 12; i++) {
                let date = {}
                date.cuota = i;
                date.monto = parseFloat(monto);
                date.estado = 'pendiente';
                date.fvencimiento = i === 1 ? fFecha.sumarDia(5) : fFecha.sumarMes(i)
                date.fecha = d
                date.notaId = id
                pagos.push(date)
              }                    
            let horas = Array()
            for (let i = 0; i <= 6; i++) {
              let date = {}
                date.dia = i;
                date.hinicio = '07:00:00'
                date.hfin = '19:00:00'
                date.clienteId = usuario.client.id
                horas.push(date)
            }  
             Promise.all([
                  PlanService.add(pagos), HorarioService.add(horas),ClienteService.updt(dd, usuario.client.id)])
                  .then(([pagos, horario, upcli]) => {
                    res.status(200).send({ message: "registrado", result: usuario });          
                  })                
             }) 
          })                 
        })          
          })        
      .catch((reason) => {
        console.log(reason)
        res.status(400).send({ message: reason, result : null });
      });   
 }

  static registro(req, res) {            
      Promise.all([ClienteService.add(req.body)])
        .then(([cliente]) => {           
            var d = new Date();
            var formatted = new Date(d + "UTC")
            .toISOString()
            .replace(/-/g, "")
            .split("T")[0];                  
            Promise.all([
                    ProcesoService.add("Registro Usuario",cliente.client.id),                    
                    MailController.sendMail("registro",cliente.client,formatted)
                ]) 
                .then(([proc,clientes]) => {
                    res.status(200).send({ data: clientes });
                })                
            })        
        .catch((reason) => {
          res.status(400).send({ reason });
        });   
  }

    static venlace(req, res) {
        const enlace = req.params.enlace;
        const fecha = enlace.substring(0, 8);
        const usuario = parseInt(enlace.substring(41, 68)) / 3 - 4745;
        var d = new Date();
        var formatted = new Date(d + "UTC")
          .toISOString()
          .replace(/-/g, "")
          .split("T")[0];
    
        if (usuario && fecha === formatted) {
          Promise.all([ClienteService.verificarEnlace(usuario)])
            .then(([usuario]) => {
              if (usuario) {
                Promise.all([PaqueteService.getId(usuario.paqueteId)])
                .then(([paquete]) => {                     
                let dd = usuario
                dd.habilitado = true  
                dd.hestado = true           
                dd.estado = true
                var d = new Date()
                const dato = {
                  'motivo': 'Contrato Nro :' + usuario.id,
                  'subTotal': paquete.valor,
                  'totalSaldo': paquete.valor,
                  'total': paquete.valor,
                  'estado': 'false',
                  'fContrato': d,
                  'fVencimiento': d,
                  'paqueteId': paquete.id,
                  'clienteId': usuario.id
                }
                Promise.all([ContratoService.add(dato)]).then(([contrato]) => {
                  let newNota = { nro: contrato.id,monto: contrato.total,estado: true,imagen: 'default.jpg',contratoId: contrato.id}
                    Promise.all([NotaService.add(newNota)]).then(([nota]) => {
                    const { id, monto } = nota
                    let pagos = Array()
                      for (let i = 1; i <= 12; i++) {
                        let date = {}
                        date.cuota = i;
                        date.monto = parseFloat(monto);
                        date.estado = 'pendiente';
                        date.fvencimiento = i === 1 ? fFecha.sumarDia(5) : fFecha.sumarMes(i)
                        date.fecha = d
                        date.notaId = id
                        pagos.push(date)
                      }                    
                    let horas = Array()
                    for (let i = 1; i <= 7; i++) {
                      let date = {}
                        date.dia = i;
                        date.hinicio = '07:00:00'
                        date.hfin = '19:00:00'
                        date.clienteId = usuario.id
                        horas.push(date)
                    }  
                     Promise.all([
                          PlanService.add(pagos), HorarioService.add(horas),ClienteService.updt(dd, usuario.id)])
                          .then(([pagos, horario, upcli]) => {
                            res.status(200).send({ message: "registrado", result: usuario });          
                          })                
                     }) 
                  })                 
                })
                  
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

      static vusername(req, res) {        
          Promise.all([ClienteService.getUsername(req.params.username)])
            .then(([cliente]) => {
              res.status(200).send({ message: "cliente", result: cliente });
            })
            .catch((reason) => {
              res.status(400).send({ message: reason });
            });         
      }

      static search(req, res) {                
        Promise.all([ClienteService.search(1, 12, req.params.nombres)])
          .then(([clientes]) => {            
            res.status(200).send({ message: "lista", result: clientes });
          })
          .catch((reason) => {
            res.status(400).send({ message: reason });
          });
      }
      static getItem(req, res) {        
        if (req.params.id) {
          Promise.all([ ClienteService.getId(req.params.id) ])
            .then(([cliente]) => {              
              Promise.all([ ContratoService.getItem(cliente.id)])
                  .then(([contrato]) => {                    
                    Promise.all([ NotaService.getNota(contrato.id)])
                      .then(([nota]) => {
                        Promise.all([ 
                          PlanService.getPlan(nota.id), 
                          HorarioService.getHorariosc(cliente.id,"clienteId"),
                          SucursalService.getAll(cliente.id)
                        ])
                          .then(([plan, horarios, sucursales]) => {                                
                              res.status(200).send({ message: "cliente", cliente:  cliente  , 
                              contrato:contrato, nota:nota, plan:plan, horarios:horarios, sucursales: sucursales });
                            })
                          })
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
              res.status(200).send({ message: "cliente", result: cliente });
            
          })
          .catch((reason) => {
            res.status(400).send({ message: reason });
          });
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

      static consulta(req, res) {            
        Promise.all([ClienteService.consulta(req.params.page,req.params.num,req.params.categoria,req.params.estado,req.params.nombre)])
            .then(([clientes]) => {      
              res.status(200).send({ message: "lista", result: clientes });
            })
            .catch((reason) => {
              res.status(400).send({ message: reason });
            });
        }

      /*static getItem(req, res) {
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
      } */ 

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

      static getCajeros(req, res) {
        Promise.all([ClienteService.getMapas('cajero'),SucursalService.getMapas('cajero')])
          .then(([clientes, sucursales]) => {
            const data = refactorizar(clientes, sucursales)
            res.status(200).send({ message: "lista", result: data });
          })
          .catch((reason) => {
            res.status(400).send({ message: reason });
          });
      
        }
        static getIte(req, res) {        
          if (req.params.id) {
            Promise.all([ ClienteService.getId(req.params.id) ])
              .then(([cliente]) => {                              
                  Promise.all([SucursalService.getAlls(cliente.id)])
                    .then(([sucursales]) => {                                
                       res.status(200).send({ message: "cliente", cliente:  cliente, sucursales: sucursales });
                      })
              })
              .catch((reason) => {
                res.status(400).send({ message: reason });
              });
          } else {
            res.status(400).send({ message: "datos faltantes" });
          }
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


export default ClienteController;
