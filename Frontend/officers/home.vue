<template>
  <div>
    <!-- Your main content goes here -->
    <div class="white-background">
      <!-- Container for four cards -->
      <br>
      <div class="cards-container">
        <div class="card card1">Card 1</div>
        <div class="card card2">Card 2</div>
        <div class="card card3">Card 3</div>
        <div class="card card4">Card 4</div>
      </div>
    </div>

    <div class="blue-card">
      <div class="donutChart">
        <!-- Bind the canvas using ref -->
        <canvas ref="donutChartCanvas"></canvas>
        <div class="chart-center-text">Total work time</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const role = ref("Officer");
    const donutChartCanvas = ref(null);

    const gotest = () => {
      router.push("/officer/test");
    };

    onMounted(() => {
      createDonutChart();
    });

    const createDonutChart = () => {
      const ctx = donutChartCanvas.value.getContext("2d");

      new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [25, 25, 25, 25], // Adjust these values as needed
              backgroundColor: ["#FF5733", "#33FF5E", "#335EFF", "#FF33D1"],
            },
          ],
        },
        options: {
          cutout: "70%", // Adjust the cutout size as needed
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    };

    return { donutChartCanvas, gotest };
  },
};
</script>

<style scoped>
/* Existing styles */

/* New styles for mobile responsiveness */
@media (max-width: 768px) {
  .white-background {
    height: auto;
    padding-bottom: 20px; /* Add some padding at the bottom for better spacing */
  }

  .cards-container {
    margin-top: 10%;
  }

  .blue-card {
    top: 20%;
  }

  .donutChart {
    width: 100%;
    height: 100%;
  }

  .chart-center-text {
    font-size: 16px;
  }
}

@media (max-width: 400px) {
  .cards-container {
    margin-top: 20%;
  }

  .chart-center-text {
    font-size: 14px;
  }
}
</style>

  

<style scoped>
button {
    width: 70px;
    height: auto;
    background-color: aquamarine;
    color: red;
}

.white-background {
    width: 100%;
    height: 70%;
    border-radius: 40px 40px 0px 0px;
    background: #FFF;
    position: absolute;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
}

.blue-card {
    width: 90%;
    height: 40%;
    flex-shrink: 0;
    border-radius: 40px;
    background: #1780C1;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    z-index: 2;
    /* Ensure blue-card is above white-background */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.cards-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 14%;
    z-index: 2;
}

.card {
    width: 85%;
    height: 70px;
    flex-shrink: 0;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3%;
    /* Adjust the margin between cards as needed */
}

.card1 {
    background: #FF5733;
    /* Adjust the color as needed */
}

.card2 {
    background: #33FF5E;
}

.card3 {
    background: #335EFF;
}

.card4 {
    background: #FF33D1;
}

.blue-card {
    width: 90%;
    height: 40%;
    flex-shrink: 0;
    border-radius: 40px;
    background: #1780C1;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.donutChart {
    width: 80%;
    height: 80%;
}

.chart-center-text {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

@media (max-width: 500px) {
    .card {
        width: 85%;
        height: 50px;
    }

    .cards-container {
        margin-top: 43%;
    }
}
@media (max-width: 768px) {
 
  .cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    
  }

  .card {
    height: 70%;
    margin-bottom: 3%;
  }

  .blue-card {
    margin-top: 20px;
  }


  .chart-center-text {
    font-size: 16px;
  }
}

@media (max-width: 412px),(max-height: 750px) {
  .card {
    height: 50px;
  }

  .chart-center-text {
    font-size: 14px;
  }
}
@media (max-width: 414px),(max-height: 900px) {
  .card {
    height: 50px;
  }

  .chart-center-text {
    font-size: 14px;
  }
  .cards-container{
    margin-top: 45%;
  }
}


</style>
