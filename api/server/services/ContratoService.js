import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Contrato } = database;

class ContratoService {

    static add(newContrato) {
        return new Promise((resolve, reject) => {
            Contrato.create(newContrato)
                .then((contrato) => resolve(contrato))
                .catch((reason) => reject(reason));
        });
    }

    static getContratoFull(clienteId) {
        return new Promise((resolve, reject) => {
            Contrato.findOne({
                where: { clienteId: clienteId }
            })
                .then((contrato) => {
                    resolve(contrato)
                })
                .catch((reason) => reject(reason));
        });
    }

    static getContrato(clienteId) {
        return new Promise((resolve, reject) => {
            Contrato.findOne({
                where: { clienteId: clienteId }
            })
                .then((contrato) => {
                    resolve(contrato ? true : false)
                })
                .catch((reason) => reject(reason));
        });
    }

    static getItem(clienteId) {
        return new Promise((resolve, reject) => {
            Contrato.findOne({
                where: { clienteId: clienteId },                
            })
                .then((contrato) =>
                    resolve(contrato))
                .catch((reason) => reject(reason));
        });
    }

    static getId(contratoId) {
        return new Promise((resolve, reject) => {
            Contrato.findByPk(contratoId)
                .then((contrato) => resolve(contrato))
                .catch((reason) => reject(reason));
        });
    }

    static update(dato, datoId) {
        return new Promise((resolve, reject) => {
            Contrato.update(dato, { where: { id: Number(datoId) } })
                .then((contrato) => resolve(contrato))
                .catch((reason) => reject(reason));
        });
    }

}

export default ContratoService;
