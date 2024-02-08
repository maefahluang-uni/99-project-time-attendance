<template>
  
  <div class="contttt">
  <div class="card flex justify-content-center">
        <Calendar v-model="date" dateFormat="dd/mm/yy" />
    </div></div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const date = ref();
const role = ref("Admin");
const gotest = () => {
   router.push( "/admin/test" );
}
</script>

<style scoped>
button {
  width: 70px;
  height: auto;
  background-color: aquamarine;
  color: red;
}
.contttt{
  width: 100%;
  position: relative;
  background-color: aqua;
}
</style>
