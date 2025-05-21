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

