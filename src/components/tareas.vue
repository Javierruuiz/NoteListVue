<script setup>
defineProps(["titulo", "prioridad", "fechaCreacion", "acabada"]);
const emit = defineEmits(["borrado", "completada", "actualizarPrioridad"]);

// Función para manejar el cambio de prioridad
function cambiarPrioridad(event) {
  emit("actualizarPrioridad", event.target.value);
}

// Función para alternar el estado de completado
function alternarCompletado() {
  emit("completada");
}
</script>

<template>
  <div class="tarea" :class="{ completada: acabada }">
    <div class="detalles">
      <h3>{{ titulo }}</h3>
      <p>
        Priority: 
        <select :value="prioridad" @change="cambiarPrioridad">
          <option value="alta">High</option>
          <option value="media">Medium</option>
          <option value="baja">Low</option>
        </select>
      </p>
      <small>Added: {{ fechaCreacion }}</small>
    </div>
    <div class="acciones">
      <button @click="alternarCompletado">
        {{ acabada ? "Uncheck" : "Check" }}
      </button>
      <button @click="$emit('borrado')">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.tarea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.tarea.completada {
  background-color: #d4edda;
}

.detalles {
  flex: 1;
}

h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

p {
  margin: 5px 0;
  font-size: 14px;
}

small {
  color: #777;
}

select {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
}

select:focus {
  border-color: #007bff;
}

.acciones {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #004085;
}

button:last-child {
  background-color: #dc3545;
}

button:last-child:hover {
  background-color: #c82333;
}

button:last-child:active {
  background-color: #bd2130;
}
</style>
