import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { PlanPagos } = database;

class PlanService {

    static add(pagos) {
        return new Promise((resolve, reject) => {
            PlanPagos.bulkCreate(pagos, { returning: false })
                .then((pagos) => resolve(pagos))
                .catch((reason) => reject(reason));
        });
    }

    static getId(notaId) {
        return new Promise((resolve, reject) => {
            PlanPagos.findByPk(notaId)
                .then((nota) => resolve(nota))
                .catch((reason) => reject(reason));
        });
    }
    static getPlan(notaId) {
        return new Promise((resolve, reject) => {
            PlanPagos.findAll({
                where: { notaId: notaId }
            })
                .then((plan) => resolve(plan))
                .catch((reason) => reject(reason));
        });
    }

    static update(dato, datoId) {
        return new Promise((resolve, reject) => {
            PlanPagos.update(dato, { where: { id: Number(datoId) } })
                .then((nota) => resolve(nota))
                .catch((reason) => reject(reason));
        });
    }

}

export default PlanService;
