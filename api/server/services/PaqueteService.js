import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Paquete } = database;

class PaqueteService {
    static getAll(pag, num) {
        return new Promise((resolve, reject) => {
            let page = parseInt(pag)
            let der = (num * page) - num;
            Paquete
                .findAndCountAll({
                    raw: true,
                    nest: true,
                    offset: der,
                    limit: num,
                    order: [['id', 'ASC'],],
                    attributes: ['id', 'nombre', 'valor'],
                })
                .then(Paquetes =>
                    resolve({ 'paginas': (Math.ceil(Paquetes.count / num)), 'pagina': page, 'total': Paquetes.count, 'data': Paquetes.rows }))
                .catch(reason => reject(reason))

        })
    }

    static getList(name) {
        return new Promise((resolve, reject) => {
            let iName = '%' + name + '%'
            if (name === undefined || name === null || name === '0' || name === 0) { iName = '%' }
            Paquete
                .findAll({
                    row: true,
                    nest: true,
                    order: ['nombre'],
                    where: { nombre: { [Op.iLike]: iName } },
                    attributes: ['id', ['id', 'value'], ['nombre', 'label']],
                })
                .then(Paquetes =>
                    resolve(Paquetes))
                .catch(reason => reject(reason))

        })
    }
    static add(newPaquete) {
        return new Promise((resolve, reject) => {
            Paquete
                .create(newPaquete)
                .then(Paquete => resolve(Paquete))
                .catch(reason => reject(reason))
        })
    }

    static getId(PaqueteId) {
        return new Promise((resolve, reject) => {
            Paquete
                .findByPk(PaqueteId)
                .then(Paquete => resolve(Paquete))
                .catch(reason => reject(reason))
        })
    }

    static del(PaqueteId) {
        return new Promise((resolve, reject) => {
            Paquete
                .destroy({
                    where: { id: PaqueteId }
                })
                .then(Paquete => resolve(Paquete))
                .catch(reason => reject(reason))
        })
    }

    static update(dato, datoId) {
        return new Promise((resolve, reject) => {
            Paquete
                .update(dato, {
                    where: { id: datoId }
                })
                .then(Paquete => resolve(Paquete))
                .catch(reason => reject(reason))
        })
    }

}

export default PaqueteService;