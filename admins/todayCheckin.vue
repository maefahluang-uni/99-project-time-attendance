<template>
  <div>
    <div class="topContainer">
      <div ref="searchBoxContainer">
        <input class="searchBox"
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
      <div class="today" v-html="currentDateTime"></div>
    </div>
    <div class="tab-buttons">
      <button
        @click="setTab('attendance')"
        :class="{ active: currentTab === 'attendance' }"
      >
        Today’s attendance
      </button>
      <button
        @click="setTab('absence')"
        :class="{ active: currentTab === 'absence' }"
      >
        Today’s absence
      </button>
    </div>

    <div v-if="currentTab === 'attendance'">
      <attendanceTable />
    </div>

    <div v-else-if="currentTab === 'absence'">
      <absenceTable />
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue';
import attendanceTable from "../../components/adminComp/attendance.vue";
import absenceTable from "../../components/adminComp/absence.vue";
const props = defineProps(['defaultTab']);

let currentTab = ref(props.defaultTab || 'attendance');
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
  align-items: center;
  margin-bottom: 20px;
}
.searchBox {
  margin-top: 20px;
  width: 400px;
  height: 50px;
  border-radius: 60px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(71, 71, 71, 0.25);
}
.today{
  font-size: 20px;
}
.tab-buttons {
  width: 100%;
  height: 76px;
  display: flex;
  justify-content: center;
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
</style>
