import HorarioService from '../services/HorarioService';

class HorarioController {

  /* Metodos */
  static data(req, res) {
    Promise.all([HorarioService.getAll(req.params.page, req.params.num)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static cliente(req, res) {
    Promise.all([HorarioService.getHorariosc(req.params.id,req.params.tipo)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static listar(req, res) {
    Promise.all([HorarioService.getList(req.params.name)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static registrar(req, res) {    
    if (req.body.dia) {
      Promise.all([HorarioService.add(req.body)])
        .then(([carrera]) => {
          Promise.all([HorarioService.getAll(1, 12)])
            .then(([horarios]) => {
              res.status(200).json({ 'message': `Usuario ID: ${carrera.nombre} registrado`, 'result': horarios })
            })
        })
    } else {
      res.status(400).send({ 'message': 'datos faltantes' })
    }
  }

  static borrar(req, res) {
    Promise.all([HorarioService.del(req.params.id)])
      .then(([carrera]) => {
        Promise.all([HorarioService.getAll(1, 12)])
          .then(([horarios]) => {
            res.status(200).json({ 'message': `Usuario ID: ${carrera} eliminado`, 'result': horarios })
          })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static actualizar(req, res) {
    const { clienteId, sucursalId, tipo } = req.body
    let saping = clienteId ? clienteId : sucursalId
    
    Promise.all([HorarioService.update(req.body, req.params.id)])
      .then(([carrera]) => {
        Promise.all([HorarioService.getHorariosc(saping,tipo)])
          .then(([horarios]) => {
            res.status(200).json({ 'message': `Usuario ID: ${req.params.id} actualizado`, 'result': horarios })
          })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }



}

export default HorarioController;