import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Categoria } = database;

class CategoriaService {
  static getAll(pag, num) {
    return new Promise((resolve, reject) => {
      let page = parseInt(pag)
      let der = (num * page) - num;
      Categoria
        .findAndCountAll({
          raw: true,
          nest: true,
          offset: der,
          limit: num,
          order: [['id', 'ASC'],],
          attributes: ['id', 'nombre'],
        })
        .then(Categorias =>
          resolve({ 'paginas': (Math.ceil(Categorias.count / num)), 'pagina': page, 'total': Categorias.count, 'data': Categorias.rows }))
        .catch(reason => reject(reason))

    })
  }

  static getList(name) {
    return new Promise((resolve, reject) => {
      let iName = '%' + name + '%'
      if (name === undefined || name === null || name === '0' || name === 0) { iName = '%' }
      Categoria
        .findAll({
          row: true,
          nest: true,
          order: ['nombre'],
          where: { nombre: { [Op.iLike]: iName } },
          attributes: ['id', ['id', 'value'], ['nombre', 'label']],
        })
        .then(Categorias =>
          resolve(Categorias))
        .catch(reason => reject(reason))

    })
  }
  static add(newCategoria) {
    return new Promise((resolve, reject) => {
      Categoria
        .create(newCategoria)
        .then(Categoria => resolve(Categoria))
        .catch(reason => reject(reason))
    })
  }

  static getId(CategoriaId) {
    return new Promise((resolve, reject) => {
      Categoria
        .findByPk(CategoriaId)
        .then(Categoria => resolve(Categoria))
        .catch(reason => reject(reason))
    })
  }

  static del(CategoriaId) {
    return new Promise((resolve, reject) => {
      Categoria
        .destroy({
          where: { id: CategoriaId }
        })
        .then(Categoria => resolve(Categoria))
        .catch(reason => reject(reason))
    })
  }

  static update(dato, datoId) {
    return new Promise((resolve, reject) => {
      Categoria
        .update(dato, {
          where: { id: datoId }
        })
        .then(Categoria => resolve(Categoria))
        .catch(reason => reject(reason))
    })
  }

}

export default CategoriaService;