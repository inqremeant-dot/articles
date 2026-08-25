'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Сначала получим ID статей, чтобы привязать комментарии
    const articles = await queryInterface.sequelize.query(
      `SELECT id FROM "Articles";`
    );
    const articleRows = articles[0];

    if (articleRows.length >= 2) {
      await queryInterface.bulkInsert('Comments', [
        {
          text: 'Отличная статья, спасибо!',
          ArticleId: articleRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: 'Очень познавательно.',
          ArticleId: articleRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          text: 'Жду продолжения!',
          ArticleId: articleRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};