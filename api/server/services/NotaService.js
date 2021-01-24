import database from "../src/models";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { NotaCobranza } = database;

class NotaService {

    static add(newNota) {
        return new Promise((resolve, reject) => {
            NotaCobranza.create(newNota)
                .then((nota) => resolve(nota))
                .catch((reason) => reject(reason));
        });
    }

    static getId(notaId) {
        return new Promise((resolve, reject) => {
            NotaCobranza.findByPk(notaId)
                .then((nota) => resolve(nota))
                .catch((reason) => reject(reason));
        });
    }

    static getNota(contratoId) {
        return new Promise((resolve, reject) => {
            NotaCobranza.findOne({
                where: { contratoId: contratoId }
            })
                .then((nota) => resolve(nota))
                .catch((reason) => reject(reason));
        });
    }

    static update(dato, datoId) {
        return new Promise((resolve, reject) => {
            NotaCobranza.update(dato, { where: { id: Number(datoId) } })
                .then((nota) => resolve(nota))
                .catch((reason) => reject(reason));
        });
    }    

}

export default NotaService;
