import ReporteService from '../services/ReporteService';

class ReporteController {

  /* Metodos */
  static ingresos(req, res) {
    Promise.all([ReporteService.getAll(req.params.page, req.params.num)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static registros(req, res) {
    Promise.all([ReporteService.getList(req.params.name)])
      .then(([result]) => {
        res.status(200).send({ result })
      })
      .catch(reason => {
        res.status(400).send({ 'message': reason })
      })
  }

  static paquetes(req, res) {    
      Promise.all([ReporteService.paquetes()])
        .then(([carreras]) => {          
              res.status(200).json({ 'message': `resultado`, 'result': carreras })
        })        
    }  
}

export default ReporteController;