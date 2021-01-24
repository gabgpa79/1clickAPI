import database from "../src/models";
import jwt from "jsonwebtoken";
import moment from 'moment'

const bcrypt = require("bcrypt-nodejs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Usuario } = database;

class UsuarioService {

  
  static add(newUsuario) {    
    return new Promise((resolve, reject) => {
        const user = newUsuario
        user.password = bcrypt.hashSync(newUsuario.password, bcrypt.genSaltSync(10), null);  
      Usuario.create(user)
        .then((usuario) => {
            let payload = { usuario_id: usuario.id, username: usuario.username };
            let token = jwt.sign(payload, "click2020", {
              expiresIn: "2629746000",
            });            
            resolve({
                auth: true,
                message: "Usuario Regitrado",
                user: usuario,
                token: token,
              });
        }       
        
        )
        .catch((reason) => reject(reason));
   });
  }

  static getUsername(username) {      
    return new Promise((resolve, reject) => {
      Usuario.findOne({
        where: { username: username },
      })
        .then((usuario) => resolve((usuario = usuario ? false : true)))
        .catch((reason) => reject(reason));
    });
  }

  static login(username, password) {
    return new Promise((resolve, reject) => {
      Usuario.findOne({
        where: { username: { [Op.eq]: username } }                
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

  static getId(usuarioId) {
    return new Promise((resolve, reject) => {
      Usuario.findByPk(usuarioId,{
        attributes: [
          "id",
          "nombre",
          "email",
          "telefono",          
          "refnombre",
          "refemail"
        ],
      })
        .then((usuario) => resolve(usuario))
        .catch((reason) => reject(reason));
    });
  }
  
}

export default UsuarioService;
