import UsuarioService from "../services/UsuarioService";
import MailService from "../services/MailService";
import MailController from "./MailController";

import jwt from "jsonwebtoken";
import moment from 'moment'
const bcrypt = require("bcrypt-nodejs");

class UsuarioController {

  static addUsuario(req, res) {
    if (req.body.nombre) {
      Promise.all([UsuarioService.add(req.body)])
        .then(([usuario]) => {
          res.status(200).send({ message: "registrado" });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static verificarUsername(req, res) {
    if (req.params.username) {
      Promise.all([UsuarioService.getUsername(req.params.username)])
        .then(([user]) => {
          res.status(200).send({ message: "user", result: user });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static sendPanico(req, res) {    
    const { nombre, refemail  } = req.body    
    if (refemail && nombre) {      
      Promise.all([MailController.sendPanico(req.body)])
        .then(([user]) => {
          res.status(200).send({ message: "user", result: user });
        })
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });
    } else {
      res.status(400).send({ message: "datos faltantes" });
    }
  }

  static login(req, res) {
    const { username, password } = req.body;
    Promise.all([UsuarioService.login(username, password)])
      .then(([user]) => {
        res.status(200).send({ message: "user", result: user });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });    
  }
  
  static getItem(req, res) {    
    Promise.all([UsuarioService.getId(req.params.id)])
      .then(([user]) => {
        res.status(200).send({ message: "user", result: user });
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });    
  }


}

  

export default UsuarioController;
