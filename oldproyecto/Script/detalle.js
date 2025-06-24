const producto = JSON.parse(localStorage.getItem("productoDetalle"));
const contenedor = document.getElementById("detalle-producto");

if (producto) {
  contenedor.innerHTML = `
    <img src="${producto.image[0]?.url || producto.image}" alt="${producto.name}" class="img-ph">
    <h3 class="nombre-prod">${producto.name}</h3>
    <p class="descripcion-prod">${producto.description}</p>
    <p class="precio-prod">Precio: $${producto.price}</p>
    <button class="btn-agregar-carrito" style="width: 50%; margin: 0 auto; transition: none;">Agregar</button>
  `;
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-agregar-carrito")) {
    const nombre = producto.name;
    const precio = producto.price;
    const imgSrc = producto.image[0]?.url || producto.image;

    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1, img: imgSrc });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    e.target.classList.add("clicked");
    const originalText = e.target.textContent;
    e.target.textContent = "¡Agregado!";

    setTimeout(() => {
      e.target.classList.remove("clicked");
      e.target.textContent = originalText;
    }, 1500);
  }
});

