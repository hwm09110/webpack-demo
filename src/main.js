import { sleep } from "./utils/index";
import "./assets/css/base.css";
import Vue from "vue";

// const img = require("./assets/img/timg.jpg");
// console.log("img2222", img);

sleep();

window.addEventListener("DOMContentLoaded", () => {
  var vm = new Vue({
    el: "#app",
    delimiters: ["${", "}"],
    data: {
      basicInfo: {
        localDir: "",
        gdDir: "",
        hnDir: "",
        syncHeNan: false,
      },
      copyfile: ``,
      copyLog: "log",
      appConfig: null,
    },
    mounted() {
      console.log("mounted");
    },
  });
});
