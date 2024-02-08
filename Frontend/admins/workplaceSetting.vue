<template>
    <p>Hello {{ role }} page</p>
    <span>อาจจะลบ + รวมกับworktime sum</span>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const role = ref("Workplace setting");
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