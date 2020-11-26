import model from '../src/models'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { NotaCobranza } = model;

var multer = require('multer');
var uuidv4 = require('uuid');
var sharp = require('sharp');
var storage = multer.diskStorage({     
    destination: function (req, file, cb) {                        
      cb(null,'api/public/images/trash')      
    },
    filename: function (req, file, cb) {        
      cb(null, Date.now() + '-' +file.originalname ) 
    }
  })

var upload = multer({ storage: storage }).single('file')



class NotaController{	
	/*
		Metodos
	*/

  /* Interfaces */

  static getNotai(contratoId) {    
    return new Promise((resolve, reject) => {            
    NotaCobranza
    .findOne({
       where: { contratoId: Number(contratoId) }
    })
    .then(item => resolve(item))
    .catch(reason => reject(reason))
    })     
  }

  static upload(req, res) {    
    return new Promise((resolve, reject) => {        
     upload(req, res, function (err) {           
        if (err instanceof multer.MulterError) {                                     
            resolve(err)
        } else if (err) {                    
            resolve(err)
        }        
        sharp(req.file.path).resize({ height: 500 }).toFile('./api/public/images/notas/lg/'+ req.file.filename);
        sharp(req.file.path).resize({ height: 250 }).toFile('./api/public/images/notas/md/'+ req.file.filename);
        sharp(req.file.path).resize({ height: 120 }).toFile('./api/public/images/notas/sm/'+ req.file.filename);        
        resolve(req.file)
      })
  })        
  }

  static actualizar(data,id){    
    const dd = 
    {
      id: data.id,
      nro: parseInt(data.nro),
      monto: parseInt(data.monto),
      estado: true,
      imagen: data.imagen,
      contratoId: data.contratoId
    }    
    return new Promise((resolve,reject) =>{         
     NotaCobranza
      .update(dd,{ where: { id: Number(id) }})
      .then(item => 
          resolve(item))
      }) 
    .catch(reason => reject(reason)) 
  } 

	
	static crearNota(contrato){				
    return new Promise((resolve, reject) => {            
     const nota = {
        'nro': contrato.id, 
        'monto':  contrato.total,
        'estado': false,
        'imagen': 'default.jpg',
        'contratoId': contrato.id
     } 
    NotaCobranza
   .create(nota)
    .then(item => resolve(item))
    .catch(reason => reject(reason))      
  })
}

}

export default NotaController;