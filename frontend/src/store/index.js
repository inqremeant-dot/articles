import { createStore } from 'vuex';
import * as api from '../api';

export default createStore({
  state: {
    articles: [],
    currentArticle: null,
    comments: [],
    analyticData: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_LOADING(state, payload) { state.loading = payload; },
    SET_ERROR(state, payload) { state.error = payload; },
    SET_ARTICLES(state, articles) { state.articles = articles; },
    SET_CURRENT_ARTICLE(state, article) { state.currentArticle = article; },
    SET_COMMENTS(state, comments) { state.comments = comments; },
    ADD_COMMENT(state, comment) { state.comments.push(comment); },
    UPDATE_COMMENT(state, { id, data }) {
      const index = state.comments.findIndex(c => c.id === id);
      if (index !== -1) state.comments[index] = data;
    },
    DELETE_COMMENT(state, id) {
      state.comments = state.comments.filter(c => c.id !== id);
    },
    ADD_ARTICLE(state, article) { state.articles.unshift(article); },
    UPDATE_ARTICLE(state, { id, data }) {
      const index = state.articles.findIndex(a => a.id === id);
      if (index !== -1) state.articles[index] = data;
      if (state.currentArticle?.id === id) state.currentArticle = data;
    },
    DELETE_ARTICLE(state, id) {
      state.articles = state.articles.filter(a => a.id !== id);
      if (state.currentArticle?.id === id) state.currentArticle = null;
    },
    SET_ANALYTIC(state, data) { state.analyticData = data; },
  },
  actions: {
    // ---- Статьи ----
    async fetchArticles({ commit }) {
      commit('SET_LOADING', true);
      try {
        const res = await api.getArticles();
        commit('SET_ARTICLES', res.data);
        commit('SET_ERROR', null);
      } catch (e) {
        commit('SET_ERROR', e.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchArticle({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        const res = await api.getArticle(id);
        commit('SET_CURRENT_ARTICLE', res.data);
        commit('SET_ERROR', null);
      } catch (e) {
        commit('SET_ERROR', e.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async createArticle({ commit }, data) {
      commit('SET_LOADING', true);
      try {
        const res = await api.createArticle(data);
        commit('ADD_ARTICLE', res.data);
        commit('SET_ERROR', null);
        return res.data;
      } catch (e) {
        commit('SET_ERROR', e.message);
        throw e;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async updateArticle({ commit }, { id, data }) {
      commit('SET_LOADING', true);
      try {
        const res = await api.updateArticle(id, data);
        commit('UPDATE_ARTICLE', { id, data: res.data });
        commit('SET_ERROR', null);
        return res.data;
      } catch (e) {
        commit('SET_ERROR', e.message);
        throw e;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async deleteArticle({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        await api.deleteArticle(id);
        commit('DELETE_ARTICLE', id);
        commit('SET_ERROR', null);
      } catch (e) {
        commit('SET_ERROR', e.message);
        throw e;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    // ---- Комментарии ----
    async fetchComments({ commit }, articleId) {
      commit('SET_LOADING', true);
      try {
        const res = await api.getComments(articleId);
        commit('SET_COMMENTS', res.data);
        commit('SET_ERROR', null);
      } catch (e) {
        commit('SET_ERROR', e.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async createComment({ commit }, { articleId, data }) {
      commit('SET_LOADING', true);
      try {
        const res = await api.createComment(articleId, data);
        commit('ADD_COMMENT', res.data);
        commit('SET_ERROR', null);
        return res.data;
      } catch (e) {
        commit('SET_ERROR', e.message);
        throw e;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async updateComment({ commit }, { articleId, commentId, data }) {
      commit('SET_LOADING', true);
      try {
        const res = await api.updateComment(articleId, commentId, data);
        commit('UPDATE_COMMENT', { id: commentId, data: res.data });
        commit('SET_ERROR', null);
        return res.data;
      } catch (e) {
        commit('SET_ERROR', e.message);
        throw e;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async deleteComment({ commit }, { articleId, commentId }) {
      commit('SET_LOADING', true);
      try {
        await api.deleteComment(articleId, commentId);
        commit('DELETE_COMMENT', commentId);
        commit('SET_ERROR', null);
      } catch (e) {
        commit('SET_ERROR', e.message);
        throw e;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    // ---- Аналитика ----
    async fetchAnalytic({ commit }, { dateFrom, dateTo }) {
      commit('SET_LOADING', true);
      try {
        const res = await api.getCommentsAnalytic(dateFrom, dateTo);
        commit('SET_ANALYTIC', res.data);
        commit('SET_ERROR', null);
      } catch (e) {
        commit('SET_ERROR', e.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
  getters: {
    isLoading: state => state.loading,
    getError: state => state.error,
    allArticles: state => state.articles,
    currentArticle: state => state.currentArticle,
    articleComments: state => state.comments,
    analytic: state => state.analyticData,
  },
});