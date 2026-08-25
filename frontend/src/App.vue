<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Статьи</v-app-bar-title>
      <v-btn to="/" text>Список</v-btn>
      <v-btn to="/article/create" text>Создать статью</v-btn>
      <v-btn to="/analytics" text>Аналитика</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
</script>