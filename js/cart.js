let carri = document.getElementById("cart");
let conteinerCards = document.getElementById("conteinerCardsFav");
let modal = document.getElementById("modal");
let cerrar = document.getElementById("close");
let objetoString = localStorage.getItem("Carrito");
let objeto = JSON.parse(objetoString);
console.log(objeto);

carri.addEventListener("click", () => {
  modal.classList.add("show");
  body.classList.add("over");
  objetoString = localStorage.getItem("Carrito");
  objeto = JSON.parse(objetoString);
  let modalCart = renderCart();
  conteinerCards.innerHTML = modalCart;
});

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
  let cartClean = verRepetidos();
  let HTMLCart = "";
  let envio = 1500;
  let suma = 0;
  cartClean.forEach((element) => {
    suma = element.precio * element.cantidad;
    suma > 1500 ? (envio = "Gratis") : (envio = 1500);
    HTMLCart += `
      <article class="card-cart">
      <section class="cart-top">
        <p>Comprador</p>
      </section>
      <section class="cart-mid">
        <div class="conteiner-img-cart">
          <img src="img/${element.URLImg}" alt="" />
        </div>
        <div class="conteiner-text-cart">
          <p>${element.nombre}</p>
          <p>color: gris, talle: M</p>
          <p>Eliminar</p>
          <section class="cart-text-price">
            <select name="" id="">
              <option value="">${element.cantidad} u.</option>
            </select>
            <p>$${suma}</p>
          </section>
        </div>
      </section>
      <section class="card-bot">
        <p>Envío</p>
        <p> ${envio} </p>
      </section>
      <section class="cart-line">
        <div class="line"></div>
      </section>
      </article>`;
  });
  return HTMLCart;
}
let myForms = document.querySelectorAll("form");
let cart = [];
let compra, elements;
let span = document.getElementById("span-cant");
let it = 0;
myForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    it++;
    it > 0 ? ((span.innerText = it), (span.style.display = "block")) : null;
    let formulario = e.target;
    let idobjet = 0;
    idobjet = formulario.children[2].value;
    if (idobjet != undefined) {
      compra = search(idobjet);

      cart.push(compra);
      console.log(cart);
      let transformJson = JSON.stringify(cart);
      localStorage.setItem("Carrito", transformJson);
    }
  });
});

const search = (id) => bestSellers.find((objeto) => objeto.id === parseInt(id));

///ejercicio prueba borrar despues
let objetito = [
  {
    nombre: "pepe",
    edad: 15,
  },
  {
    nombre: "maria",
    edad: 35,
  },
];
let valor;
objetito.forEach((element) => {
  valor = prueba(element);
  console.log(valor);
});

function prueba(objetoDes) {
  const { nombre, edad } = objetoDes;
  return { nombre, edad };
}
