'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombres: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      web: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      registrado: {
        type: Sequelize.BOOLEAN
      },
      habilitado: {
        type: Sequelize.BOOLEAN
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      rolId: {
      type: Sequelize.INTEGER,
        references: {
          model: 'Rols',
          key: 'id',
          as: 'rolId'
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
    await queryInterface.dropTable('Clientes');
  }
};