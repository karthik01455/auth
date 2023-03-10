'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      emailId: {
        type: Sequelize.STRING,
        unique: true
      
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
       
      },
      address: {
        type: Sequelize.TEXT,
        
      },
      password:{
        type: Sequelize.STRING,
        allowNull:false

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
  }
};
