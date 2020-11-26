'use strict';
const bcrypt = require('bcrypt-nodejs')
module.exports = (sequelize, DataTypes) => {
  const Sucursal = sequelize.define('Sucursal', {
    nombre: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    direccion: DataTypes.STRING,
    hinicio: DataTypes.STRING,
    hfin: DataTypes.DATE,
    hestado: DataTypes.DATE,
    coordenadas: DataTypes.STRING,
    telefono: DataTypes.STRING,
    celular: DataTypes.STRING,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL,    
    tipo: DataTypes.STRING,
    icon: DataTypes.STRING,
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    },
  }, {});

  Sucursal.associate = function (models) {
    // associations can be defined here
    Sucursal.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
  };
  return Sucursal;
};