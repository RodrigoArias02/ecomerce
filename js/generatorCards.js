"use strict";

let conteinerBestSellers = document.getElementById("conteiner-best_sellers");
let HTMLCards = "";
let bestSellers = [
  {
    id: 1,
    nombre: "chaqueta marron reforzada con peluche en el interior",
    precio: 300,
    URLImg: "chaqueta.webp",
    cantidad: 1,
    oferta: {
      estado: true,
      porcentaje: 4,
    },
  },
  {
    id: 2,
    nombre: "Zapatos de salir rojos",
    precio: 700,
    URLImg: "zapatos.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 3,
    nombre: "Remera blanca de algodon",
    precio: 1000,
    URLImg: "remera.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
];
bestSellers.forEach((elemento) => {
  HTMLCards += `
    <section class="section-card">
        <div class="section-div_like">
            <i class="bx bxs-heart"></i>
        </div>
        <div class="card-containerImg">
            <img src="img/${elemento.URLImg}" alt="" />
        </div>
        <article class="card-containerText">
            <p>${elemento.nombre}</p>
            <p>$${elemento.precio}</p>
            <p>$${elemento.precio}</p>
        </article>
        <section class="card-containerButtons">
            <form id="formulario">
                <button>Comprar</button>
                <button type='submit'><i class="bx bx-plus"></i></button>
                <input type="text" value="${elemento.id}" name="" id="" hidden>
            </form>
        </section>
    </section>
    `;
});
conteinerBestSellers.innerHTML = HTMLCards;
let myForms = document.querySelectorAll("form");
let cart = [];
let compra, elements;

myForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formulario = e.target;
    let idobjet = 0;
    idobjet = formulario.children[2].value;
    if (idobjet != undefined) {
      compra = search(idobjet);
      cart.push(compra);
      console.log(cart);
      let transformJson = JSON.stringify(cart);
      localStorage.setItem("Carrito", transformJson);
    }
  });
});

const search = (id) => bestSellers.find((objeto) => objeto.id === parseInt(id));
