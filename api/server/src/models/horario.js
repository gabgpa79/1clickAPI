'use strict';
module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define('Horario', {
    dia: DataTypes.INTEGER,
    hinicio: DataTypes.STRING,
    hfin: DataTypes.STRING,    
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    },
    sucursalId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    },    
  }, {});
  Horario.associate = function (models) {
    // associations can be defined here
    Horario.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
    Horario.belongsTo(models.Sucursal, {
      foreignKey: 'sucursalId',
      onDelete: 'CASCADE'
    });    
  };
  return Horario;
};