'use strict';
const bcrypt = require('bcrypt-nodejs')
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombres: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    email: DataTypes.STRING,
    web: DataTypes.STRING,
    filename: DataTypes.STRING,
    portada: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    registrado: DataTypes.BOOLEAN,
    habilitado: DataTypes.BOOLEAN,
    hinicio: DataTypes.STRING,
    hfin: DataTypes.STRING,
    hestado: DataTypes.BOOLEAN,
    coordenadas: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,    
    snum: DataTypes.INTEGER,
    paqueteId: DataTypes.INTEGER,    
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    tipo: DataTypes.STRING,
    icon: DataTypes.STRING,
    banner: DataTypes.STRING,
    slider: DataTypes.STRING,
    video: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [5, 10]
      }
    },
    password: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    rolId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rol',
        key: 'id',
        as: 'rolId'
      }
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categoria',
        key: 'id',
        as: 'categoriaId'
      }
    },
    paqueteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Paquete',
        key: 'id',
        as: 'paqueteId'
      }
    },

  }, {});
  Cliente.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  Cliente.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };
  Cliente.associate = function (models) {
    // associations can be defined here
    Cliente.belongsTo(models.Rol, {
      foreignKey: 'rolId',
      onDelete: 'CASCADE'
    });
    Cliente.belongsTo(models.Categoria, {
      foreignKey: 'categoriaId',
      onDelete: 'CASCADE'
    });
    Cliente.belongsTo(models.Paquete, {
      foreignKey: 'paqueteId',
      onDelete: 'CASCADE'
    });

  };
  return Cliente;
};
