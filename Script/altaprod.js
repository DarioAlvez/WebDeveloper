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

//mensaje de error para reemplazar los alertas 

function mostrarMensaje(texto, tipo = "exito") {
  const mensaje = document.getElementById("mensaje-sistema");
  mensaje.textContent = texto;
  mensaje.style.display = "block";

  if (tipo === "exito") {
    mensaje.style.backgroundColor = "#d4edda";
    mensaje.style.color = "#155724";
    mensaje.style.border = "1px solid #c3e6cb";
  } else if (tipo === "error") {
    mensaje.style.backgroundColor = "#f8d7da";
    mensaje.style.color = "#721c24";
    mensaje.style.border = "1px solid #f5c6cb";
  }

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 3000);
}

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

try {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    mostrarMensaje("Producto agregado correctamente.", "exito");
    e.target.reset();
    // formulario.reset(); // 'formulario' is not defined in this scope, so this line can be removed if unnecessary
  } else {
    const error = await response.json();
    mostrarMensaje("Error al agregar producto: " + JSON.stringify(error), "error");
  }
} catch (error) {
  console.error("Error al agregar producto:", error);
  mostrarMensaje("Error inesperado al agregar producto.", "error");
}
});
