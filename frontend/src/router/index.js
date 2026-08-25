import { createRouter, createWebHistory } from 'vue-router';
import ArticlesList from '../views/ArticlesList.vue';
import ArticleView from '../views/ArticleView.vue';
import ArticleForm from '../views/ArticleForm.vue';
import Analytics from '../views/Analytics.vue';

const routes = [
  { path: '/', name: 'ArticlesList', component: ArticlesList },
  { path: '/article/:id', name: 'ArticleView', component: ArticleView, props: true },
  { path: '/article/create', name: 'ArticleCreate', component: ArticleForm },
  { path: '/article/edit/:id', name: 'ArticleEdit', component: ArticleForm, props: true },
  { path: '/analytics', name: 'Analytics', component: Analytics },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;