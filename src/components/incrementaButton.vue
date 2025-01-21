<script setup>
    import { ref } from 'vue';
    const props = defineProps(['valorInicial']);
    var count = ref(props.valorInicial);
    var listanombre = ref([]);


    function incrementarVariable(){
      count.value++;
      listanombre.value.push("jose");

    }
</script>

<template>
    <button @click="incrementarVariable()">incrementa</button>
    {{ count }}

    <ol>
 <li v-for="nombre in listanombre">{{ nombre }}</li>
    </ol>
</template>

<style scoped>
</style>