'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Articles', [
      {
        title: 'Первая статья',
        text: 'Это текст первой статьи. Здесь много полезной информации.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Вторая статья',
        text: 'А это вторая статья. Она тоже важная.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};