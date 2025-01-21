<script setup>
    import  { useRouter } from 'vue-router';
    import { getCurrentUser } from 'vuefire';
    import login from './components/login.vue';
    const router = useRouter();

    router.beforeEach(async(to, from) => {
      if (to.meta.requiresAuth){
        const user=await getCurrentUser();
        if (!user){
          return false;
        }else{
          return true;

        }
      }else{
        return true;
      }
  
  
})

</script>

<template>
  <nav>
    <ul>
    <li><RouterLink to="/">inicio</RouterLink></li>
    <li><RouterLink to="/recordatorio">ir a recordatorio</RouterLink></li>
    <li class="usuario"><RouterLink to="/logeoCompleto">Usuario</RouterLink></li>
    
  </ul>
  </nav>
    <RouterView></RouterView>
</template>

<style scoped>
nav {
  background-color: #3a5c9a85;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1.5rem;
}

li {
  display: inline;
}
.usuario{
  padding-left: 1200px;
}
a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s;
}

a:hover {
  color: #c2fbd7;
}

login {
  margin-left: auto;
}

@media (max-width: 600px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  ul {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  login {
    margin-left: 0;
    width: 100%;
    text-align: center;
  }
}
</style>