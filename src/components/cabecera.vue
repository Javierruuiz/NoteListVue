<script setup>
import { ref } from "vue";
const emit = defineEmits(["altaRecordatorio"]);

var textoNuevaNota = ref("");

function altaNuevaNota() {
  emit("altaRecordatorio", textoNuevaNota.value);
  textoNuevaNota.value = "";
}
</script>

<template>
  <div class="container">
    <h1>Proyecto Vue.js - Javier Ruiz Sachez</h1>
    <input v-model="textoNuevaNota" placeholder="¿Qué quieres recordar?" v-on:keyup.enter="altaNuevaNota" />
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
}

input::placeholder {
  color: #aaa;
}
</style>