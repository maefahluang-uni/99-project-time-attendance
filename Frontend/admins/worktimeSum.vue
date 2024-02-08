<template>
  <div>
    <div v-if="tab === 'namelist'" class="topContainer">
      <div ref="searchBoxContainer">
        <input
          class="searchBox"
          v-model="searchQuery"
          type="text"
          placeholder="     Search officer name..."
          @input="handleSearch"
        />
        <ul v-if="filteredResults.length">
          <li v-for="result in filteredResults" :key="result.id">
            {{ result.name }}
          </li>
        </ul>
        <p v-if="!filteredResults.length && searchQuery.trim() !== ''">
          No results found.
        </p>
      </div>
    </div>

    <!-- <h2 v-if="tab === 'namelist'">Worktime summarize</h2> -->

    <div v-if="tab === 'namelist'">
      <officerWorktimeTable
        @officerSelected="handleOfficerViewSelected"
        @officerSetSelected="handleOfficerSettingSelected"
      />
    </div>
    <div v-else-if="tab === 'individualData'">
      <button class="backBTN" @click="back">
        <i class="fa-solid fa-backward"></i>
        go back
      </button>
      <individualWorktime :selectedViewOfficer="selectedViewOfficer" />
    </div>
    <div v-else-if="tab === 'individualTable'">
      <button class="backBTN" @click="back">
        <i class="fa-solid fa-backward"></i>
        go back
      </button>
      <individualWorkTable :selectedSetOfficer="selectedSetOfficer" />
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from "vue-router";
import officerWorktimeTable from "../../components/adminComp/officerWorktime.vue";
import individualWorktime from "../../components/adminComp/individualworktime.vue";
import individualWorkTable from "../../components/adminComp/individualWorkTable.vue";
const router = useRouter();
let tab = ref('namelist');
let selectedViewOfficer = ref(null);
let selectedSetOfficer = ref(null);

const handleOfficerViewSelected = (officer) => {
  tab.value = 'individualData';
  selectedViewOfficer.value = officer;
};
const handleOfficerSettingSelected = (officer) => {
  tab.value = 'individualTable';
  selectedSetOfficer.value = officer;
};
const currentDateTime = ref(getCurrentDateTime());
const searchData = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },

]);

const searchQuery = ref('');
const filteredResults = ref([]);
const setTab = (tab) => {
  currentTab.value = tab;
};
function getCurrentDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    // timeZoneName: 'short',
  };
  return now.toLocaleString('en-US', options);
}

const intervalId = setInterval(() => {
  currentDateTime.value = getCurrentDateTime();
}, 1000);

const handleSearch = () => {
  const query = searchQuery.value.toLowerCase();
  filteredResults.value = searchData.value.filter(
    (result) => result.name.toLowerCase().includes(query)
  );
};

const handleClickOutside = (event) => {
  if (!event.target.closest('.searchBox')) {
    searchQuery.value = '';
    filteredResults.value = [];
  }
};

  const back = () => {
    tab.value = 'namelist';
  }
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  clearInterval(intervalId);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.topContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tab-buttons {
  width: 600px;
  height: 76px;
  display: flex;
  margin-bottom: 10px;
}

.tab-buttons button {
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.tab-buttons button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}
.searchBox {
  margin-top: 20px;
  width: 400px;
  height: 50px;
  border-radius: 60px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(71, 71, 71, 0.25);
}
.backBTN {
  position: relative;
  top: 20px;
  margin-bottom: 20px;
}
</style>
