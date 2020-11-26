import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Modulo} = model;

class ModuloController{	
	/*
		Metodos
	*/
	
	/* Interfaces */
	static getModulosRol(id){		
		return new Promise((resolve,reject) =>{
		Modulo
		.findAll({ 
			raw:true,
      		rest:true,   
        	where: { rolId: Number(id) },    
        	order:  [['name', 'ASC'],],
        	attributes:['id','layout','component','enabled','icon','name','path']
      	})
      	.then(modules => resolve(modules )) })			
	}

}



export default ModuloController;