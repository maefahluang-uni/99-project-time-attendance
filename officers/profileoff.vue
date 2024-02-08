<template>
    <div class="blue-card">
      <div class="profile">
        <img class="avatar" src="https://cdn-icons-png.flaticon.com/512/2919/2919906.png  " alt="Profile Avatar">
        <span class="name">Name Surname</span>
      </div>
    </div>

    
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: []
      };
    },
  };
  </script>
  
  <style>
  .blue-card {
    background-color: #1780C1;
    color: white;
    height: 17%;
    width: 100%;
    margin-bottom: auto;
    border-radius: 0px 0px 12px 12px;
  }
  
  .profile {
    display: flex;
    align-items: center;
    padding: 25px;
    margin-top: 10%;
  }
  
  .avatar {
    width: 25%;
    height: 25%;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .name {
    font-size: 1.2rem;
  }


  </style>
  