<script setup>
import { GithubAuthProvider,GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from 'firebase/auth';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const auth = useFirebaseAuth();
const user = useCurrentUser();
const email = ref('');
const password = ref('');
const error = ref(null);

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();


const router = useRouter();

function iniciarSesionConGoogle() {
  error.value = null;
  signInWithPopup(auth, googleAuthProvider)
    .then(() => {
      router.push("/recordatorio");
      console.log('Sesión iniciada con Google');
    })
    .catch((reason) => {
      console.error('Error al iniciar sesión con Google:', reason);
      error.value = reason.message;
    });
}
function iniciarSesionConGithub() {
  error.value = null;
  signInWithPopup(auth, githubAuthProvider)
    .then(() => {
      router.push("/recordatorio");
      console.log('Sesión iniciada con GitHub');
    })
  }

function iniciarSesionConCorreo() {
  error.value = null;
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push("/recordatorio");
      console.log('Sesión iniciada con correo y contraseña');
    })
    .catch((e) => {
      error.value = e.message;
    });
}

function registrarConCorreo() {
  error.value = null;
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push("/recordatorio");
      console.log('Usuario registrado e inició sesión');
    })
    .catch((e) => {
      error.value = e.message;
    });
}

function cerrarSesion() {
  signOut(auth)
    .then(() => {
      router.push("/");
      console.log('Sesión cerrada');
    })
    .catch((e) => {
      console.error('Error al cerrar sesión:', e);
    });
}
</script>

<template>
  <div class="container">
    <div v-if="user" class="user-info">
      <p>Hi, {{ user.displayName || user.email }}</p>
      <button @click="cerrarSesion" class="btn btn-danger">Close Sesión</button>
    </div>
    <div v-else class="auth-form">
      <div class="form-group">
        <h3>User</h3>
        <input v-model="email" type="email" placeholder="Gmail" class="form-control" />
        <input v-model="password" type="password" placeholder="Password" class="form-control" />
        <button @click="iniciarSesionConCorreo" class="btn btn-primary">Login</button>
        <button @click="registrarConCorreo" class="btn btn-secondary">Register</button>
      </div>
      <div class="google-signin">
        <button @click="iniciarSesionConGoogle" class="btn btn-apps">
          <i class="fab fa-google"></i>  Google
        </button>
          <button @click="iniciarSesionConGithub" class="btn btn-apps">
          <i class="fab fa-google"></i>  GitHub
        </button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.user-info {
  text-align: center;
  margin-bottom: 20px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-control {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-apps {
  background-color: #4285F4;
  color: white;
  margin: 10px;
}

.btn:hover {
  opacity: 0.9;
}

.google-signin {
  text-align: center;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 10px;
}
</style>

