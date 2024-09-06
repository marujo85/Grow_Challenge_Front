<script lang="ts" setup>
// import router from "./router";
// import { createRouter, createWebHistory } from "vue-router";
// import ListMentorView from "./view/ListMentorView.vue";
// import AddMentorView from "./view/AddMentorView.vue";
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <v-list>
        <v-img
          class="mx-auto my-6"
          max-width="200"
          src="./assets/logo-growdev.png"
        ></v-img>
        <v-list-item class="bg-amber-darken-3 text-center border"
          ><RouterLink to="/addmentor" class="text-decoration-none"
            ><strong class="text-indigo-darken-4 text-h6 font-weight-bold"
              >Adicionar Mentor</strong
            ></RouterLink
          ></v-list-item
        >

        <v-list-item class="bg-orange-darken-3 text-center"
          ><RouterLink to="/listmentor" class="text-decoration-none">
            <strong class="text-indigo-darken-4 text-h6 font-weight-bold"
              >Listar Mentores</strong
            ></RouterLink
          ></v-list-item
        >
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <RouterView />
    </v-main>

    <v-bottom-navigation grow class="d-flex d-lg-none">
      <v-btn>
        <RouterLink to="/listmentor"
          ><img
            src="./components/icons/list_car_icon.svg"
            alt="Listar Mentores"
            width="30"
        /></RouterLink>
      </v-btn>

      <v-btn>
        <RouterLink to="/addmentor"
          ><img
            src="./components/icons/add_car_icon.svg"
            alt="Adicionar Novo Mentor"
            width="30"
        /></RouterLink>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
