import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // адрес бэкенда
  headers: {
    'Content-Type': 'application/json',
  },
});

// Статьи
export const getArticles = () => api.get('/articles/');
export const getArticle = (id) => api.get(`/article/${id}/`);
export const createArticle = (data) => api.post('/article/', data);
export const updateArticle = (id, data) => api.patch(`/article/${id}/`, data);
export const deleteArticle = (id) => api.delete(`/article/${id}/`);

// Комментарии
export const getComments = (articleId) => api.get(`/article/${articleId}/comments/`);
export const getComment = (articleId, commentId) => api.get(`/article/${articleId}/comment/${commentId}/`);
export const createComment = (articleId, data) => api.post(`/article/${articleId}/comment/`, data);
export const updateComment = (articleId, commentId, data) => api.patch(`/article/${articleId}/comment/${commentId}/`, data);
export const deleteComment = (articleId, commentId) => api.delete(`/article/${articleId}/comment/${commentId}/`);

// Аналитика
export const getCommentsAnalytic = (dateFrom, dateTo) =>
  api.get(`/analytic/comments/?dateFrom=${dateFrom}&dateTo=${dateTo}`);

export default api;