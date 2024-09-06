<script setup lang="ts">
import router from "@/router";
import { addNewMentor } from "@/services/apiUsers";
import { onMounted, ref } from "vue";

const name = ref<string>("");
const email = ref<string>("");
const cpf = ref<string>("");

async function addMentor() {
  try {
    const response = await addNewMentor(name.value, email.value, cpf.value);
    if (response) {
      router.push("/listmentor");
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  ("/addmentor");
});
</script>

<template>
  <main>
    <div class="tabela">
      <h1>Adicionar um Mentor</h1>
      <v-text-field label="Nome" v-model="name"></v-text-field>
      <v-text-field label="Email" v-model="email"></v-text-field>
      <v-text-field label="CPF" v-model="cpf"></v-text-field>

      <v-btn
        @click="addMentor"
        elevation="20"
        class="bg-amber-darken-3 outlined text-indigo-darken-4 text-h6"
        >Adicionar</v-btn
      >
    </div>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}
.tabela {
  width: 60%;
  max-width: 1200px;
  min-width: 600px;
}

@media (max-width: 768px) {
  .tabela {
    min-width: unset;
  }
}
</style>
