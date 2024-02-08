<template>
  <div>
    <div class="topContainer">
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
    <div class="tab-buttons">
      <button
        @click="setTab('name')"
        :class="{ active: currentTab === 'name' }"
      >
        Officer name lists
      </button>
      <button
        @click="setTab('register')"
        :class="{ active: currentTab === 'register' }"
      >
        Pending register
      </button>
    </div>

    <div v-if="currentTab === 'name'">
      <nameTable />
    </div>

    <div v-else-if="currentTab === 'register'">
      <registerTable />
    </div>
    <div class="addOfficerForm" v-if="openForm === true">
      <span @click="closeAddOff">close</span>
      <addOffForm @close="closeForm" />
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onUnmounted } from 'vue';
import nameTable from "../../components/adminComp/officerName.vue";
import registerTable from "../../components/adminComp/register.vue";
const props = defineProps(['defaultTab']);

let currentTab = ref(props.defaultTab || 'name');
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
  const isOutsideSearchBox = !event.target.closest('.searchBoxContainer');

  if (isOutsideSearchBox) {
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
.addOfficer {
  margin-top: 20px;
  width: 146px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 40px;
  border: 1px solid #1780c1;

  display: grid;
  place-items: center;
  color: #1780c1;

  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.addOfficer:hover {
  cursor: pointer;
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
