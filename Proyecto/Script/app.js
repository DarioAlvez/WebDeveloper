const API_KEY = "patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804";
const API_URL = `https://api.airtable.com/v0/appGL2RO8ExE8iOIz/productos`;

let products = [];

const flexProdContainer = document.querySelector('.prod-container');
const searchInput = document.getElementById('busqueda-prod');
const checkboxes = document.querySelectorAll('.chkbox-familia input[type="checkbox"]');

function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('card-product');

    card.addEventListener('click', () => {
        localStorage.setItem('productoDetalle', JSON.stringify(product));
        window.location.href = 'detalle.html';
    });

    const img = document.createElement('img');
    img.src = (product.image && Array.isArray(product.image)) ? product.image[0].url : product.image || '';
    img.alt = product.name;
    img.classList.add('img-ph');

    const title = document.createElement('h3');
    title.classList.add('nombre-prod');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.classList.add('descripcion-prod');
    description.textContent = product.description;

    const detalledescrip = document.createElement('p');
    description.classList.add('descripcion-prod');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.classList.add('precio-prod');
    price.textContent = `Precio: $${product.price}`;

    const button = document.createElement('button');
    button.classList.add('btn-agregar-carrito');
    button.textContent = 'Agregar';
    button.addEventListener('click', e => {
        e.stopPropagation(); 
        agregarProductoAlCarrito(product);
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}


function renderProducts(filteredProducts) {
    flexProdContainer.innerHTML = '';
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        flexProdContainer.appendChild(card);
    });
}

function filterProducts() {
    const query = searchInput.value.toLowerCase();

    const selectedCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));

async function fetchProductsFromAirtable() {
    try {
        const response = await fetch(API_URL, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });
        const data = await response.json();

        // Asignar a variable global 'products' para que filtros funcionen bien
        products = data.records.map(record => ({
            name: record.fields.Name || '',
            description: record.fields.description || '',
            detalle_descrip: record.fields.Detalle_produc  || '',
            image: record.fields.image || '',             
            price: record.fields.price || 0,
            category: record.fields.category || ''
        }));

        filterProducts();  
    } catch (error) {
        console.error("Error al cargar productos: ", error);
    }
}

fetchProductsFromAirtable();


//armado y llenado de carrito para el LocalStorage

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

document.querySelectorAll('.btn-agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('clicked')) return; // no stackear clicks
    btn.classList.add('clicked');
    const originalText = btn.textContent;
    btn.textContent = '¡Agregado!';

    setTimeout(() => {
      btn.classList.remove('clicked');
      btn.textContent = originalText;
    }, 1500);
  });
});

function agregarProductoAlCarrito(product) {
    const productoExistente = carrito.find(item => item.nombre === product.name);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: product.name,
            precio: product.price,
            cantidad: 1,
            img: (product.image && Array.isArray(product.image)) ? product.image[0].url : product.image || ''
        });
    }
    guardarCarrito();
    renderCarrito();
}

