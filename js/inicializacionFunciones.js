import { cargarElementos } from "./generatorCards.js";
import { cargarCodigoCarrito } from "./carrito.js";
import { botonMirar } from "./abrirCard.js";
async function iniciar() {
  let items = await cargarElementos();
  await botonMirar();

  await cargarCodigoCarrito(items);
}
iniciar();
