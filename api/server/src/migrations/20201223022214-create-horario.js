'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Horarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dia: {
        type: Sequelize.INTEGER
      },
      hinicio: {
        type: Sequelize.STRING
      },
      hfin: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Horarios');
  }
};