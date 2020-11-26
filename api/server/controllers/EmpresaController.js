import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Empresa } = model;

class EmpresaController{	
	/*
		Metodos
	*/
	
	/* Interfaces */
	static getEmpresai(){		
		return new Promise((resolve, reject) => {          
   Empresa
    .findOne({        
      raw:true,
        nest:true,            
       where : { id: 1 },
      })
    .then(item =>         
        resolve(item)
    )
  })
}

}

export default EmpresaController;