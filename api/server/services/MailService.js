import database from '../src/models';
import jwt    from 'jsonwebtoken'

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Cliente, Rol } = database;

class ClienteService{
    static getAll(pag,num){        
        return new Promise((resolve, reject) => {        
            let page = parseInt(pag)
            let der = (num * page) - num;    
           Cliente
           .findAndCountAll({
              raw:true,
              nest:true,
                offset: der,                
                limit: num,    
                order:  [['nombres', 'ASC'],]
              })
            .then(clientes =>
                resolve({'paginas':(Math.ceil(clientes.count/num)),'pagina':page,'total':clientes.count,'data': clientes.rows }))   
            .catch(reason => reject(reason))
        
          })         
    }

    static add(newCliente){        
    console.log(newCliente)  
      return new Promise((resolve, reject) => {                  
         Cliente
         .create(newCliente)
          .then(cliente => resolve(cliente))   
          .catch(reason => reject(reason))      
        })         
    }
    
    static getId(clienteId){        
      return new Promise((resolve, reject) => {                  
         Cliente
         .findByPk(clienteId)
          .then(cliente => resolve(cliente))   
          .catch(reason => reject(reason))      
        })         
    }

    static getUsername(username){        
      return new Promise((resolve, reject) => {                  
         Cliente
         .findOne({
           where: { username: username}
         })
          .then(cliente => resolve(cliente = cliente ? true :  false))   
          .catch(reason => reject(reason))      
        })         
    }
    static del(clienteId){        
      return new Promise((resolve, reject) => {                  
         Cliente
         .destroy({
          where: { id: clienteId }
         })
          .then(cliente => resolve(cliente))   
          .catch(reason => reject(reason))      
        })         
    }

    static update(dato,datoId){        
      return new Promise((resolve, reject) => {                  
         Cliente
         .update(dato,{
          where: { id: datoId }
         })
          .then(cliente => resolve(cliente))   
          .catch(reason => reject(reason))      
        })         
    }

    static login(username, password){        
     return new Promise((resolve, reject) => {                          
     Cliente
    .findOne({       
      where :{ username: {[Op.eq]: username }},
      include: [{ model: Rol, attributes:['id','nombre'] }],   
      attributes:['id','nombres','username','rolId','password'],      
    })
    .then((user)=>{             
      if(!user){       
        resolve({success: false, message: 'Authentication fallida . Usuario no existe.','user':null}) 
      }else{
      user.comparePassword(password, (err, isMatch) => {        
        if(isMatch && !err) {
          let payload = { user_id: user.id, username: user.username }
          let token = jwt.sign(payload, 'click2020', {expiresIn: '2629746000'})                                   
          resolve({auth: true,message: 'Acceso correcto','user':user,token:token })
        }
        else{ 
          resolve({success: false, message: 'Autenticación fallida. contraseña incorrecta.','user':null}) 
            }
      })
    }    
  })  


    })
   }   

}

export default ClienteService;