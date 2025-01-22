<script setup>
import { computed } from "vue";
import Cabecera from "./cabecera.vue";
import Tarea from "./tareas.vue";
import Pie from "./pie.vue";
import { useCollection, useFirestore,useCurrentUser } from "vuefire";
import { collection, addDoc, query,where, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";

const user = useCurrentUser();
const db = useFirestore();
let consulta;
let listaRecordatorios;

if (user.value.uid === "Uo17udecrNfxrOsagF1LR809Bos2") {
  listaRecordatorios = useCollection(query(collection(db, "recordatorio"), orderBy("prioridadValor", "desc")));
} else {
  listaRecordatorios = useCollection(query(collection(db, "recordatorio"), orderBy("prioridadValor", "desc"), where("user", "==", user.value.uid)));
}
// Función para calcular tiempo transcurrido
function calculateTime(taskTime) {
  const now = Date.now();
  const taskDate = new Date(taskTime).getTime();
  const timeElapsed = now - taskDate;

  const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));

  const timeString = [];
  if (days > 0) timeString.push(`${days} Day${days > 1 ? "s" : ""}`);
  if (hours > 0) timeString.push(`${hours} Hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) timeString.push(`${minutes} Minute${minutes > 1 ? "s" : ""}`);

  return timeString.join(", ") || "0 Minutes";
}

const taskTimes = computed(() =>
  listaRecordatorios.value.map((task) => calculateTime(task.fechaCreacion))
);

// Funciones principales de la lógica
function altaNuevaNota(texto, prioridadSeleccionada) {
  const prioridadValores = {
    baja: 1,
    media: 2,
    alta: 3,
  };

  const nuevaTarea = {
    titulo: texto,
    prioridad: prioridadSeleccionada || "media",
    prioridadValor: prioridadValores[prioridadSeleccionada || "media"],
    fechaCreacion: new Date().toISOString(),
    acabada: false,
    user:user.value.uid,
    

  };

  addDoc(collection(db, "recordatorio"), nuevaTarea).then(() => {
    console.log("Nueva tarea añadida");
  });
}

function borrarTarea(id) {
  deleteDoc(doc(db, "recordatorio", id))
    .then(() => {
      console.log("Tarea borrada exitosamente");
    })
    .catch((error) => {
      console.error("Error al borrar la tarea:", error);
    });
}

function completarTarea(indice) {
  const tarea = listaRecordatorios.value[indice];
  const tareaRef = doc(db, "recordatorio", tarea.id);

  updateDoc(tareaRef, { acabada: !tarea.acabada })
    .then(() => {
      console.log(`Tarea ${tarea.acabada ? "desmarcada" : "completada"} exitosamente`);
    })
    .catch((error) => {
      console.error("Error al completar la tarea:", error);
    });
}

function borrarTareasCompletadas() {
  const tareasCompletadas = listaRecordatorios.value.filter((tarea) => tarea.acabada);

  tareasCompletadas.forEach((tarea) => {
    deleteDoc(doc(db, "recordatorio", tarea.id))
      .then(() => {
        console.log(`Tarea "${tarea.titulo}" borrada exitosamente`);
      })
      .catch((error) => {
        console.error("Error al borrar una tarea completada:", error);
      });
  });
}

function actualizarPrioridad(indice, nuevaPrioridad) {
  const prioridadesValidas = {
    baja: 1,
    media: 2,
    alta: 3,
  };

  if (!(nuevaPrioridad in prioridadesValidas)) {
    console.error("Prioridad no válida:", nuevaPrioridad);
    return;
  }

  const tarea = listaRecordatorios.value[indice];
  const tareaRef = doc(db, "recordatorio", tarea.id);

  updateDoc(tareaRef, {
    prioridad: nuevaPrioridad,
    prioridadValor: prioridadesValidas[nuevaPrioridad],
  })
    .then(() => {
      console.log(`Prioridad actualizada a "${nuevaPrioridad}" exitosamente`);
    })
    .catch((error) => {
      console.error("Error al actualizar la prioridad:", error);
    });
}
</script>

<template>
  <Cabecera @altaRecordatorio="altaNuevaNota"></Cabecera>

  <main>
    <p>
      {{ listaRecordatorios.filter((t) => !t.acabada).length }} Pending tasks out of a total of {{ listaRecordatorios.length }}
      <button @click="borrarTareasCompletadas">Delete completed tasks</button>
    </p>

    <TransitionGroup name="list" tag="ul">
      <li v-for="(tarea, indice) in listaRecordatorios" :key="tarea.id" class="list-item">
        <Tarea
          :titulo="tarea.titulo"
          :prioridad="tarea.prioridad"
          :fechaCreacion="taskTimes[indice]"
          :acabada="tarea.acabada"
          
          @borrado="borrarTarea(tarea.id)"
          @completada="completarTarea(indice)"
          @actualizarPrioridad="(nuevaPrioridad) => actualizarPrioridad(indice, nuevaPrioridad)"
        ></Tarea>
      </li>
    </TransitionGroup>
  </main>

  <Pie></Pie>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
  color: #333;
}

main {
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

p {
  font-size: 1.1rem;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-item {
  margin-bottom: 15px;
}
</style>
