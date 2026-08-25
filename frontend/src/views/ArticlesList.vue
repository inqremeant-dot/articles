<template>
  <v-card>
    <v-card-title>
      Список статей
      <v-spacer />
      <v-btn color="primary" :to="{ name: 'ArticleCreate' }">
        Создать статью
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="articles"
      :loading="loading"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon small :to="{ name: 'ArticleView', params: { id: item.id } }">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon small :to="{ name: 'ArticleEdit', params: { id: item.id } }">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small color="red" @click="deleteArticle(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['allArticles', 'isLoading']),
    articles() { return this.allArticles; },
    loading() { return this.isLoading; },
  },
  data() {
    return {
      headers: [
        { title: 'ID', key: 'id', sortable: true },
        { title: 'Название', key: 'title' },
        { title: 'Дата создания', key: 'createdAt' },
        { title: 'Дата изменения', key: 'updatedAt' },
        { title: 'Действия', key: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    ...mapActions(['fetchArticles', 'deleteArticle']),
    async deleteArticle(id) {
      if (confirm('Удалить статью?')) {
        await this.deleteArticle(id);
        this.fetchArticles(); // обновим список
      }
    },
  },
  mounted() {
    this.fetchArticles();
  },
};
</script>