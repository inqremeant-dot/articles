<template>
  <v-card>
    <v-card-title>Аналитика комментариев</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Дата от"
            type="date"
            v-model="dateFrom"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Дата до"
            type="date"
            v-model="dateTo"
          />
        </v-col>
      </v-row>
      <v-btn color="primary" @click="search">Показать</v-btn>
      <v-divider class="my-4" />
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="groups.length === 0">Нет комментариев за выбранный период</div>
      <div v-else>
        <v-card
          v-for="group in groups"
          :key="group.article.id"
          class="mb-4"
          outlined
        >
          <v-card-title>{{ group.article.title }}</v-card-title>
          <v-card-text>
            <ul>
              <li v-for="comment in group.comments" :key="comment.id">
                {{ comment.text }} ({{ new Date(comment.createdAt).toLocaleString() }})
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      dateFrom: '',
      dateTo: '',
    };
  },
  computed: {
    ...mapGetters(['analytic', 'isLoading']),
    groups() { return this.analytic; },
    loading() { return this.isLoading; },
  },
  methods: {
    ...mapActions(['fetchAnalytic']),
    search() {
      if (!this.dateFrom || !this.dateTo) {
        alert('Выберите обе даты');
        return;
      }
      // Преобразуем даты в timestamp (миллисекунды)
      const from = new Date(this.dateFrom).getTime();
      const to = new Date(this.dateTo).getTime();
      this.fetchAnalytic({ dateFrom: from, dateTo: to });
    },
  },
};
</script>