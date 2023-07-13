let footer = document.getElementById("foterHome");
let carri = document.getElementById("cart");
let conteinerCards = document.getElementById("conteinerCardsFav");
let modal = document.getElementById("modal");
let cerrar = document.getElementById("close");
let footerCart = document.getElementById("event");
let sectionP = document.getElementById("p-totales");

carri.addEventListener("click", () => {
  let objetoString = localStorage.getItem("Carrito");
  let objeto = JSON.parse(objetoString);
  let cartClean = verRepetidos();
  const totales = total();
  modal.classList.add("show");
  body.classList.add("over");
  footerCart.style.display = "flex";
  footer.style.display = "none";
  let modalCart = renderCart();
  conteinerCards.innerHTML = modalCart;

  function verRepetidos() {
    let cartClean = [];
    objeto.forEach((element) => {
      const index = cartClean.findIndex((item) => item.id === element.id);
      if (index === -1) {
        cartClean.push(element);
      } else {
        cartClean[index].cantidad = (cartClean[index].cantidad || 1) + 1;
      }
    });

    return cartClean;
  }

  function renderCart() {
    const totales = total();
    let HTMLCart = "";
    let envio = 8000;
    let pesos = "$";
    let suma = 0;
    let evaluarEnvio = totales.envioTotal;
    if (evaluarEnvio == 0 && totales.precioTotal !== 0) {
      evaluarEnvio = "Gratis";
    } else if (evaluarEnvio == 0 && totales.precioTotal == 0) {
      evaluarEnvio = 0;
    } else {
      evaluarEnvio = totales.envioTotal;
    }

    let estilofoterGratis = isNaN(evaluarEnvio)
      ? "color: green"
      : "color: black";
    const HTMLFooterCart = `
      <p>$${totales.precioTotal}</p>
      <p style="${estilofoterGratis}">${
      evaluarEnvio >= 0 ? "$" : ""
    }${evaluarEnvio}</p>
      <p class="bold">$${totales.precioTotal + totales.envioTotal}</p>
    `;
    sectionP.innerHTML = HTMLFooterCart;

    cartClean.forEach((element) => {
      let { id, nombre, URLImg, cantidad, precio } = element;
      let objetoJSON = JSON.stringify(element);
      suma = precio * cantidad;
      suma > 8000 ? (envio = "Gratis") : (envio = 1500);
      let estilo = isNaN(envio) ? "color: green" : "color: black";
      HTMLCart += `
      <article class="card-cart">
      <section class="cart-top">
        <p>Vendedor</p>
      </section>
      <section class="cart-mid">
        <div class="conteiner-img-cart">
          <img src="img/${URLImg}" alt="" />
        </div>
        <div class="conteiner-text-cart">
          <p>${nombre}</p>
            <input type="text" hidden value="${id}">
            <button class="myButton">Eliminar</button>
          <section class="cart-text-price">
            <select name="" id="">
              <option value="">${cantidad} u.</option>
            </select>
            <p>$${suma}</p>
          </section>
        </div>
      </section>
      <section class="card-bot">
        <p>Envío</p>
        <p id="envioP" style="${estilo}"> ${envio > 0 ? "$" : ""}${envio} </p>
      </section>
      <section class="cart-line">
        <div class="line"></div>
      </section>
      </article>`;
    });
    return HTMLCart;
  }
  conteinerCards.addEventListener("click", function (event) {
    if (event.target.classList.contains("myButton")) {
      event.preventDefault();
      let input = event.target
        .closest(".conteiner-text-cart")
        .querySelector("input");

      let id = input.value;
      let indice = cartClean.findIndex((objeto) => objeto.id == id);
      let objetoEliminar = cart.find((objeto) => objeto.id == id);
      cartClean.splice(indice, 1);
      let c = 0;
      for (let i = cart.length - 1; i >= 0; i--) {
        if (cart[i] === objetoEliminar) {
          it--;
          contador = cantidadDeCompra(it);
          cart.splice(i, 1);
        }
      }

      let cartCleanString = JSON.stringify(cartClean);
      localStorage.setItem("Carrito", cartCleanString);
      modalCart = renderCart();
      conteinerCards.innerHTML = modalCart;
    }
  });

  function total() {
    let acum = 0;
    const sumaPrecios = cartClean.reduce((acumulador, objeto) => {
      return acumulador + objeto.precio * objeto.cantidad;
    }, 0);
    cartClean.forEach((element) => {
      element.precio < 8000 ? (acum = acum + 1500) : (acum = acum + 0);
    });
    return { precioTotal: sumaPrecios, envioTotal: acum };
  }
});
const search = (id) => bestSellers.find((objeto) => objeto.id === parseInt(id));
function cantidadDeCompra(it) {
  let span = document.getElementById("span-cant");
  return it > 0
    ? ((span.innerText = it), (span.style.display = "block"))
    : (span.style.display = "none");
}
let myForms = document.querySelectorAll(".formulario");
let cart = [];
let compra, elements;
let it = 0;
let texto = "";
myForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    it++;
    let formulario = e.target;
    let idobjet = 0;
    idobjet = formulario.children[2].value;

    contador = cantidadDeCompra(it);
    if (idobjet != undefined) {
      compra = search(idobjet);
      texto = compra.nombre.substring(0, 25) + "...";

      Toastify({
        text: texto,
        duration: 3000,
        className: "my-toasty",
      }).showToast();
      cart.push(compra);
      let transformJson = JSON.stringify(cart);
      localStorage.setItem("Carrito", transformJson);
    }
  });
});
