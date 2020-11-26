'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contrato = sequelize.define('Contrato', {
    motivo: DataTypes.STRING,
    subTotal: DataTypes.DECIMAL,
    totalSaldo: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN,
    fContrato: DataTypes.DATE,
    fVencimiento: DataTypes.DATE,
    clienteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cliente',
        key: 'id',
        as: 'clienteId'
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
  Contrato.associate = function (models) {
    // associations can be defined here
    Contrato.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
      onDelete: 'CASCADE'
    });
    Contrato.belongsTo(models.Paquete, {
      foreignKey: 'paqueteId',
      onDelete: 'CASCADE'
    });
  };
  return Contrato;
};