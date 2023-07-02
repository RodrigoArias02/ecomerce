"use strict";

let home = document.getElementById("home");
let fav = document.getElementById("favorite");
let modal = document.getElementById("modal");
let cerrar = document.getElementById("close");
home.addEventListener("click", () => {
  window.location.href = "index.html";
});

fav.addEventListener("click", () => {
  modal.classList.toggle("show");
});

cerrar.addEventListener("click", () => {
  modal.classList.remove("show");
});
