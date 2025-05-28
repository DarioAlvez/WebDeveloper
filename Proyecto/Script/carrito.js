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
});

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderCarrito() {
    const contenedor = document.querySelector(".carrito-container");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const item = document.createElement("div");
        item.classList.add("item-carrito");

        item.innerHTML = `
            <img src="${producto.img}" class="img-carrito" width="50">
            <span>${producto.nombre}</span>
            <span>$${producto.precio.toFixed(2)}</span>
            <span>
                <button class="btn-restar" data-nombre="${producto.nombre}">-</button>
                ${producto.cantidad}
                <button class="btn-sumar" data-nombre="${producto.nombre}">+</button>
            </span>
            <span>Subtotal: $${subtotal.toFixed(2)}</span>
        `;

        contenedor.appendChild(item);
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total-carrito");
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    contenedor.appendChild(totalDiv);
}

// Render inicial por si hay algo en el localStorage
renderCarrito();
