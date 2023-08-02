import { cargarElementos } from "./generatorCards.js";

let cart = [];
let compra, elements, contador, modalCart;
let it = 0;
let texto = "";
let carri = document.getElementById("cart");
let conteinerCards = document.getElementById("conteinerCardsFav");
let footer = document.getElementById("foterHome");
let modal = document.getElementById("modal");
let cerrar = document.getElementById("close");
let footerCart = document.getElementById("event");
let sectionP = document.getElementById("p-totales");
let cartClean;

function total(cartClean) {
  let acum = 0;
  let sumEnvioPorCantidad = 0;
  let sumPrecioCantidad = 0;
  const sumaPrecios = cartClean.reduce((acumulador, objeto) => {
    return acumulador + objeto.precio * objeto.cantidad;
  }, 0);
  cartClean.forEach((element) => {
    sumPrecioCantidad = element.cantidad * element.precio;
    if (sumPrecioCantidad < 8000) {
      acum = acum + 1500;
    } else if (sumPrecioCantidad > 8000) {
      acum = acum + 0;
    }
  });
  return { precioTotal: sumaPrecios, envioTotal: acum };
}

function renderCart(cartClean) {
  const totales = total(cartClean);
  console.log("entraste a render");
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

  let estilofoterGratis = isNaN(evaluarEnvio) ? "color: green" : "color: black";
  const HTMLFooterCart = `
        <p>$${totales.precioTotal}</p>
        <p style="${estilofoterGratis}">${
    evaluarEnvio >= 0 ? "$" : ""
  }${evaluarEnvio}</p>
        <p class="bold">$${totales.precioTotal + totales.envioTotal}</p>
      `;
  sectionP.innerHTML = HTMLFooterCart;

  cartClean.forEach(({ id, nombre, URLImg, cantidad, precio }) => {
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

function verRepetidos(objeto) {
  let cartCleanFunction = [];

  objeto.forEach((element) => {
    const index = cartCleanFunction.findIndex(
      (buscar) => buscar.id === element.id
    );

    if (index === -1) {
      // Si el objeto no está en el carrito limpio, lo agregamos con cantidad 1
      cartCleanFunction.push({ ...element, cantidad: 1 });
    } else {
      // Si el objeto ya está en el carrito limpio, incrementamos su cantidad
      cartCleanFunction[index].cantidad += 1;
    }
  });
  return cartCleanFunction;
}

async function mandarAlCarrito(items) {
  const search = (id) => items.find((objeto) => objeto.id === parseInt(id));
  let myForms = document.querySelectorAll(".formulario");
  myForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      it++;
      let formulario = e.target;
      let idobjet = 0;
      idobjet = formulario.children[2].value;
      //   contador = cantidadDeCompra(it);
      if (idobjet != undefined) {
        compra = search(idobjet);

        texto = compra.nombre.substring(0, 25) + "...";
        Toastify({
          text: texto,
          duration: 3000,
          className: "my-toasty",
        }).showToast();
        cart.push(compra);
      }
    });
  });
  return cart;
}

async function cargarCodigoCarrito(items) {
  cart = await mandarAlCarrito(items);
  console.log("items cuando recuen se cargan");
  console.log(items);
  carri.addEventListener("click", () => {
    const p = document.getElementById("p-seccion");
    cartClean = verRepetidos(cart);
    p.innerHTML = "Carrito";

    modal.classList.add("show");
    body.classList.add("over");
    footerCart.classList.add("Dflex");
    footer.classList.add("Dnone");
    footer.classList.remove("Dflex");

    let modalCart = renderCart(cartClean);
    conteinerCards.innerHTML = modalCart;
  });
  //cuando eliminas un elemento
  conteinerCards.addEventListener("click", function (event) {
    cartClean = verRepetidos(cart);
    if (event.target.classList.contains("myButton")) {
      event.preventDefault();

      console.log("cart>");
      console.log(cart);
      let input = event.target
        .closest(".conteiner-text-cart")
        .querySelector("input");

      let id = input.value;
      let indice = cartClean.findIndex((objeto) => objeto.id == id);

      if (indice != -1) {
        let objetoEliminar = cartClean.find((objeto) => objeto.id == id);
        let cantidadObjetoEliminar = objetoEliminar.cantidad;
        console.log("cantidad: " + cantidadObjetoEliminar);
        console.log("objeto Eliminar");
        console.log(objetoEliminar);
        if (cantidadObjetoEliminar == 1) {
          cartClean.splice(indice, 1);
          console.log("borramos");
        } else if (objetoEliminar.cantidad > 1) {
          console.log("indice " + indice);
          if (indice > -1) {
            // Modificamos el valor de la clave 'valor' en el objeto correspondiente.
            cartClean[indice].cantidad -= 1;
          }
        }
        let objetoEliminarCart = cart.findIndex((objeto) => objeto.id == id);
        //   contador = cantidadDeCompra(it);

        cart.splice(objetoEliminarCart, 1);
      }
      modalCart = renderCart(cartClean);
      conteinerCards.innerHTML = modalCart;
    }
  });
  console.log("items cuando estan por retornar--->");
  console.log(items);
  return items;
}
export { cargarCodigoCarrito };
