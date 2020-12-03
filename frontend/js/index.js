let containerProducts = document.getElementById("containerProducts");

// fetch url
fetch("http://localhost:3000/api/teddies")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error" + err);
  });
function appendData(data) {

  for (let product of data) {
    containerProducts.innerHTML += `<div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="produit.html?id=${product._id}"><img class="card-img-top" src="${
      product.imageUrl
    }" alt=""></a>
      <div class="card-body">
        <h4 class="card-title"> 
          <a id="productUrl" href="produit.html?id=${product._id}">${
      product.name
    }</a>
        </h4>
        <h5 class="card-price">${product.price / 100}&#8364;</h5>
        <a href="produit.html?id=${
          product._id
        }" class="btn btnSave details px-auto">Voir produit</a><br /> 
      </div>`;
  }
} //function appendData fin
