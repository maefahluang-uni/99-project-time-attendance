<template>
  <div>
    <div class="head">
      <h1>Setting Office Location</h1>
    </div>
    <div class="map" ref="mapContainer"></div>
    <div class="menubar">
      <h3>Select radius of your office</h3>
      <input
        type="range"
        min="0"
        max="1000"
        v-model="sliderValue"
        @input="updateSliderValue"
      />
      <p>Selected radius: {{ sliderValue }} metre</p>
      <button @click="saveLocation">Save</button>
      <h1>Place : {{ placeName }}</h1>
      <h1>Lat : {{ latitude }}</h1>
      <h1>Long : {{ longitude }}</h1>
      <button @click="copyToClipboard">Copy Address</button>
      <button @click="searchInGoogleMap">Search in Google Maps</button>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const sliderValue = ref(50);
const mapContainer = ref(null);
const map = ref(null);
let circle = null;
let draggablePin = null;
const latitude = ref(0);
const longitude = ref(0);
const placeName = ref("");

const updateSliderValue = () => {
  updateCircleRadius();
};

const updateCircleRadius = () => {
  if (map.value && circle) {
    circle.setRadius(sliderValue.value);
    const circleLatLng = circle.getLatLng();
    map.value.setView(circleLatLng, map.value.getZoom());

    if (draggablePin) {
      draggablePin.setLatLng(circleLatLng);
    }
  }
};

const saveLocation = () => {
  console.log("Location saved!");
};

const trackLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentLatLng = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        circle.setLatLng(currentLatLng);
        map.value.setView(currentLatLng, map.value.getZoom());

        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;

        placeName.value = await getLocationName(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported in this browser.");
  }
};
const onMarkerDragEnd = async (event) => {
  const draggedLatLng = event.target.getLatLng();
  circle.setLatLng(draggedLatLng);
  map.value.setView(draggedLatLng, map.value.getZoom());

  latitude.value = draggedLatLng.lat;
  longitude.value = draggedLatLng.lng;

  placeName.value = await getLocationName(draggedLatLng.lat, draggedLatLng.lng);

  updateSliderValue();
};
onMounted(async () => {
  mapContainer.value = document.querySelector(".map");

  if (mapContainer.value) {
    const initialLatLng = await getCurrentLocation();
    map.value = L.map(mapContainer.value).setView(initialLatLng, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map.value);
    // todo: find crosshair for use to track current location
    circle = L.circle(initialLatLng, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: sliderValue.value,
    }).addTo(map.value);

    draggablePin = L.marker(initialLatLng, {
      icon: createPinIcon(),
      draggable: true,
    }).addTo(map.value);

    draggablePin.on("dragend", onMarkerDragEnd);

    map.value.setView(initialLatLng, map.value.getZoom());

    draggablePin.on("dragend", (event) => {
      const draggedLatLng = event.target.getLatLng();
      circle.setLatLng(draggedLatLng);
      map.value.setView(draggedLatLng, map.value.getZoom());

      latitude.value = draggedLatLng.lat;
      longitude.value = draggedLatLng.lng;

      updateSliderValue();
    });

    map.value.setView(initialLatLng, map.value.getZoom());
  }

  // Turn on If need auto track
  // setInterval(trackLocation, 5000);
});

const createPinIcon = () => {
  return new L.Icon({
    iconUrl: "../../../assets/map-pin.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;

        resolve([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getLocationName = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.display_name || "Unknown";
    
  } catch (error) {
    console.error("Error: ", error);
    return "Unknown";
  }
};

const copyToClipboard = () => {
  const address = `${latitude.value}, ${longitude.value}`;
  navigator.clipboard
    .writeText(address)
    .then(() => {
      console.log("Address: ", address);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
};
const searchInGoogleMap = () => {
  const address = `${latitude.value},${longitude.value}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;

  window.open(googleMapsUrl, "_blank");
};
</script>

<style scoped>
.head {
  text-align: center;
}

.map {
  height: 300px;
}

.menubar {
  padding: 10px;
  text-align: center;
}
</style>
