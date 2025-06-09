//limpiar formulario de alta con cancelar
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("add-product-form");
  const botonCancelar = document.getElementById("btn-cancelar");

  botonCancelar.addEventListener("click", function () {
    formulario.reset(); // Resetea todos los campos del formulario
  });
});


//codigo para el crud contra airtable
// token de  alta: patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804

const API_KEY = "patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804";
const BASE_ID = "appGL2RO8ExE8iOIz";
const TABLE_NAME = "productos";
const API_URL = `https://api.airtable.com/v0/appGL2RO8ExE8iOIz/productos`;

// cargar prod desde formulario altaproducto 
document.getElementById("add-product-form").addEventListener("submit", async function (e) {
e.preventDefault();
const name = document.getElementById("product-name").value;
const description = document.getElementById("product-description").value;
const image = document.getElementById("product-image").value;
const price = parseFloat(document.getElementById("product-price").value);
const category = document.getElementById("product-category").value;
const data = {
records: [{
fields: {
Name: name,
description: description,
image: image,
price: parseFloat(price),
category: category
}
}]
};
const response = await fetch(API_URL, {
method: "POST",
headers: {
"Authorization": `Bearer ${API_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify(data)
});
if (response.ok) {
alert("Producto agregado correctamente.");
e.target.reset();
formulario.reset();
} else {
const error = await response.json();
alert("Error al agregar producto: " + JSON.stringify(error));
}
});

