// tuve que generar un archivo nuevo JS para la web de cargapedidos, si no rompia las imagenes del index

const fecha = new Date();
document.getElementById("fecha-actual").value = fecha.toJSON().slice(0,10);



document.addEventListener("DOMContentLoaded", function () {
    const botonAgregar = document.getElementById("agregar-campo"); 
    const contenedor = document.getElementById("contenedor-campos");
  
    botonAgregar.addEventListener("click", function () {
      const campoOriginal = contenedor.querySelector(".cod-prod-cant");
      const nuevoCampo = campoOriginal.cloneNode(true);
  
   
      nuevoCampo.querySelectorAll("input").forEach(input => input.value = ""); //deja vacio los inputs
  
      contenedor.appendChild(nuevoCampo);
    });
  });