<template>
  <v-card>
    <v-card-title>{{ isEdit ? 'Редактировать статью' : 'Создать статью' }}</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="title"
          label="Название"
          required
          :rules="[v => !!v || 'Название обязательно']"
        />
        <v-textarea
          v-model="text"
          label="Текст статьи"
          required
          :rules="[v => !!v || 'Текст обязателен']"
          rows="5"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="save">Сохранить</v-btn>
      <v-btn @click="$router.back()">Отмена</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      title: '',
      text: '',
    };
  },
  computed: {
    isEdit() { return !!this.id; },
  },
  methods: {
    ...mapActions(['createArticle', 'updateArticle', 'fetchArticle']),
    async save() {
      const valid = await this.$refs.form.validate();
      if (!valid) return;
      try {
        if (this.isEdit) {
          await this.updateArticle({ id: this.id, data: { title: this.title, text: this.text } });
        } else {
          await this.createArticle({ title: this.title, text: this.text });
        }
        this.$router.push({ name: 'ArticlesList' });
      } catch (e) {
        alert('Ошибка сохранения');
      }
    },
  },
  async mounted() {
    if (this.isEdit) {
      await this.fetchArticle(this.id);
      this.title = this.$store.getters.currentArticle?.title || '';
      this.text = this.$store.getters.currentArticle?.text || '';
    }
  },
};
</script>