'use strict';
const bcrypt = require('bcrypt-nodejs')
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,    
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    telefono: DataTypes.STRING,    
    email: DataTypes.STRING,    
    reftelefono: DataTypes.STRING,
    refnombre: DataTypes.STRING,
    refemail: DataTypes.STRING   
  }, {});

  Usuario.beforeSave((user, options) => {  
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);      
    }
  });
  Usuario.prototype.comparePassword = function (passw, cb) {    
    bcrypt.compare(passw, this.password, function (err, isMatch) {

      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  Usuario.associate = function (models) {
    // associations can be defined here    

  };
  return Usuario;
};
