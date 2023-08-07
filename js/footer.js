// "use strict";
import { modalFavorite } from "./modales.js";
let footer = document.querySelector(".footer");
let home = document.getElementById("home");
let fav = document.getElementById("favorite");
let modal = document.getElementById("modal");
let cerrar = document.getElementById("close");
let body = document.getElementById("body");
let footers = document.querySelectorAll(".footer-div_icons");
let footerCarri = document.querySelectorAll(".footer-text");
let conteinerCards = document.getElementById("conteinerCardsFav");
let footerCart = document.getElementById("event");
const footerVer = document.getElementById("footerVer");
const headerFooterVer = document.querySelector(".section_modal_header");
const p = document.getElementById("p-seccion");
const volver = document.querySelector(".bx-chevron-left");
const URLL = window.location.pathname.split("/").pop().split(".").shift();

if (URLL === "" || URLL === "index") {
  home.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  fav.addEventListener("click", () => {
    modal.classList.add("show");
    body.classList.add("over");

    conteinerCards.innerHTML = modalFavorite;
    footer.classList.remove("Dflex");
    footer.classList.add("Dnone");
    p.innerHTML = "Favoritos";
  });
}
cerrar.addEventListener("click", () => {
  let spanCantidad = document.getElementById("span-cant");
  let cantidad = parseInt(spanCantidad.textContent);
  if (cantidad === 0) {
    spanCantidad.textContent = "";
  }
  modal.classList.remove("show");
  if (URLL === "" || URLL === "index") {
    body.classList.remove("over");

    footer.classList.toggle("Dflex");
    footer.classList.toggle("Dnone");
  }
  footerCart.classList.remove("Dflex");
  footerCart.classList.add("Dnone");
  footerVer.classList.remove("Dflex");
  headerFooterVer.classList.remove("header-show");
  headerFooterVer.classList.add("delay");
  setTimeout(() => {
    modal.classList.remove("color-modal");
  }, 1000);
});
if (URLL === "productos") {
  volver.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
}
