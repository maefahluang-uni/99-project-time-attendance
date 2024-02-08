<template>
    <p>Hello {{ role }} page</p>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const role = ref("Dayoff Table");
  const gotest = () => {
     router.push( "/admin" );
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