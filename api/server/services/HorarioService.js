import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Horario } = database;

class HorarioService {
  static getAll(pag, num) {
    return new Promise((resolve, reject) => {
      let page = parseInt(pag)
      let der = (num * page) - num;
      Horario
        .findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          order: [['id', 'ASC'],]
        })
        .then(Horarios =>
          resolve({ 'paginas': (Math.ceil(Horarios.count / num)), 'pagina': page, 'total': Horarios.count, 'data': Horarios.rows }))
        .catch(reason => reject(reason))

    })
  }

  static getList(name) {
    return new Promise((resolve, reject) => {
      let iName = '%' + name + '%'
      if (name === undefined || name === null || name === '0' || name === 0) { iName = '%' }
      Horario
        .findAll({
          row: true,
          nest: true,
          order: ['nombre'],
          where: { nombre: { [Op.iLike]: iName } },
          attributes: ['id', ['id', 'value'], ['nombre', 'label']],
        })
        .then(Horarios =>
          resolve(Horarios))
        .catch(reason => reject(reason))

    })
  }
 
 /* static add(newHorario) {
    return new Promise((resolve, reject) => {
      Horario
        .create(newHorario)
        .then(Horario => resolve(Horario))
        .catch(reason => reject(reason))
    })
  }*/

  static add(horarios) {
    return new Promise((resolve, reject) => {
        Horario.bulkCreate(horarios, { returning: false })
            .then((horarios) => resolve(horarios))
            .catch((reason) => reject(reason));
    });
  }

  static getId(HorarioId) {
    return new Promise((resolve, reject) => {
      Horario
        .findByPk(HorarioId)
        .then(Horario => resolve(Horario))
        .catch(reason => reject(reason))
    })
  }

  static del(HorarioId) {
    return new Promise((resolve, reject) => {
      Horario
        .destroy({
          where: { id: HorarioId }
        })
        .then(Horario => resolve(Horario))
        .catch(reason => reject(reason))
    })
  }

  static dele(sucursalId) {
    return new Promise((resolve, reject) => {
      Horario
        .destroy({
          where: { sucursalId: sucursalId }
        })
        .then(Horario => resolve(Horario))
        .catch(reason => reject(reason))
    })
  }

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Horario
        .update(dato, {where: { id: datoId }})
        .then(Horario => resolve(Horario))
        .catch(reason => reject(reason))
    })
  }

  static getHorarios(dia,clienteId,tipo) {
    return new Promise((resolve, reject) => {      
      Horario.findOne({     
        raw: true,
        nest: true,           
        where: {[Op.and]: 
             [{ dia: { [Op.eq]: dia } },    
             { [tipo]: { [Op.eq]: clienteId }}]
            },
        })
        .then((horarios) => resolve(horarios))
        .catch((reason) => reject(reason));
    });
  }
  
  static getHorariosc(clienteId,tipo) {    
    return new Promise((resolve, reject) => {            
      Horario.findAll({     
        raw: true,
        nest: true,    
        order: [['dia', 'ASC']],      
        where: { [tipo]: { [Op.eq]: clienteId }}
        })
        .then((horarios) => resolve(horarios))
        .catch((reason) => reject(reason));
    });
  }

}

export default HorarioService;