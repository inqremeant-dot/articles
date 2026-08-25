const { Article } = require('../../models');

// Создать статью (POST /article/)
exports.create = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: 'Поля title и text обязательны' });
    }
    const article = await Article.create({ title, text });
    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при создании статьи' });
  }
};

// Получить все статьи (GET /articles/)
exports.findAll = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении статей' });
  }
};

// Получить одну статью (GET /article/:id/)
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении статьи' });
  }
};

// Обновить статью (PATCH /article/:id/)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }

    // Обновляем только переданные поля
    if (title !== undefined) article.title = title;
    if (text !== undefined) article.text = text;
    
    await article.save();
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при обновлении статьи' });
  }
};

// Удалить статью (DELETE /article/:id/)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Статья не найдена' });
    }
    
    await article.destroy();
    res.status(204).send(); // Нет содержимого, успешно удалено
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при удалении статьи' });
  }
};