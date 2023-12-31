// import {  } from "./generatorCards.js";
// Función para buscar elementos por categoría
// function obtenerUrlBase() {
//   // Verificar si estamos en un entorno local o en línea
//   if (
//     window.location.hostname === "localhost" ||
//     window.location.hostname === "127.0.0.1"
//   ) {
//     // Estamos en un servidor local, utiliza la URL local
//     return "http://127.0.0.1:5500";
//   } else {
//     // Estamos en línea, utiliza la URL en línea
//     return "https://github.com/RodrigoArias02/ecomerce";
//   }
// }

function realizarPeticion() {
  let categoria = document.getElementById("categoriaInput").value;

  // Verificar que la categoría no esté vacía
  if (categoria.trim() === "" || !isNaN(categoria)) {
    alert("La busqueda solo acepta texto.");
    return;
  } else {
    return categoria;
  }
  // deberia crear servidor donde debes manejar la solicitud para obtener los elementos filtrados por categoría.
  //   const urlBase = obtenerUrlBase();
  //   const url = `${urlBase}/json/elements?categoria=${encodeURIComponent(
  //     categoria
  //   )}`;
}

async function buscarPorCategoria(categoria) {
  const scriptURL = new URL("./main.js", import.meta.url); // Obtiene la URL del script actual (main.js)
  const jsonURL = new URL("../json/elements.json", scriptURL); // Construye la URL completa del archivo JSON

  try {
    const response = await fetch(jsonURL);
    const data = await response.json();
    categoria = categoria.toLowerCase();
    const elementosEncontrados = data.filter(
      (elemento) => elemento.categoria == categoria
    );
    const cadenaJSON = JSON.stringify(elementosEncontrados);
    const URL = window.location.pathname.split("/").pop().split(".").shift();
    if (elementosEncontrados != "") {
      localStorage.setItem("elementos", cadenaJSON);
      if (URL != "productos") {
        window.location.href = "pages/productos.html";
      } else {
        window.location.href = "productos.html";
      }
    } else {
      alert("No se encontraron elementos similares");
    }
    return data;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
    return null;
  }
}

const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", () => {
  const categoriaBuscada = realizarPeticion();

  buscarPorCategoria(categoriaBuscada);
});

const conteinerCategories = document.getElementById("conteinerCategories");
conteinerCategories.addEventListener("click", (event) => {
  // Verificamos si el elemento clicado es el contenedor con clase "clickable-content"
  const clickableContent = event.target.closest(".clickable-content");
  if (clickableContent) {
    // Obtenemos el elemento <p> dentro del contenedor
    const nombreElemento = clickableContent.querySelector("p");
    const nombre = nombreElemento.textContent;
    console.log(nombre);
    buscarPorCategoria(nombre);
  }
});
