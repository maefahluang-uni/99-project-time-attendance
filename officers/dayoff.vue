<template>
  <div class="white-background">
    <div class="buttons">
      <button :class="{ 'active-holidays': showHolidaysTable }" @click="showHolidays">Show Holidays</button>
      <button :class="{ 'active-day-offs': showDayOffsTable }" @click="showDayOffs">Show Day Offs</button>
    </div>
    <table v-if="showHolidaysTable" class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Holiday Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(holiday, index) in holidays" :key="index">
          <td>{{ holiday.date }}</td>
          <td>{{ holiday.name }}</td>
        </tr>
      </tbody>
    </table>

    <table v-if="showDayOffsTable" class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Day Off Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dayOff, index) in dayOffs" :key="index">
          <td>{{ dayOff.date }}</td>
          <td>{{ dayOff.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showHolidaysTable = ref(true);
const showDayOffsTable = ref(false);

const holidays = [
  // Your holiday data here
  { date: '2024-02-14', name: 'Valentine\'s Day' },
  // Add more holiday data as needed
];

const dayOffs = [
  // Your day off data here
  { date: '2024-02-21', name: 'Presidents\' Day' },
  // Add more day off data as needed
];

const showHolidays = () => {
  showHolidaysTable.value = true;
  showDayOffsTable.value = false;
};

const showDayOffs = () => {
  showHolidaysTable.value = false;
  showDayOffsTable.value = true;
};
</script>

<style scoped>
.white-background {
  width: 100%;
    height: 85%;
    border-radius: 40px 40px 0px 0px;
    background: #FFF;
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
}

.buttons {
  width: 100%;
  height: 100px; /* Set height of the bottom bar */
  display: flex;
  border-radius: 40px 40px 0px 0px;
  justify-content: center;
  align-items: center;
  background-color: #fff; /* Set background color */
}

.buttons button {
  padding: 10px 20px;
  width: 40%;
  height: 40%;
  border: none;
  color: #fff;
  cursor: pointer;
}

/* DataTable styling */
.data-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: black; /* Set font color to black */
}

.data-table th {
  background-color: #f2f2f2;
}

.active-holidays {
  background-color: blue;
  color: white;
}

.active-day-offs {
  background-color: green;
  color: white;
}
</style>