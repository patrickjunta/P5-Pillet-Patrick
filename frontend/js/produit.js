// déclaration des variables globales
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
let containerProducts = document.getElementById("containerProducts");

// condition ternaires pour vérifier la présence d'élément dans le localStorage
let cart =
  localStorage.getItem("cart") === null
    ? []
    : JSON.parse(localStorage.getItem("cart"));

let productsPrices =
  localStorage.getItem("productsPrices") === null
    ? []
    : JSON.parse(localStorage.getItem("productsPrices"));

// fetch url et id produit concatené
fetch("http://localhost:3000/api/teddies/" + id)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let productPrice = data.price / 100;
    appendData(data, productPrice);
  })
  .catch(function (err) {
    console.log("error" + err);
  });
function appendData(data, productPrice) {
  containerProducts.innerHTML += `<div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="produit.html?id=${data._id}"><img class="card-img-top" src="${data.imageUrl}" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a id="productUrl" href="produit.html?id=${data._id}">${data.name}</a>
        </h4>
        <h5 class="card-price">${productPrice}&#8364;</h5>

        <select name="colors" id="teddieColors-dropdown">
          <option value="">--Choisis ta couleur--</option>
        </select>
        
  <p>${data.description}</p>
  <h2 id="selectedColorIs"></h2>  

<a id="addToCartButton" href="#" class="btn cart px-auto">Ajouter au Panier</a>


</div>`;

  //déclaration des variables pour conserver le menu déroulant.
  let options_value = document.getElementById("teddieColors-dropdown");

  // Boucle pour afficher chaque couleur du produit dans le menu déroulant
  for (let color of data.colors) {
    options_value.innerHTML += `<option value="">${color}</option>`;
  }

  // Sauvegarde et rend la couleur sélectionnée
  let colorSelected = document.querySelector("select");
  let colorResult = document.getElementById("selectedColorIs");
  colorSelected.addEventListener("change", () => {
    colorResult.innerText =
      colorSelected.options[colorSelected.selectedIndex].text;
  });

  // action clique sur Ajouter au Panier
  let choicedProduct = document.getElementById("addToCartButton");
  choicedProduct.addEventListener("click", () => {
    let productCart = {
      id: id,
      colors: colorResult.innerText,
    };
    cart.push(productCart);
    localStorage.setItem("cart", JSON.stringify(cart));
    cart = JSON.parse(localStorage.getItem("cart"));

    productsPrices.push(productPrice);
    const addPrice = (a, b) => a + b;
    const summedPrice = productsPrices.reduce(addPrice);
    localStorage.setItem("productsPrices", JSON.stringify(productsPrices));
    localStorage.setItem("summedPrice", JSON.stringify(summedPrice));
  }); //fin fonction addEventListener click
} //fin fonction appendData
