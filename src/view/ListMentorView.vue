<script setup lang="ts">
import { nextTick } from "vue";
import type { MentorType } from "@/Types/MentorType";
import { client } from "@/services/apiUsers";
import { onMounted, ref } from "vue";
import router from "@/router";
import { getToken } from "@/utils/getToken";

const mentors = ref<MentorType[]>([]);
const mentorEdited = ref<MentorType | null>(null);
const isModalOpen = ref(false);
const searchQuery = ref<string>("");

async function indexMentor() {
  try {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    const response = await client.get("/mentors", config);
    mentors.value = response.data;
  } catch (error) {
    console.log(error);
  }
}

async function selectToDelete(mentor: MentorType) {
  try {
    const confirmation = confirm(
      `Você tem certeza que deseja deletar o mentor ${mentor.name}?`
    );

    if (confirmation) {
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` },
      };
      await client.delete(`/mentors/${mentor.id}`, config);
      mentors.value = mentors.value.filter((m) => m.id !== mentor.id);
      alert("Mentor deletado com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao deletar o mentor:", error);
    alert("Ocorreu um erro ao deletar o mentor.");
  }
}

async function filterMentors() {
  await indexMentor();
  mentors.value = mentors.value.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      mentor.cpf.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  console.log(mentors.value);
}

function selectToEdit(mentor: MentorType) {
  mentorEdited.value = { ...mentor };
  isModalOpen.value = true;
}

async function updateMentor() {
  if (!mentorEdited.value) return;

  try {
    const config = {
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    const response = await client.put(
      `/mentors/${mentorEdited.value.id}`,
      {
        name: mentorEdited.value.name,
        email: mentorEdited.value.email,
      },
      config
    );

    if (response.data.success) {
      const index = mentors.value.findIndex(
        (m) => m.id === mentorEdited.value!.id
      );
      if (index !== -1) {
        mentors.value[index] = { ...mentorEdited.value };
      }
      alert("Mentor atualizado com sucesso!");
      isModalOpen.value = false;

      await nextTick();
      router.push("/listmentor");
    } else {
      throw new Error("Falha ao atualizar mentor.");
    }
  } catch (error) {
    console.error("Erro ao atualizar o mentor:", error);
    alert("Ocorreu um erro ao atualizar o mentor.");
  }
}
onMounted(() => {
  indexMentor();
});
</script>

<template>
  <div class="about">
    <div class="search-container mb-12">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Procure por um mentor específico"
      />
      <button class="search-mentor" @click="filterMentors">Buscar</button>
    </div>
    <h2 class="title text-h4 ma-6">Lista de Atuais Mentores</h2>
    <v-table class="header-table">
      <thead class="text-orange-darken-4 text-h5 font-weight-bold gr-4">
        <tr>
          <th class="table-header text-center">Nome</th>
          <th class="table-header text-center">CPF</th>
          <th class="table-header text-center">Email</th>
          <th class="table-header text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mentor in mentors" :key="mentor.id">
          <td class="table-line text-center text-h6">{{ mentor.name }}</td>
          <td class="table-line text-center text-h6">{{ mentor.cpf }}</td>
          <td class="table-line text-center text-h6">{{ mentor.email }}</td>
          <td class="action-btns text-center text-h6">
            <v-btn
              elevation="20"
              size="large"
              class="btn-edit mr-5 text-none plain border-1"
              width="70px"
              height="30px"
              @click="selectToEdit(mentor)"
              >Editar</v-btn
            >
            <v-btn
              elevation="20"
              size="large"
              class="btn-delete text-none"
              width="70px"
              height="30px"
              @click="selectToDelete(mentor)"
              >Excluir</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>

  <v-dialog v-model="isModalOpen" max-width="600">
    <v-card class="pa-3">
      <div v-if="mentorEdited">
        <h3>Editando: {{ mentorEdited.name }}</h3>
        <v-text-field v-model="mentorEdited.name" label="Nome" />
        <v-text-field v-model="mentorEdited.email" label="Email" />
        <v-btn @click="updateMentor">Salvar</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.header-table {
  width: 900px;
  margin-top: 10px;
}

search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
}

.search-mentor {
  background-color: #ff9100;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffb300;
  }
}

.btn-edit:hover {
  background-color: #ffb300;
}

.btn-delete:hover {
  background-color: #ff5100;
}
@media (max-width: 768px) {
  .tabela {
    min-width: unset;
  }

  .table-header,
  .table-line {
    font-size: 14px;
  }

  .action-btns {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .table-header,
  .table-line {
    display: block;
    width: 100%;
    text-align: right;
    padding: 10px 0;
  }

  .table-line::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }

  .action-btns {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
