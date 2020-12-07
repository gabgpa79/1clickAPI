import database from '../src/models';
import path from 'path'
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var multer = require('multer');
var uuidv4 = require('uuid');
var sharp = require('sharp');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'api/public/images/trash')
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')

class FileService {

  static uploads(req, res) {
    return new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          resolve(err)
        } else if (err) {
          resolve(err)
        }
        sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/clientes/lg/' + req.file.filename);
        sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/clientes/md/' + req.file.filename);
        sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/clientes/sm/' + req.file.filename);
        resolve(req.file)
      })
    })
  }

  static puploads(req, res) {
    return new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          resolve(err)
        } else if (err) {
          resolve(err)
        }
        sharp(req.file.path).resize({ height: 500 }).toFile('./api/public/images/clientes/portada/lg/' + req.file.filename);
        sharp(req.file.path).resize({ height: 250 }).toFile('./api/public/images/clientes/portada/md/' + req.file.filename);
        sharp(req.file.path).resize({ height: 120 }).toFile('./api/public/images/clientes/portada/sm/' + req.file.filename);
        resolve(req.file)
      })
    })
  }

  static banner(req, res) {
    return new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          resolve(err)
        } else if (err) {
          resolve(err)
        }
        sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/banner/lg/' + req.file.filename);
        sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/banner/md/' + req.file.filename);
        sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/banner/sm/' + req.file.filename);
        resolve(req.file)
      })
    })
  }

  static slider(req, res) {
    return new Promise((resolve, reject) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          resolve(err)
        } else if (err) {
          resolve(err)
        }
        sharp(req.file.path).resize({ height: 300 }).toFile('./api/public/images/slider/lg/' + req.file.filename);
        sharp(req.file.path).resize({ height: 150 }).toFile('./api/public/images/slider/md/' + req.file.filename);
        sharp(req.file.path).resize({ height: 75 }).toFile('./api/public/images/slider/sm/' + req.file.filename);
        resolve(req.file)
      })
    })
  }
  
}

export default FileService;