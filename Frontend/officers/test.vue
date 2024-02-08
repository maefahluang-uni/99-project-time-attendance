<template>
  <p>Test {{ role }} page</p>
  <button @click="back">Go Back</button>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const back = () => {
  router.go(-1)
}
const role = ref("Officer");
</script>

<style>
p{
  color: #000;
}
</style>
