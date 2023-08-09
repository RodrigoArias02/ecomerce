"use strict";
import { cargarElementos } from "./generatorCards.js";

const URLL = window.location.pathname.split("/").pop().split(".").shift();

let items;
async function elegirCantidad() {
  let sum = document.getElementById("sum");
  let num = document.getElementById("num");
  let res = document.getElementById("res");
  let i = 0;

  sum.addEventListener("click", () => {
    if (i >= 0) {
      i++;

      num.innerText = i;
    }
  });
  res.addEventListener("click", () => {
    if (i > 0) {
      i--;
      num.innerText = i;
    }
  });
}
async function createCompraHTML(objetoEncontrado) {
  if (!objetoEncontrado) {
    console.log("No se encontró ningún objeto con el id:", idobject);
    return;
  }
  let valorDescuento = 0;
  let precioAntes;
  let valorOff;
  const { URLImg, nombre, precio, oferta, categoria } = objetoEncontrado;
  if (oferta.estado == true) {
    valorDescuento = precio - (precio * oferta.porcentaje) / 100;
    precioAntes = "$" + precio;
    valorOff = oferta.porcentaje + "% OFF";
    console.log(valorDescuento);
  } else {
    valorDescuento = precio;
    precioAntes = "";
    valorOff = "";
  }
  const HTMLCompra = `
          <section class="object-img">
            <article class="body-img">
              <img src="${
                URLL === "productos" ? "../" : ""
              }img/${URLImg}" alt="" />
            </article>
          </section>
          <section class="body-object">
            <article class="body-article">
              
              <p class="title">${nombre}</p>
              <span>
                <p>$${valorDescuento}</p>
                <p>${precioAntes}</p>
              </span>
              <p class="off">${valorOff}</p>
            </article>
            <article class="body-article_buttons">
              <p class="p" id="descripcion">Descripcion</p>
              <p class="p" id="especificaciones">Especificaciones</p>
            </article>
            <article class="body-article_description" id="contenedor-descripcion">
              <p></p>
            </article>
            <article class="body-article-relacionados">
              <p>Productos relacionados</p>
              <section class="section-relacionados_cards">
                <div class="card-relacionados">
                  <article class="article-img">
                    <img src="${
                      URLL === "productos" ? "../" : ""
                    }img/${URLImg}" alt="" />
                  </article>
                  <article class="article-relacionados_text">
                  <p>${nombre}</p>
                  <p>$${precio}</p>
                  </article>
                </div>
                <div class="card-relacionados">
                  <article class="article-img">
                    <img src="${
                      URLL === "productos" ? "../" : ""
                    }img/${URLImg}" alt="" />
                  </article>
                  <article class="article-relacionados_text">
                    <p>${nombre}</p>
                    <p>$${precio}</p>
                  </article>
                </div>
              </section>
            </article>
          </section>`;

  const conteinerCards = document.getElementById("conteinerCardsFav");
  modal.classList.add("show");
  if (URLL === "" || URLL === "index") {
    body.classList.add("over");
  }

  conteinerCards.innerHTML = HTMLCompra;
}

async function botonMirar() {
  const txt = `        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, dignissimos. Dolore quos praesentium, hic, modi tempora explicabo temporibus eum quia mollitia minima fugiat, deserunt commodi doloribus. Nisi culpa aliquid esse.
  `;

  if (URLL === "productos") {
    items = await cargarElementos();
  } else {
    items = await cargarElementos();
  }

  const btnComprar = document.querySelectorAll(".btnComprar");
  let footer = document.getElementById("foterHome");
  const footerVer = document.getElementById("footerVer");
  const headerFooterVer = document.getElementById("modal_header");
  const p = document.getElementById("p-seccion");
  let modal = document.getElementById("modal");

  btnComprar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      p.innerHTML = "";
      modal.classList.add("color-modal");
      footerVer.classList.add("Dflex");

      if (URLL === "" || URLL === "index") {
        footer.classList.add("Dnone");
        footer.classList.remove("Dflex");
      }
      headerFooterVer.classList.add("header-show");
      headerFooterVer.classList.remove("delay");

      let formulario = btn.closest(".formulario");
      let idobject = formulario.querySelector("input").value;

      let objetoEncontrado = items.find((objeto) => objeto.id == idobject);

      createCompraHTML(objetoEncontrado);

      elegirCantidad();
      let descripcion = document.getElementById("descripcion");
      let especificaciones = document.getElementById("especificaciones");
      let contenedor = document.getElementById("contenedor-descripcion");

      descripcion.addEventListener("click", () => {
        descripcion.classList.add("animacion-activada");
        especificaciones.classList.remove("animacion-activada");
        contenedor.innerHTML = txt;
      });

      especificaciones.addEventListener("click", () => {
        especificaciones.classList.add("animacion-activada");
        descripcion.classList.remove("animacion-activada");
        contenedor.innerHTML = "especificacion";
      });
    });
  });
}
// if (URLL == "productos") {
//   await botonMirar();
// }
export { botonMirar, elegirCantidad };
