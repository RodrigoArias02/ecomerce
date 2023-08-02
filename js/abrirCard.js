"use strict";
import { cargarElementos } from "./generatorCards.js";

async function createCompraHTML(objetoEncontrado) {
  if (!objetoEncontrado) {
    console.log("No se encontró ningún objeto con el id:", idobject);
    return;
  }

  const { URLImg, nombre, precio } = objetoEncontrado;

  const HTMLCompra = `
          <section class="object-img">
            <article class="body-img">
              <img src="img/${URLImg}" alt="" />
            </article>
          </section>
          <section class="body-object">
            <article class="body-article">
              <p>Categoria</p>
              <p class="title">${nombre}</p>
              <span>
                <p>$${precio}</p>
                <p>$${precio}</p>
              </span>
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
                    <img src="img/h610m.webp" alt="" />
                  </article>
                  <article class="article-relacionados_text">
                    <p>Fuente</p>
                    <p>$200</p>
                  </article>
                </div>
                <div class="card-relacionados">
                  <article class="article-img">
                    <img src="img/h610m.webp" alt="" />
                  </article>
                  <article class="article-relacionados_text">
                    <p>Fuente</p>
                    <p>$200</p>
                  </article>
                </div>
              </section>
            </article>
          </section>`;

  const conteinerCards = document.getElementById("conteinerCardsFav");
  modal.classList.add("show");
  body.classList.add("over");
  conteinerCards.innerHTML = HTMLCompra;

  console.log(objetoEncontrado);
}

async function botonMirar() {
  const txt = `        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, dignissimos. Dolore quos praesentium, hic, modi tempora explicabo temporibus eum quia mollitia minima fugiat, deserunt commodi doloribus. Nisi culpa aliquid esse.
  `;
  const items = await cargarElementos();
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
      footer.classList.add("Dnone");
      footer.classList.remove("Dflex");
      headerFooterVer.classList.add("header-show");
      headerFooterVer.classList.remove("delay");

      const formulario = btn.closest(".formulario");
      const idobject = formulario.querySelector("input").value;
      console.log("Producto ID:", idobject);

      const objetoEncontrado = items.find((objeto) => objeto.id == idobject);
      createCompraHTML(objetoEncontrado);
      const descripcion = document.getElementById("descripcion");
      const especificaciones = document.getElementById("especificaciones");
      const contenedor = document.getElementById("contenedor-descripcion");

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
export { botonMirar };
