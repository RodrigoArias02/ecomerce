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
  cartClean.forEach((element) => {
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
            <p>$${element.precio * element.cantidad}</p>
          </section>
        </div>
      </section>
      <section class="card-bot">
        <p>Envío</p>
        <p>Gratis</p>
      </section>
      <section class="cart-line">
        <div class="line"></div>
      </section>
      </article>`;
  });
  return HTMLCart;
}
