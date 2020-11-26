import database from '../src/models';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Modulo } = database;

class ModuloService{
    static getRol(rolId){        
        return new Promise((resolve, reject) => {                    
           Modulo
           .findAll({
              raw:true,
              nest:true,
              where: { rolId: rolId }
              })
            .then(modulos =>
                resolve(modulos))   
            .catch(reason => reject(reason))
        })         
    }
}

export default ModuloService;