import database from '../src/models';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Empresa } = database;

class EmpresaService{
    static getEmpresa(empresaId){        
      return new Promise((resolve, reject) => {                  
         Empresa
         .findByPk(empresaId)
          .then(empresa => resolve(empresa))   
          .catch(reason => reject(reason))      
        })         
    }

}

export default EmpresaService;