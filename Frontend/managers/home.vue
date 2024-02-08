<template>
  <p>Hello {{ role }} page</p>
  <button @click="gotest">Test Page</button>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const role = ref("Manager");
const gotest = () => {
   router.push( "/manager/test" );
}
</script>

<style scoped>
button {
  width: 70px;
  height: auto;
  background-color: aquamarine;
  color: red;
}
</style>
