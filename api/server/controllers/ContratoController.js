import model from '../src/models'
import ContratoService from "../services/ContratoService";
import NotaService from "../services/NotaService";
import PlanService from "../services/PlanService";
import ClienteService from "../services/ClienteService";
import PaqueteService from "../services/PaqueteService";
import MailController from "./MailController";
import fFecha from "../utils/fFecha"
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Contrato, NotaCobranza, Usuario } = model;
class ContratoController {

  /* Metodos */

  static add(req, res) {
    const { clienteId, paqueteId } = req.body
    Promise.all([
      ContratoService.getContrato(clienteId),
      PaqueteService.getId(paqueteId)
    ])
      .then(([contrato, paquete]) => {
        if (!contrato) {
          var d = new Date()
          const dato = {
            'motivo': 'Contrato Nro :' + clienteId,
            'subTotal': paquete.valor,
            'totalSaldo': paquete.valor,
            'total': paquete.valor,
            'estado': 'false',
            'fContrato': d,
            'fVencimiento': d,
            'paqueteId': paqueteId,
            'clienteId': clienteId
          }
          Promise.all([ContratoService.add(dato)])
            .then(([contrato]) => {
              let newNota = {
                nro: contrato.id,
                monto: contrato.total,
                estado: true,
                imagen: 'default.jpg',
                contratoId: contrato.id
              }
              Promise.all([NotaService.add(newNota)])
                .then(([nota]) => {
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
                  Promise.all([
                    PlanService.add(pagos), ClienteService.getId(clienteId)])
                    .then(([pagos, cliente]) => {
                      let ncliente = {}
                      ncliente.id = cliente.id;
                      ncliente.estado = true;
                      ncliente.habilitado = true,
                        Promise.all([
                          MailController.sendMailAprobacionIngreso(cliente),
                          ClienteService.updt(ncliente, ncliente.id)
                        ])
                          .then(([mail, clt]) => {
                            Promise.all([ClienteService.getAll(1, 12)])
                              .then(([clientes]) => {
                                res.status(200).send({ "message": "'usuario actualizado", result: { clientes } })
                              })
                          })
                    })
                })
            })
        }
        else {
          res.status(200).send({ 'message': 'el cliente ya tiene un contrato activo', result: null })
        }
      })

      .catch(reason => {
        res.status(400).send({ 'message': reason.parent + reason.parent })
      })
  }


  static getContrato(req, res) {
    Promise.all([
      ContratoService.getItem(req.params.id),
      ClienteService.getIdSingle(req.params.id)
    ])
      .then(([contrato, cliente]) => {
        Promise.all([NotaService.getNota(contrato.id)])
          .then(([nota]) => {
            Promise.all([PlanService.getPlan(nota.id)])
              .then(([plan]) => {
                res.status(200).send({ 'message': 'contrato', 'result': { cliente, contrato, nota, plan } })
              })
          })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason.parent + reason.parent })
      })
  }

  static pagar(req, res) {
    Promise.all([ PlanService.getId(req.params.id)])
      .then(([plan]) => {                        
        let dato = {}
        dato.id = plan.id
        dato.estado = "pagado"                
        Promise.all([PlanService.update(dato, dato.id)])
         .then(([pago]) => {              
              Promise.all([PlanService.getPlan(plan.notaId)])
                  .then(([planes]) => {            
                      res.status(200).send({ 'message': 'contrato', 'result': { planes } })              
          })
        })  
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason.parent + reason.parent })
      })
  }

}



export default ContratoController;