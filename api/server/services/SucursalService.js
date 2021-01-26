import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Sucursal, Horario } = database;

class SucursalService {
  
  static getMapas(tipo) {
    return new Promise((resolve, reject) => {      
      Sucursal.findAll({                
        where: { tipo: { [Op.eq]: tipo } },
        attributes: [
          "id",
          "nombre",          
          "latitude",
          "longitude",
          "direccion",          
          "telefono",
          "celular",
          "tipo",
          "icon"          
        ],
      })
        .then((clientes) =>
          resolve(clientes)
        )
        .catch((reason) => reject(reason));
    });
  }
  static getAll(cliente) {
    return new Promise((resolve, reject) => {      
      Sucursal
        .findAll({
          raw: true,
          nest: true,          
          order: [['id', 'ASC'],],          
          where: { clienteId: { [Op.eq]: cliente } },
          attributes: [
            "id",
            "nombre",
            "estado",
            "direccion",
            "telefono",
            "celular",
            "longitude",
            "latitude",
            "clienteId",
            "tipo",
            "icon"
          ],
        })
        .then(sucursales =>
          resolve(sucursales))
        .catch(reason => reject(reason))

    })
  }

  static getAlls(cliente) {
    return new Promise((resolve, reject) => {    
      const dia = new Date()  
      const dd = dia.getDay()  
      Sucursal
        .findAll({
          raw: true,
          nest: true,          
          order: [['id', 'ASC'],],          
          where: { clienteId: { [Op.eq]: cliente } },
          attributes: [
            "id",
            "nombre",
            "estado",
            "direccion",
            "telefono",
            "celular",
            "longitude",
            "latitude",
            "clienteId",
            "tipo",
            "icon"
          ],
          include: [{ 
            model: Horario,           
            attributes: ["id", "dia","hinicio","hfin","sucursalId"],           
            where :  {
              [Op.and]: [                
                  { dia: {[Op.eq]: dd }}
              ]
            }
          }]
        })
        .then(sucursales =>
          resolve(sucursales))
        .catch(reason => reject(reason))

    })
  }

  static getList(name) {
    return new Promise((resolve, reject) => {
      let iName = '%' + name + '%'
      if (name === undefined || name === null || name === '0' || name === 0) { iName = '%' }
      Sucursal
        .findAll({
          row: true,
          nest: true,
          order: ['nombre'],
          where: { nombre: { [Op.iLike]: iName } },
          attributes: ['id', ['id', 'value'], ['nombre', 'label']],
        })
        .then(Sucursals =>
          resolve(Sucursals))
        .catch(reason => reject(reason))

    })
  }
  static add(newSucursal) {
    return new Promise((resolve, reject) => {
      Sucursal
        .create(newSucursal)
        .then(Sucursal => resolve(Sucursal))
        .catch(reason => reject(reason))
    })
  }

  static getId(SucursalId) {
    return new Promise((resolve, reject) => {
      Sucursal
        .findByPk(SucursalId)
        .then(Sucursal => resolve(Sucursal))
        .catch(reason => reject(reason))
    })
  }

  static del(SucursalId) {
    return new Promise((resolve, reject) => {
      Sucursal
        .destroy({
          where: { id: SucursalId }
        })
        .then(Sucursal => resolve(Sucursal))
        .catch(reason => reject(reason))
    })
  }

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Sucursal
        .update(dato, {
          where: { id: datoId }
        })
        .then(Sucursal => resolve(Sucursal))
        .catch(reason => reject(reason))
    })
  }

}

export default SucursalService;