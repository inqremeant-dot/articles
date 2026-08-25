const { Comment, Article } = require('../../models');
const { Op } = require('sequelize');

// Создать комментарий (POST /article/:id/comment/)
exports.create = async (req, res) => {
  try {
    const { id: ArticleId } = req.params;
    const { text } = req.body;

    // Проверяем, существует ли статья
    const article = await Article.findByPk(ArticleId);
    if (!article) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }

    if (!text) {
      return res.status(400).json({ error: 'Текст комментария обязателен' });
    }

    const comment = await Comment.create({ text, ArticleId });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при создании комментария' });
  }
};

// Получить все комментарии к статье (GET /article/:id/comments/)
exports.findAll = async (req, res) => {
  try {
    const { id: ArticleId } = req.params;
    
    const article = await Article.findByPk(ArticleId);
    if (!article) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }

    const comments = await Comment.findAll({
      where: { ArticleId },
      order: [['createdAt', 'ASC']]
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении комментариев' });
  }
};

// Получить один комментарий (GET /article/:id/comment/:commentId/)
exports.findOne = async (req, res) => {
  try {
    const { id: ArticleId, commentId } = req.params;
    
    const comment = await Comment.findOne({
      where: { id: commentId, ArticleId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Комментарий не найден' });
    }

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении комментария' });
  }
};

// Обновить комментарий (PATCH /article/:id/comment/:commentId/)
exports.update = async (req, res) => {
  try {
    const { id: ArticleId, commentId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Текст комментария обязателен' });
    }

    const comment = await Comment.findOne({
      where: { id: commentId, ArticleId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Комментарий не найден' });
    }

    comment.text = text;
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при обновлении комментария' });
  }
};

// Удалить комментарий (DELETE /article/:id/comment/:commentId/)
exports.delete = async (req, res) => {
  try {
    const { id: ArticleId, commentId } = req.params;
    
    const comment = await Comment.findOne({
      where: { id: commentId, ArticleId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Комментарий не найден' });
    }

    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при удалении комментария' });
  }
};

// Аналитика: комментарии за период с группировкой по статьям
// GET /analytic/comments/?dateFrom=timestamp&dateTo=timestamp
exports.analytic = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;

    // Преобразуем timestamp (число миллисекунд) в объект Date
    const from = new Date(parseInt(dateFrom));
    const to = new Date(parseInt(dateTo));

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return res.status(400).json({ error: 'Некорректные даты' });
    }

    // Ищем комментарии в диапазоне
    const comments = await Comment.findAll({
      where: {
        createdAt: {
          [Op.between]: [from, to]
        }
      },
      include: [
        {
          model: Article,
          attributes: ['id', 'title'] // берем только нужные поля статьи
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    // Группируем вручную по статьям
    const grouped = comments.reduce((acc, comment) => {
      const articleId = comment.ArticleId;
      if (!acc[articleId]) {
        acc[articleId] = {
          article: {
            id: comment.Article.id,
            title: comment.Article.title
          },
          comments: []
        };
      }
      acc[articleId].comments.push({
        id: comment.id,
        text: comment.text,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      });
      return acc;
    }, {});

    // Превращаем объект в массив
    const result = Object.values(grouped);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении аналитики' });
  }
};