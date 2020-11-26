import CategoriaService from '../services/CategoriaService';

class CategoriaController {

  /* Metodos */
  static data(req, res) {
    Promise.all([CategoriaService.getAll(req.params.page, req.params.num)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static listar(req, res) {
    Promise.all([CategoriaService.getList(req.params.name)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static registrar(req, res) {
    if (req.body.nombre) {
      Promise.all([CategoriaService.add(req.body)])
        .then(([carrera]) => {
          Promise.all([CategoriaService.getAll(1, 12)])
            .then(([carreras]) => {
              res.status(200).json({ 'message': `Usuario ID: ${carrera.nombre} registrado`, 'result': carreras })
            })
        })
    } else {
      res.status(400).send({ 'message': 'datos faltantes' })
    }
  }

  static borrar(req, res) {
    Promise.all([CategoriaService.del(req.params.id)])
      .then(([carrera]) => {
        Promise.all([CategoriaService.getAll(1, 12)])
          .then(([carreras]) => {
            res.status(200).json({ 'message': `Usuario ID: ${carrera} eliminado`, 'result': carreras })
          })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static actualizar(req, res) {
    Promise.all([CategoriaService.update(req.body, req.params.id)])
      .then(([carrera]) => {
        Promise.all([CategoriaService.getAll(1, 12)])
          .then(([carreras]) => {
            res.status(200).json({ 'message': `Usuario ID: ${req.params.id} actualizado`, 'result': carreras })
          })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }



}

export default CategoriaController;