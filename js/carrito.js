let cart = [];
let compra, elements, contador, modalCart;
let texto = "";
let carri = document.getElementById("cart");
let conteinerCards = document.getElementById("conteinerCardsFav");
let footer = document.getElementById("foterHome");
let modal = document.getElementById("modal");
let cerrar = document.getElementById("close");
let footerCart = document.getElementById("event");
let sectionP = document.getElementById("p-totales");
let spanCantidad = document.getElementById("span-cant");
let cartClean = [];
let acumCantidad = 0;
const URLL = window.location.pathname.split("/").pop().split(".").shift();
function cantidadDeCompra(cantidadElementos) {
  let acum = 0;
  cantidadElementos.forEach((element) => {
    acum = acum + element.cantidad;
  });

  spanCantidad.innerText = acum;
  if (spanCantidad.textContent <= 0) {
    spanCantidad.innerText = "";
  }

  return cantidadElementos;
}

function total(cartClean) {
  let acum = 0;
  let sumEnvioPorCantidad = 0;
  let sumPrecioCantidad = 0;
  const sumaPrecios = cartClean.reduce((acumulador, objeto) => {
    if (objeto.oferta.estado == true) {
      console.log("oferta");
      console.log(objeto.oferta.porcentaje);
      console.log(objeto.cantidad);
      console.log(objeto.precio);
      acumulador =
        acumulador +
        (objeto.precio - (objeto.precio * objeto.oferta.porcentaje) / 100) *
          objeto.cantidad;
      console.log("resultado:" + acumulador);
    } else {
      console.log("no oferta");
      console.log(objeto.cantidad);
      console.log(objeto.precio);
      acumulador = acumulador + objeto.precio * objeto.cantidad;
      console.log("resultado:" + acumulador);
    }
    return acumulador;
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

  cartClean.forEach(({ id, nombre, URLImg, cantidad, precio, oferta }) => {
    if (oferta.estado == true) {
      suma = (precio - (precio * oferta.porcentaje) / 100) * cantidad;
    } else {
      suma = precio * cantidad;
    }

    suma > 8000 ? (envio = "Gratis") : (envio = 1500);
    let estilo = isNaN(envio) ? "color: green" : "color: black";
    HTMLCart += `
      <article class="card-cart">
      <section class="cart-top">
        <p>Vendedor</p>
      </section>
      <section class="cart-mid">
        <div class="conteiner-img-cart">
          <img src="${URLL === "productos" ? "../" : ""}img/${URLImg}" alt="" />
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
      // Si el objeto no está en el carrito limpio, lo agregamos
      cartCleanFunction.push({ ...element });
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
  let c = 0;
  myForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      console.log(c);
      let formulario = e.target;
      let idobjet = 0;
      idobjet = formulario.children[2].value;

      if (idobjet != undefined) {
        compra = search(idobjet);

        texto = compra.nombre.substring(0, 25) + "...";
        Toastify({
          text: texto,
          duration: 3000,
          className: "my-toasty",
        }).showToast();

        if (c == 0) {
          console.log("hay algo en el localStorage?");
          let verificar = localStorage.getItem("carrito");

          console.log(verificar);
          if (verificar != "" && verificar != null) {
            const miObjetoRecuperado = JSON.parse(verificar);
            console.log("encontramos objetos asi que lo metemos");
            miObjetoRecuperado.forEach((element) => {
              cart.push(element);
            });
            cartClean = verRepetidos(cart);
          }
        }
        cart.push(compra);
        cartClean = verRepetidos(cart);
        localStorage.setItem("carrito", JSON.stringify(cartClean));
        cantidadDeCompra(cartClean);
        c++;
      }
    });
  });

  return cartClean;
}

async function cargarCodigoCarrito(items) {
  cartClean = await mandarAlCarrito(items);

  carri.addEventListener("click", () => {
    const p = document.getElementById("p-seccion");
    const miObjetoJSONRecuperado = localStorage.getItem("carrito");
    cartClean = JSON.parse(miObjetoJSONRecuperado);

    p.innerHTML = "Carrito";
    modal.classList.add("show");
    if (URLL == "index" || URLL == "") {
      body.classList.add("over");
      footer.classList.add("Dnone");
      footer.classList.remove("Dflex");
    }
    footerCart.classList.add("Dflex");

    let modalCart = renderCart(cartClean);
    conteinerCards.innerHTML = modalCart;
  });
  //cuando eliminas un elemento
  conteinerCards.addEventListener("click", function (event) {
    const miObjetoJSONRecuperado = localStorage.getItem("carrito");
    if (miObjetoJSONRecuperado != null) {
      cartClean = JSON.parse(miObjetoJSONRecuperado);
    }
    if (event.target.classList.contains("myButton")) {
      event.preventDefault();
      let longitudArray = cartClean.length;
      console.log(longitudArray);

      let input = event.target
        .closest(".conteiner-text-cart")
        .querySelector("input");

      let id = input.value;
      let indice = cartClean.findIndex((objeto) => objeto.id == id);

      if (indice != -1) {
        let objetoEliminar = cartClean.find((objeto) => objeto.id == id);
        let cantidadObjetoEliminar = objetoEliminar.cantidad;

        if (cantidadObjetoEliminar == 1) {
          cartClean.splice(indice, 1);
          localStorage.setItem("carrito", JSON.stringify(cartClean));
        } else if (objetoEliminar.cantidad > 1) {
          if (indice > -1) {
            // Modificamos el valor de la clave 'valor' en el objeto correspondiente.
            cartClean[indice].cantidad -= 1;
            localStorage.setItem("carrito", JSON.stringify(cartClean));
          }
        }
        let objetoEliminarCart = cart.findIndex((objeto) => objeto.id == id);

        cart.splice(objetoEliminarCart, 1);
      }
      cantidadDeCompra(cartClean);
      modalCart = renderCart(cartClean);
      conteinerCards.innerHTML = modalCart;
    }
  });
  return cartClean;
}
export { cargarCodigoCarrito, cantidadDeCompra };
