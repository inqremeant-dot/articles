<template>
  <div>
    <div v-if="comments.length === 0">Нет комментариев</div>
    <v-list>
      <v-list-item v-for="comment in comments" :key="comment.id">
        <v-list-item-content>
          <v-list-item-title>{{ comment.text }}</v-list-item-title>
          <v-list-item-subtitle>{{ new Date(comment.createdAt).toLocaleString() }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon small @click="editComment(comment)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small color="red" @click="removeComment(comment.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Редактировать комментарий</v-card-title>
        <v-card-text>
          <v-textarea v-model="editText" label="Текст" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEdit">Сохранить</v-btn>
          <v-btn @click="dialog = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['comments', 'articleId'],
  data() {
    return {
      dialog: false,
      editText: '',
      editingCommentId: null,
    };
  },
  methods: {
    ...mapActions(['deleteComment', 'updateComment']),
    editComment(comment) {
      this.editingCommentId = comment.id;
      this.editText = comment.text;
      this.dialog = true;
    },
    async saveEdit() {
      if (!this.editText.trim()) return;
      await this.updateComment({
        articleId: this.articleId,
        commentId: this.editingCommentId,
        data: { text: this.editText },
      });
      this.dialog = false;
      this.$emit('refresh');
    },
    async removeComment(id) {
      if (confirm('Удалить комментарий?')) {
        await this.deleteComment({ articleId: this.articleId, commentId: id });
        this.$emit('refresh');
      }
    },
  },
};
</script>