<script setup lang="ts">
import { doLogin } from "@/services/api";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

async function login() {
  console.log(email.value, password.value);

  const response = await doLogin(email.value, password.value);
  console.log(response);
  router.push("/listmentor");
}
</script>

<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <div>
        <v-text-field
          v-model="email"
          class="mb-2"
          label="Email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          placeholder="Insira sua senha"
          clearable
        ></v-text-field>

        <br />

        <v-btn
          color="success"
          size="large"
          type="submit"
          @click="login"
          variant="elevated"
          block
        >
          Sign In
        </v-btn>
      </div>
    </v-card>
  </v-sheet>
</template>
