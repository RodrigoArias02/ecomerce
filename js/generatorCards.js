"use strict";

let containerBestSellers = document.querySelectorAll(
  ".section-div_conteinerCards"
);

let HTMLCards = "";
let bestSellers = [
  {
    id: 1,
    nombre: "Memoria Ram Spectrum 16gb 3200mhz DIMM",
    precio: 30000,
    URLImg: "16gbspectrum.png",
    cantidad: 1,
    oferta: {
      estado: true,
      porcentaje: 4,
    },
  },
  {
    id: 2,
    nombre: "Placa madre ASUS PRIME",
    precio: 700,
    URLImg: "asusprime.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 3,
    nombre: "Placa madre GIGABYTE b360",
    precio: 1000,
    URLImg: "b360.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 4,
    nombre: "Fuente de alimentacion Corsair 600W certificacion 60 PLUS",
    precio: 5000,
    URLImg: "corsai.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 5,
    nombre: "Disco rigido 8gb",
    precio: 5000,
    URLImg: "discoduro8gb.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 6,
    nombre: "Disco externo kevingston",
    precio: 5000,
    URLImg: "discoexterno.png",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 7,
    nombre: "Fuente de alimentacion evga 600W 60 PLUS",
    precio: 15000,
    URLImg: "evga.png",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 8,
    nombre: "Gabinete Negro Gamer",
    precio: 15000,
    URLImg: "gabinete.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 9,
    nombre: "Mouse Gamer EVGA con luces rgb",
    precio: 15000,
    URLImg: "evgamouse.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 10,
    nombre: "Gabinete AEROCOOL Negro metalizado",
    precio: 15000,
    URLImg: "gabineteaerocool.webp",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 11,
    nombre: "Gabinete Blanco",
    precio: 15000,
    URLImg: "gabineteblanco.png",
    cantidad: 1,
    oferta: {
      estado: false,
      porcentaje: 0,
    },
  },
  {
    id: 12,
    nombre: "Placa Madre Gigabyte H610M",
    precio: 15000,
    URLImg: "h610m.webp",
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
containerBestSellers[0].innerHTML = HTMLCards;
containerBestSellers[1].innerHTML = HTMLCards;
