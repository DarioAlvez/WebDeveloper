// tuve que generar un archivo nuevo JS para la web de cargapedidos, si no rompia las imagenes del index

const fecha = new Date();
document.getElementById("fecha-actual").value = fecha.toJSON().slice(0,10);

