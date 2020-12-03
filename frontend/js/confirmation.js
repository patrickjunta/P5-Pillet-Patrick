let containerConfirmation = document.getElementById("containerConfirmation");

let orderId =
  localStorage.getItem("orderId") === null
    ? []
    : JSON.parse(localStorage.getItem("orderId"));
let summedPrice =
  localStorage.getItem("summedPrice") === null
    ? 0
    : JSON.parse(localStorage.getItem("summedPrice"));

containerConfirmation.innerHTML += `<div class="col-lg-4 col-md-6 mb-4">
<div class="card h-100">
  <div class="card-body">
    <h4 class="card-title"> 
      <p>Merci de votre achat de <br>${summedPrice}&#8364;<br>Voici votre n° de commande</p>
    </h4>
    <h5 class="card-title"> 
      <p id="orderId">${orderId}</p>
    </h5>
    
  </div>`;

  setTimeout(function (){
    window.localStorage.clear();
}, 10000);
