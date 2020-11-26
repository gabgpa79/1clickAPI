'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotaCobranza = sequelize.define('NotaCobranza', {
    nro: DataTypes.STRING,
    monto: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN,
    imagen: DataTypes.STRING,
    contratoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Contrato',
        key: 'id',
        as: 'contratoId'
      }
    },
  }, {});
  NotaCobranza.associate = function(models) {
    // associations can be defined here
    NotaCobranza.belongsTo(models.Contrato,{
      foreignKey: 'contratoId',
      onDelete: 'CASCADE'
    }); 
  };
  return NotaCobranza;
};