<template>
    <h1>Tasfj;aoljsfho</h1>
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
    height: 300px;
    background-color: whitesmoke;
    color: red;
  }
  </style>
  