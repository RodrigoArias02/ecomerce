"use strict";
import { cantidadDeCompra } from "./carrito.js";
let containerBestSellers = document.querySelectorAll(
  ".section-div_conteinerCards"
);
let HTMLCards = "";
let elementos;
const URLL = window.location.pathname.split("/").pop().split(".").shift();

async function categoriaspPedir() {
  const scriptURL = new URL("./main.js", import.meta.url); // Obtiene la URL del script actual (main.js)
  const jsonURL = new URL("../json/categories.json", scriptURL); // Construye la URL completa del archivo JSON
  try {
    const response = await fetch(jsonURL);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
    return null;
  }
}
async function generarCategorias(item) {
  const conteinerCategories = document.querySelector("#conteinerCategories");
  let HTMLCards = "";
  if (item) {
    item.forEach(({ nombre, img }) => {
      HTMLCards += `
      <div class="section-div_categories">
        <div class="clickable-content">
          <section class="div-section_photo">
            <img src="${URLL === "productos" ? "../" : ""}img/${img}" alt="" />
          </section>
          <p>${nombre}</p>
        </div>
      </div>
      `;
    });
    conteinerCategories.innerHTML = HTMLCards;
  }
}
async function pedirElementos() {
  const scriptURL = new URL("./main.js", import.meta.url); // Obtiene la URL del script actual (main.js)
  const jsonURL = new URL("../json/elements.json", scriptURL); // Construye la URL completa del archivo JSON

  try {
    const response = await fetch(jsonURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
    return null;
  }
}
async function cargarElementos() {
  const item = await categoriaspPedir();
  await generarCategorias(item);
  const elementos = await pedirElementos();
  const datosAlmacenadoscarrito = localStorage.getItem("carrito");

  if (datosAlmacenadoscarrito != "" && datosAlmacenadoscarrito != null) {
    const miObjetoRecuperado = JSON.parse(datosAlmacenadoscarrito);
    cantidadDeCompra(miObjetoRecuperado);
  }
  if (URLL == "productos") {
    const datosAlmacenados = localStorage.getItem("elementos");

    const contenedorCardsFilter = document.querySelector(
      ".conteiner-cards-filter"
    );
    let HTMLCards = "";

    if (datosAlmacenados) {
      try {
        const datosArray = JSON.parse(datosAlmacenados);
        let descuento = 0;
        datosArray.forEach(({ id, nombre, precio, URLImg, oferta }) => {
          let mostrar =
            precio >= 8000
              ? `            
              <span class="send">
                <p>Envio Gratis</p>
                <i class="bx bxs-plane-take-off"></i>
                <p>FULL</p>
            </span>`
              : "";
          let escribirOferta =
            oferta.porcentaje > 0 ? oferta.porcentaje + "% OFF" : "";
          HTMLCards += `
            <section class="section-card">
            <div class="section-div_like">
                <i class="bx bxs-heart"></i>
            </div>
            <div class="card-containerImg">
              <img src="../img/${URLImg}" alt="" />
            </div>
            <article class="card-containerText">
                <p class="nombreProducto">${nombre}</p>
                <span class="precioDescuento">
                <p>
                  $${(descuento =
                    oferta.estado === true
                      ? precio - (precio * oferta.porcentaje) / 100
                      : precio)}
                </p>
                <p>${escribirOferta}</p>
                </span>
                <p class="precioAnterior">${(precio =
                  oferta.estado === true ? "$" + precio : "")}</p>
                </span>
                ${mostrar}
            </article>
            <section class="card-containerButtons">
              <form class="formulario">
                <button type="button" class="btnComprar">Comprar</button>
                <button type="submit"><i class="bx bx-plus"></i></button>
                <input type="text" value="${id}" name="" id="" hidden>
              </form>
            </section>
        </section>
              `;
        });
        contenedorCardsFilter.innerHTML = HTMLCards;
        return datosArray;
      } catch (error) {
        console.error("Error al deserializar los datos:", error);
      }
    } else {
      console.log("No se encontraron similitudes.");
    }
  } else {
    if (elementos) {
      let descuento = 0;

      elementos.forEach(({ id, nombre, precio, URLImg, oferta }) => {
        let mostrar =
          precio >= 8000
            ? `            
            <span class="send">
              <p>Envio Gratis</p>
              <i class="bx bxs-plane-take-off"></i>
              <p>FULL</p>
          </span>`
            : "";
        let escribirOferta =
          oferta.porcentaje > 0 ? oferta.porcentaje + "% OFF" : "";
        HTMLCards += `
      <section class="section-card">
          <div class="section-div_like">
              <i class="bx bxs-heart"></i>
          </div>
          <div class="card-containerImg">
              <img src="img/${URLImg}" alt="" />
          </div>
          <article class="card-containerText">
              <p class="nombreProducto">${nombre}</p>
              <span class="precioDescuento">
              <p>
                $${(descuento =
                  oferta.estado === true
                    ? precio - (precio * oferta.porcentaje) / 100
                    : precio)}
              </p>
              <p>${escribirOferta}</p>
              </span>
              <p class="precioAnterior">${(precio =
                oferta.estado === true ? "$" + precio : "")}</p>
              </span>
              ${mostrar}
          </article>
          <section class="card-containerButtons">
            <form class="formulario">
              <button type="button" class="btnComprar">Comprar</button>
              <button type="submit"><i class="bx bx-plus"></i></button>
              <input type="text" value="${id}" name="" id="" hidden>
            </form>
          </section>
      </section>
      `;
      });
      containerBestSellers[0].innerHTML = HTMLCards;
      containerBestSellers[1].innerHTML = HTMLCards;

      return elementos;
    }
  }
}
export { cargarElementos, pedirElementos, categoriaspPedir, generarCategorias };
