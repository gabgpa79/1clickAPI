import SucursalService from '../services/SucursalService';

class SucursalController {

  /* Metodos */
  static data(req, res) {
    Promise.all([SucursalService.getAll(req.params.cliente)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static listar(req, res) {
    Promise.all([SucursalService.getList(req.params.name)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static registrar(req, res) {    
    console.log(req.body)
    if (req.body.nombre) {
      Promise.all([SucursalService.add(req.body)])
        .then(([sucursal]) => {                    
          Promise.all([SucursalService.getAll(req.body.clienteId)])
            .then(([sucursales]) => {
              res.status(200).json({ 'message': `Usuario ID: ${sucursal.nombre} registrado`, 'result': sucursales })
            })
        })
    } else {
      res.status(400).send({ 'message': 'datos faltantes' })
    }
  }

  static borrar(req, res) {
    Promise.all([SucursalService.getId(req.params.id)])
      .then(([sucursal]) => {
        Promise.all([SucursalService.del(req.params.id)])
          .then(([item]) => {
              Promise.all([SucursalService.getAll(sucursal.clienteId)])
                  .then(([sucursales]) => {
                  res.status(200).json({ 'message': `Usuario ID: ${item} eliminado`, 'result': sucursales })
                })
              })      
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static actualizar(req, res) {
    Promise.all([SucursalService.getId(req.params.id)])
      .then(([sucursal]) => {
        Promise.all([SucursalService.update(req.body, req.params.id)])
          .then(([item]) => {
              Promise.all([SucursalService.getAll(sucursal.clienteId)])
                  .then(([sucursales]) => {
                  res.status(200).json({ 'message': `Usuario ID: ${item} actualizado`, 'result': sucursales })
                })
              })      
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }
  

}

export default SucursalController;