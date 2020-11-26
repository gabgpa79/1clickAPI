'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proceso = sequelize.define('Proceso', {
    proceso: DataTypes.STRING,    
    ingreso: DataTypes.BOOLEAN,
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
      }
    },
  }, {});
  Proceso.associate = function(models) {
    // associations can be defined here
    Proceso.belongsTo(models.Cliente,{
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
  };
  return Proceso;
};