import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// 1. Import Toast dan CSS-nya
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

app.use(router);

// 2. Gunakan Toast dengan pengaturan default
app.use(Vue3Toastify, {
  autoClose: 1500,
  position: "bottom-right",
});

app.mount("#app");
