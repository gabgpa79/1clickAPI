import database from '../src/models';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Proceso } = database;

class ProcesoService{
  
  static add(descripcion,usuarioId){        
    return new Promise((resolve, reject) => {                    
      var dato = {};    
      dato.proceso = descripcion;
      dato.clienteId = usuarioId;
        Proceso        
        .create(dato)      
            .then(proceso => resolve(proceso))   
            .catch(reason => reject(reason))
        })         
    }
}

export default ProcesoService;