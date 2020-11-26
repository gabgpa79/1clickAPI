'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlanPagos = sequelize.define('PlanPagos', {
    monto: DataTypes.DECIMAL,
    cuota: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    fvencimiento: DataTypes.DATE,
    estado: DataTypes.STRING,
    notaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NotaCobranza',
        key: 'id',
        as: 'notaId'
      }
    },
  }, {});
  PlanPagos.associate = function (models) {
    // associations can be defined here
    PlanPagos.belongsTo(models.NotaCobranza, {
      foreignKey: 'notaId',
      onDelete: 'CASCADE'
    });

  };
  return PlanPagos;
};