let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-agregar-carrito")) {
        const card = e.target.closest(".card-product");
        const nombre = card.querySelector(".nombre-prod").textContent;
        const precioTexto = card.querySelector(".precio-prod").textContent;
        const precio = parseFloat(precioTexto.replace("Precio: $", ""));
        const imgSrc = card.querySelector("img").src;

        const productoExistente = carrito.find(item => item.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ nombre, precio, cantidad: 1, img: imgSrc });
        }

        guardarCarrito();
        renderCarrito();
    }

    //agregar quitar cant. prod en el carrito para el calculo del subtotal

    if (e.target.classList.contains("btn-sumar")) {
        const nombre = e.target.dataset.nombre;
        const producto = carrito.find(p => p.nombre === nombre);
        producto.cantidad++;
        guardarCarrito();
        renderCarrito();
    }

    if (e.target.classList.contains("btn-restar")) {
        const nombre = e.target.dataset.nombre;
        const producto = carrito.find(p => p.nombre === nombre);
        if (producto.cantidad > 1) {
            producto.cantidad--;
        } else {
            carrito = carrito.filter(p => p.nombre !== nombre);
        }
        guardarCarrito();
        renderCarrito();
    }

    if (e.target.classList.contains("btn-finalizar")) {
        carrito = [];
        guardarCarrito();
        renderCarrito();
        mostrarMensajeYRedirigir();
    }
});

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderCarrito() {
    const contenedor = document.querySelector("#productos-lista");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const item = document.createElement("div");
        item.classList.add("card-carrito");

        item.innerHTML = `
            <img src="${producto.img}" class="img-carrito" alt="${producto.nombre}">
            <div class="info-carrito">
                <h2 class="nombre-carrito">${producto.nombre}</h2>
                <p class="precio-carrito">Precio: $${producto.precio.toFixed(2)}</p>
                <div class="cantidad-carrito">
                    <button class="btn-restar" data-nombre="${producto.nombre}">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="btn-sumar" data-nombre="${producto.nombre}">+</button>
                </div>
                <p class="subtotal-carrito">Subtotal: $${subtotal.toFixed(2)}</p>
            </div>
        `;

        contenedor.appendChild(item);
    });

    document.getElementById("total-general").textContent = total.toFixed(2);
}

function mostrarMensajeYRedirigir() {
    const main = document.querySelector("main");
    if (main) {
        main.innerHTML = `
            <div style="text-align:center; padding: 40px;">
                <h2 style="color: green;">Compra realizada con éxito</h2>
                <p>Redirigiendo al catálogo...</p>
            </div>
        `;
    }

    // mandar al index despues de la compra
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2500); 
}

renderCarrito();
