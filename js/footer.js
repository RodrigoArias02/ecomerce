// "use strict";
import { modalFavorite } from "./modales.js";
let home = document.getElementById("home");
let fav = document.getElementById("favorite");
let modal = document.getElementById("modal");
let cerrar = document.getElementById("close");
let body = document.getElementById("body");

let conteinerCards = document.getElementById("conteinerCardsFav");
home.addEventListener("click", () => {
  window.location.href = "index.html";
});

fav.addEventListener("click", () => {
  modal.classList.add("show");
  body.classList.add("over");
  conteinerCards.innerHTML = modalFavorite;
});

cerrar.addEventListener("click", () => {
  modal.classList.remove("show");
  body.classList.remove("over");
});
