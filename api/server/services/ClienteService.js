import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt-nodejs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Cliente, Rol, Categoria, Paquete, Horario } = database;

class ClienteService {

  static validarCliente(newUsuario) {    
    if(newUsuario.nombres){
        if(newUsuario.username){
            if(newUsuario.email){
                if(newUsuario.telefono){
                  return true
            } 
          }
        }
    }
    else {
        return false
  }}

  static add(newUsuario) {            
    return new Promise((resolve, reject) => {
        if(this.validarCliente(newUsuario))
        {
            const cliente = newUsuario
            cliente.password = bcrypt.hashSync(123456, bcrypt.genSaltSync(10), null);  
            
            Cliente.create(cliente)
            .then((client) => {                
                resolve({ message: "Usuario registrado", client: client })
            })
            .catch((reason) => {                            
                reject({ message: reason.message, user: null, token: null })
              });
            
        }else{                
                reject({ message: "Datos faltantes", user: null, token: null })
        }        
   });
  } 

  static getAll(pag,num,prop,orden) {
    return new Promise((resolve, reject) => {
      let page = parseInt(pag);
      let der = num * page - num;
      Cliente.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [[prop, orden]],   
        where: { rolId: { [Op.eq]: 1 } },
        attributes: ["id","nombres","direccion","email","coordenadas","habilitado","telefono"],
        include: [
                    { model: Categoria, attributes: ["id", "nombre"]},
                    { model: Paquete, attributes: ["id", "nombre"]}
                 ]
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static verificarEnlace(cliente) {    
    return new Promise((resolve, reject) => {
      Cliente.findOne({
        raw: true,
        nest: true,
        where: {
          [Op.and]: [
            { id: { [Op.eq]: cliente } },
            { habilitado: { [Op.eq]: false } },
          ],
        },
        attributes: [
          "id",
          "email",
          "estado",
          "nombres",
          "username",
          "telefono",
          "categoriaId",
          "paqueteId"
        ]
      })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static updt(dato, datoId) {
    return new Promise((resolve, reject) => {
      Cliente.update(dato, { where: { id: Number(datoId) } })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static login(username, password) {
    return new Promise((resolve, reject) => {
      Cliente.findOne({
        where: { username: { [Op.eq]: username } },
        include: [{ model: Rol, attributes: ["id", "nombre"] }],
        attributes: ["id", "nombres", "username", "rolId", "password"],
      }).then((user) => {
        if (!user) {
          resolve({
            success: false,
            message: "Authentication fallida . Usuario no existe.",
            user: null,
          });
        } else {
          user.comparePassword(password, (err, isMatch) => {
            if (isMatch && !err) {
              let payload = { user_id: user.id, username: user.username };
              let token = jwt.sign(payload, "click2020", {
                expiresIn: "2629746000",
              });
              resolve({
                auth: true,
                message: "Acceso correcto",
                user: user,
                token: token,
              });
            } else {
              resolve({
                success: false,
                message: "Autenticación fallida. contraseña incorrecta.",
                user: null,
              });
            }
          });
        }
      });
    });
  }

  static getUsername(username) {
    return new Promise((resolve, reject) => {
      Cliente.findOne({
        where: { username: username },
      })
        .then((cliente) => resolve((cliente = cliente ? false : true)))
        .catch((reason) => reject(reason));
    });
  }

  static search(page, num, nombres) {
    return new Promise((resolve, reject) => {
      let der = (num * page) - num;
      let iName = '%' + nombres + '%'
      if (nombres === '0' || nombres === 0 || nombres === undefined || nombres === null || nombres === '') { iName = '%' }
      Cliente.findAndCountAll({
        offset: 0,
        raw: true,
        nest: true,
        limit: 12,
        where: {
          [Op.and]: [
            { nombres: { [Op.iLike]: iName } },
            { rolId: { [Op.eq]: 1 } }
          ]
        },        
        attributes: ["id","nombres","direccion","email","coordenadas","habilitado","telefono" ]
      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: page,
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static getId(clienteId) {
    return new Promise((resolve, reject) => {
      const dia = new Date()  
      const dd = dia.getDay()
      Cliente.findByPk(clienteId,{        
        include: [
        { model: Categoria, attributes: ["id", "nombre"] },
        { model: Paquete, attributes: ["id", "nombre"] },        
      ]
      })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static getIdSingle(clienteId) {
    return new Promise((resolve, reject) => {
      const dia = new Date()  
      const dd = dia.getDay()
      Cliente.findByPk(clienteId,{        
        attributes: ["id", "nombres", "direccion", "email", "telefono","filename"],
        include: [
        { model: Categoria, attributes: ["id", "nombre"] },
        { model: Paquete, attributes: ["id", "nombre"] },        
      ]
      })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }
 
  static del(clienteId) {
    return new Promise((resolve, reject) => {
      Cliente.destroy({
        where: { id: clienteId },
      })
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static update(dato, datoId) {    

	  return new Promise((resolve, reject) => {
      const {
        nombres,
        telefono,
        email,
        username,
        password,
        estado,
        categoriaId,
        paqueteId,
        registrado,
        emergencia,
        longitude,
        latitude,
        facebook,
        instagram,
        web,
        celular,
        hinicio,
        hfin,
        video,
        direccion,
        descripcion
      } = dato;
      let newpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
      Cliente.update(
        {
          nombres: nombres,
          telefono: telefono,
          email: email,
          username: username,
          password: newpassword,
          estado: estado,
          categoriaId: categoriaId,
          paqueteId: paqueteId,
          registrado: registrado,
          emergencia: emergencia,
          web: web,
          celular: celular,
          latitude: latitude,
          longitude: longitude,
          facebook: facebook,
          instagram: instagram,
          hinicio: hinicio,
          hfin: hfin,
          video: video,
          direccion: direccion,
          descripcion: descripcion
        },
        { where: { id: Number(datoId) } }
      )
        .then((cliente) => resolve(cliente))
        .catch((reason) => reject(reason));
    });
  }

  static consulta(page,num,categoria,estado,nombres) {
    return new Promise((resolve, reject) => {     
      const dia = new Date()  
      const dd = dia.getDay()

      let ncategoria = parseInt(categoria);
      let der = (num * page) - num;
      const icategoria  = ncategoria  === 0 ? 50 : ncategoria            
      
      let iName = '%' + nombres + '%'
      if (nombres === 0 || nombres === null || nombres === '0') { iName = '%' }

            
      Cliente.findAndCountAll({
        raw: true,
        nest: true,
	      offset: der,
        limit: num,    
        order: [["nombres", "ASC"]],  
        where: {
          [Op.and]: [            
            { rolId: { [Op.eq]: 1 } },    
            { habilitado: { [Op.eq]: true } }, 
            { hestado: { [Op.eq]: estado } },            
            { categoriaId: {[Op.between]: [ncategoria, icategoria ]}},
            { nombres: { [Op.iLike]: iName } }                        
          ]
        },
        attributes: ["id","nombres","filename","portada","username","direccion","telefono","estado","descripcion","hestado","habilitado",
          "registrado","paqueteId","hinicio","hfin"],
        
        include: [{ 
          model: Horario,           
          attributes: ["id", "dia","hinicio","hfin","clienteId"],           
          where :  {
            [Op.and]: [                
                { dia: {[Op.eq]: dd }}
            ]
          }
        }]     

      })
        .then((clientes) =>
          resolve({
            paginas: Math.ceil(clientes.count / num),
            pagina: parseInt(page),
            total: clientes.count,
            data: clientes.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  static getMapas(tipo) {
    return new Promise((resolve, reject) => {      
      Cliente.findAll({                
        where: { tipo: { [Op.eq]: tipo } },
        attributes: [
          "id",
          "nombres",          
          "latitude",
          "longitude",
          "descripcion",
          "direccion",          
          "telefono",
          "celular",
          "tipo",
          "icon"          
        ],
      })
        .then((clientes) =>
          resolve(clientes)
        )
        .catch((reason) => reject(reason));
    });
  }

  
  
  
}

export default ClienteService;
