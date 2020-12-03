let containerCart = document.getElementById("containerCart");
let containerForm = document.getElementById("containerForm");

let cart =
  localStorage.getItem("cart") === null
    ? []
    : JSON.parse(localStorage.getItem("cart"));

let summedPrice =
  localStorage.getItem("summedPrice") === null
    ? 0
    : JSON.parse(localStorage.getItem("summedPrice"));

let contact = {};
let product = "";
let products = [];

for (let product of cart) {
  fetch("http://localhost:3000/api/teddies/" + product.id)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data, product.colors);
    })
    .catch(function (err) {
      console.log("error" + err);
    });
  products.push(product.id);
} //fin boucle for of

localStorage.setItem("products", JSON.stringify(products));

function appendData(data, color) {
  containerCart.innerHTML += `<div class="col-lg-4 col-md-6 mb-4">
  <div class="card h-100">
    <a href="produit.html?id=${data._id}"><img class="card-img-top" src="${
    data.imageUrl
  }" alt=""></a>
    <div class="card-body">
      <h4 class="card-title"> 
        <a id="productUrl" href="produit.html?id=${data._id}">${data.name}</a>
      </h4>
      <h5 class="card-price">${color}</h5>
      <h5 class="card-price">${data.price / 100}&#8364;</h5>

      <a href="produit.html?id=${
        data._id
      }" class="btn btnSave details px-auto">Voir produit</a><br /> 
    </div>`;
} //function appendData fin

containerForm.innerHTML = `
<form>
<!-- form-Prénom// -->
	<div class="form-group input-group">
		<div class="input-group-prepend">
		    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
		 </div>
        <input id="firstName" name="" class="form-control" placeholder="Prénom" type="text">
        <span id='missPrenom'></span><br>
    </div> 
<!-- form-Nom// -->
	<div class="form-group input-group">
		<div class="input-group-prepend">
		    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
		 </div>
        <input id="lastName" name="" class="form-control" placeholder="Nom" type="text">
    </div> 
<!-- form-Adresse// -->
	<div class="form-group input-group">
		<div class="input-group-prepend">
		    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
		 </div>
        <input id="address" name="" class="form-control" placeholder="Adresse" type="text">
    </div> 
<!-- form-Ville// -->
	<div class="form-group input-group">
		<div class="input-group-prepend">
		    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
		 </div>
        <input id="city" name="" class="form-control" placeholder="Ville" type="text">
    </div> 

<!-- form-email// -->
    <div class="form-group input-group">
    	<div class="input-group-prepend">
		    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
		 </div>
        <input id="email" name="" class="form-control" placeholder="Email" type="email">
    </div> <!-- form-group// -->

    
      <div class="d-flex justify-content-between align-items-center">
    <p class="text-center font-weight-bold pl-4">Prix total : ${summedPrice}&#8364;</p>
    <a id="confirmationButton" class="btn btn-primary">Confirmer ma commande</a>
      <div>
    </form>`;

let confirmationButton = document.getElementById("confirmationButton");
let lastName = document.getElementById("lastName");
let firstName = document.getElementById("firstName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
let formElements = [firstName, lastName, address, city, email];
let namesAndCityFormat = /^[a-zA-Z ]+$/;
let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let addressFormat = /([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)*$/;

function checkFormFields() {
  for (let element of formElements) {
    if (element.value.length == 0) {
      alert(`Remplissez votre ${element.placeholder} svp`);
    }
  }
}
function ValidateNamesAndCity(inputtx) {
  let format = /^[a-zA-Z ]+$/;
  if (inputtx.value.match(format)) {
    return true;
  } else {
    alert(
      "Veuillez remplir un prénom, nom, ville correcte, ex: Victor, Martin, Dijon"
    );
    firstName.focus();
    lastName.focus();
    city.focus();
    return false;
  }
}
function ValidateEmail(inputtx) {
  let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (inputtx.value.match(mailFormat)) {
    return true;
  } else {
    alert("Veuillez remplir une adresse email correcte, demo@example.com");
    email.focus();
    return false;
  }
}
function ValidateAddress(inputtx) {
  let addressFormat = /([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)*$/;

  if (inputtx.value.match(addressFormat)) {
    return true;
  } else {
    alert(
      "Veuillez remplir une adresse correcte, ex: 10 rue Clemenceau 12345 Dijon"
    );
    address.focus();
    return false;
  }
}

function fetchPost(contact) {
  let products =
    localStorage.getItem("products") === null
      ? []
      : JSON.parse(localStorage.getItem("products"));

  const options = {
    method: "POST",
    body: JSON.stringify({ contact: contact, products: products }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("http://localhost:3000/api/teddies/order", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let orderId = response.orderId;
      localStorage.setItem("orderId", JSON.stringify(orderId));
      setTimeout(function () {
        document.location.href = "confirmation.html";
      }, 5000);
    })
    .catch(function (err) {
      console.log("error" + err);
    });
}

confirmationButton.addEventListener("click", () => {
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  // Vérification si les champs du formulaire sont remplis et correctement
  /*
  checkFormFields();
  ValidateEmail(email);
  ValidateNamesAndCity(lastName);
  ValidateNamesAndCity(firstName);
  ValidateNamesAndCity(city);
  ValidateAddress(address);
  */
  fetchPost(contact);
}); //fin  addEventListener





/*
const fetchPost = async (resultat) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify({ contact: resultat, products: products }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("http://localhost:3000/api/teddies/order", options);
    if (!res.ok) {
      throw new Error(res.status);
    }
    const responseData = await res.json();
    let orderId = responseData.orderId;
    localStorage.setItem("orderId", JSON.stringify(orderId));
    setTimeout(function () {
      document.location.href = "confirmation.html";
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};*/