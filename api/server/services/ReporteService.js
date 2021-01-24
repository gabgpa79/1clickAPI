import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Contrato, Paquete } = database;

class ReporteService {

static paquetes() {
    return new Promise((resolve, reject) => {
      Contrato
        .findAll({
            attributes: [['paqueteId','label'], [Sequelize.fn('count', Sequelize.col('id')), 'y']],
            group : ['paqueteId']
            
        })
        .then(paquetes => resolve(paquetes))
        .catch(reason => reject(reason))
    })
  }

}

export default ReporteService;