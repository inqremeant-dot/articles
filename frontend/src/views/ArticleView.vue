<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="article">
    <v-card>
      <v-card-title>{{ article.title }}</v-card-title>
      <v-card-text>
        <p>{{ article.text }}</p>
        <v-divider />
        <h3>Комментарии</h3>
        <CommentList
          :comments="comments"
          :articleId="article.id"
          @refresh="fetchComments(article.id)"
        />
        <CommentForm :articleId="article.id" @comment-added="fetchComments(article.id)" />
      </v-card-text>
      <v-card-actions>
        <v-btn :to="{ name: 'ArticleEdit', params: { id: article.id } }" color="primary">
          Редактировать статью
        </v-btn>
        <v-btn color="error" @click="removeArticle">Удалить статью</v-btn>
        <v-btn :to="{ name: 'ArticlesList' }">Назад</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else>Статья не найдена</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CommentList from '../components/CommentList.vue';
import CommentForm from '../components/CommentForm.vue';

export default {
  components: { CommentList, CommentForm },
  props: ['id'],
  computed: {
    ...mapGetters(['currentArticle', 'articleComments', 'isLoading']),
    article() { return this.currentArticle; },
    comments() { return this.articleComments; },
    loading() { return this.isLoading; },
  },
  methods: {
    ...mapActions(['fetchArticle', 'fetchComments', 'deleteArticle']),
    async removeArticle() {
      if (confirm('Удалить статью вместе со всеми комментариями?')) {
        await this.deleteArticle(this.id);
        this.$router.push({ name: 'ArticlesList' });
      }
    },
  },
  mounted() {
    this.fetchArticle(this.id);
    this.fetchComments(this.id);
  },
};
</script>