'use strict';
module.exports = (sequelize, DataTypes) => {
  const Modulo = sequelize.define('Modulo', {
    path: DataTypes.STRING,
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    component: DataTypes.STRING,
    layout: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    rolId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rol',
        key: 'id',
        as: 'rolId'
      }
    },
  }, {});
  Modulo.associate = function(models) {
    // associations can be defined here
    Modulo.belongsTo(models.Rol,{
      foreignKey: 'rolId',
      onDelete: 'CASCADE'
    }); 
  };
  return Modulo;
};