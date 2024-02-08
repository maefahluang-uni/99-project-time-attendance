<template>
    <div class="white-background">
      <div class="buttons">
        <button :class="{ 'active-holidays': showHolidaysTable }" @click="showHolidays">History</button>
      </div>
      <table v-if="showHolidaysTable" class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Detail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, index) in holidays" :key="index">
            <td>{{ history.date }}</td>
            <td>{{ history.time }}</td>
            <td>{{ history.detail }}</td>
            <td v-if="history.detail === 'check in'">
              <button @click="showDetail(history)">Detail</button>
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
      <div v-if="selectedDetail" class="popup">
        <div class="popup-content">
          <span class="close" @click="selectedDetail = null">&times;</span>
          <p>Date: {{ selectedDetail.date }}</p>
          <p>Time: {{ selectedDetail.time }}</p>
          <p>Detail: {{ selectedDetail.detail }}</p>
          <p>Workplace: {{ selectedDetail.workplace }}</p>
          <img :src="selectedDetail.image" alt="Your Image">
          <p>Note: {{ selectedDetail.note }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showHolidaysTable = ref(true);
  const selectedDetail = ref(null);
  
  const holidays = [
    { 
      date: '2024-02-14', 
      time: '11:00', 
      detail: 'check in', 
      workplace: 'Your Workplace', 
      image: 'path/to/your/image.jpg', 
      note: 'Additional Note' 
    },
    { 
      date: '2024-02-14', 
      time: '18:00', 
      detail: 'check out', 
      workplace: '', 
      image: '', 
      note: '' 
    },
  ];
  
  function showHolidays() {
    showHolidaysTable.value = true;
  }
  
  function showDetail(history) {
    selectedDetail.value = history;
  }
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
  
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: #fefefe;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  