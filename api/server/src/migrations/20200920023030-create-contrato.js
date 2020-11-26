'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contratos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      motivo: {
        type: Sequelize.STRING
      },
      subTotal: {
        type: Sequelize.DECIMAL
      },
      totalSaldo: {
        type: Sequelize.DECIMAL
      },
      total: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      fContrato: {
        type: Sequelize.DATE
      },
      fVencimiento: {
        type: Sequelize.DATE
      },
      clienteId: {
      type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
          as: 'clienteId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contratos');
  }
};