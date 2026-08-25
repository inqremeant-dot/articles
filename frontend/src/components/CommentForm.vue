<template>
  <div class="mt-4">
    <v-textarea
      v-model="text"
      label="Ваш комментарий"
      rows="2"
    />
    <v-btn color="primary" @click="addComment">Отправить</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['articleId'],
  data() {
    return {
      text: '',
    };
  },
  methods: {
    ...mapActions(['createComment']),
    async addComment() {
      if (!this.text.trim()) return;
      await this.createComment({
        articleId: this.articleId,
        data: { text: this.text },
      });
      this.text = '';
      this.$emit('comment-added');
    },
  },
};
</script>