import { categoriaspPedir, generarCategorias } from "./generatorCards.js";

async function generarCards() {
  let item = await categoriaspPedir();
  await generarCategorias(item);

  const datosAlmacenados = localStorage.getItem("elementos");
  const contenedorCardsFilter = document.querySelector(
    ".conteiner-cards-filter"
  );
  let HTMLCards = "";
  if (datosAlmacenados) {
    try {
      const datosArray = JSON.parse(datosAlmacenados);
      datosArray.forEach(({ id, nombre, precio, URLImg }) => {
        HTMLCards += `
            <section class="section-card">
                <div class="section-div_like">
                    <i class="bx bxs-heart"></i>
                </div>
                <div class="card-containerImg">
                    <img src="../img/${URLImg}" alt="" />
                </div>
                <article class="card-containerText">
                    <p>${nombre}</p>
                    <p>$${precio}</p>
                    <p>$${precio}</p>
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
    } catch (error) {
      console.error("Error al deserializar los datos:", error);
    }
  } else {
    console.log(
      "No se encontraron datos almacenados con la clave especificada."
    );
  }
}
const volver = document.querySelector(".bx-chevron-left");
volver.addEventListener("click", () => {
  window.location.href = "../index.html";
});
await generarCards();
