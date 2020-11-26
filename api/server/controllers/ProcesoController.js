import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Proceso } = model;

class ProcesoController{	
	/*
		Metodos
	*/

static del(id) {
  return new Promise((resolve, reject) => {            
   Proceso
   .destroy({ where: { usuarioId: Number(id) } })
    .then(procesos =>
        resolve(procesos))   
    .catch(reason => reject(reason))

  })    
}
	static listar(req, res){
    	Promise.all([listarf(req.params.page,req.params.num,req.params.usuarioId)])
    	  .then(([procesos]) =>{   
      	res.status(200).send({procesos})
    	})
  	}
	
	/* Interfaces */
	static getProcesosUsuario(id){		
		return new Promise((resolve,reject) =>{
		Proceso
		.findOne({ 			
			raw:true,
      		nest:true,   
      		limit:1,
      		order:  [['createdAt', 'DESC'],],
        	where: { usuarioId: Number(id) }
      	})
      	.then(procesos => resolve(procesos )) })			
	}

	static registrarProcesoi(descripcion,usuario){		
		return new Promise((resolve,reject) =>{		
		var dato = {};
		dato.proceso = descripcion;
		dato.usuarioId = usuario.id;	
		Proceso
		.create(dato)
      	.then(proceso => resolve(proceso )) })			
	}

}

function listarf(pag, num, userId) {
  return new Promise((resolve, reject) => {        
    let page = parseInt(pag)
    let der = (num * page) - num;    
   Proceso
   .findAndCountAll({
      raw:true,
      nest:true,
        offset: der,                
        limit: num,    
        order:  [['id', 'DESC'],],
        where: { usuarioId: Number(userId) }
      })
    .then(procesos =>
        resolve({'paginas':(Math.ceil(procesos.count/num)),'pagina':page,'total':procesos.count,'data': procesos.rows }))   
    .catch(reason => reject(reason))

  })    
}




export default ProcesoController;