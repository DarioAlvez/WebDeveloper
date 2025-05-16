
//creacion de tarjeta de productos a mano
const products = [
    {
        name: "Cartabella Daily",
        description: "Cartabella Daily es un papel higiénico de 2 capas,suave y resistente.",
        image: "img/prods/PH/cartabelladaily.png",
        price: 15,
        category: "ph"
    },
    {
        name: "Felpita 50 metros",
        description: "Felpita 50 metros, ideal para uso diario y de alta calidad.",
        image: "img/prods/PH/felpita50mts.png",
        price: 25,
        category: "ph"
    },
    {
        name: "Felpita Blanquisimo 80 metros",
        description: "Felpita Blanquisimo 80 metros,\npapel higiénico de alta calidad y suavidad.",
        image: "img/prods/PH/felpita80mtsblanquisimo.png",
        price: 50,
        category: "ph"
    },
    {
        name: "Felpita Blanquisimo",
        description: "Felpita Blanquisimo!\nUn papel higiénico suave y resistente, ideal para el uso diario.",
        image: "img/prods/PH/felpitablanquisimo.png",
        price: 10,
        category: "ph"          
    },
    {
        name: "Felpita Doble Hoja 30 metros",
        description: "-------",
        image: "img/prods/PH/felpitadoblehoja30mts.png",
        price: 10,
        category: "ph"

    },
    {
        name: "Felpita Doble Hoja 30 metros Pack 6 unidades",
        description: "-------",
        image: "img/prods/PH/felpitadoblehoja30mtsx6.png",
        price: 10,
        category: "ph"

    },
    {
        name: "Felpita Doble Hoja con Soft textura",
        description: "-------",
        image: "img/prods/PH/felpitadobletextura.png",
        price: 10,
        category: "ph"

    },
    {
        name: "Felpita Pack Familiar",
        description: "-------",
        image: "img/prods/PH/felpitafamiliar.png",
        price: 10,
        category: "rc"

    },
    {
        name: "Felpita Institucional 18 Grande",
        description: "-------",
        image: "img/prods/PH/felpitaindustrial8.png",
        price: 10,
        category: "inst"

    },
    {
        name: "Felpita Infinity",
        description: "-------",
        image: "img/prods/PH/felpitainfinity.png",
        price: 10,
        category: "rc"      

    },
    {
        name: "Felpita Kids Decorado",
        description: "-------",
        image: "img/prods/PH/felpitakids.png",
        price: 10,
        category: "rc"

    },
    {
        name: "Felpita Super Pack 24 unidades Familiar",
        description: "-------",
        image: "img/prods/PH/felpitasuperpack24.png",
        price: 10,
        category: "rc"

    },
    {
        name: "Felpita Pack 12 unidades Familiar",
        description: "-------",
        image: "img/prods/PH/felpitax12 familiar.png",
        price: 10,
        category: "rc"

    },
    {
        name: "Felpita Pack 6 unidades Familiar",
        description: "-------",
        image: "img/prods/PH/felpitax6familiar.png",
        price: 10,
        category: "rc"

    },
    {
        name: "Floripel 4 unidades",
        description: "-------",
        image: "img/prods/PH/floripel.png",
        price: 10,
        category: "rc"

    },
    {
        name: "Softpaper 4 unidades",
        description: "-------",
        image: "img/prods/PH/softpaper.png",
        price: 10,
        category: "serv"

    }
    
];
//funcion de creacion de tarjeta de productos
function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('card-product'); 


    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.classList.add('img-ph');


    const title = document.createElement('h3');
    title.classList.add('nombre-prod');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.classList.add('descripcion-prod');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.classList.add('precio-prod');
    price.textContent = `Precio: $${product.price}`;

    const button = document.createElement('button');
    button.classList.add('btn-agregar-carrito');
    button.textContent = 'Agregar';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    return card;
};
//crea tarjetas de productos
const flexProdContainer = document.querySelector('.prod-container');
products.forEach( product => {
    const card = createProductCard(product);
    flexProdContainer.appendChild(card);
});
//const grid = document.querySelector('.prod-container');


//funcion para agregar producto parametrizado
function addProduct() {
  const newProduct = {
  name: "Nuevo Producto",
  description: "Descripción del nuevo producto",
  image: "./img/logo_felpita.png",
  price: "XXX"
  };

  const card = createProductCard(newProduct);
  flexProdContainer.appendChild(card);
}; 


//filtra prod desde input asignado
const searchInput = document.getElementById('busqueda-prod');
function renderProducts(filteredProducts) {
    flexProdContainer.innerHTML = ''; // Limpiar productos anteriores
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        flexProdContainer.appendChild(card);
    });
}

// Mostrar todos al principio
renderProducts(products);

// Escucha cambios en la búsqueda
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    renderProducts(filtered);
});


 
//Filtrar por checkbox
const checkboxes = document.querySelectorAll('.chkbox-familia input[type="checkbox"]');


function renderProducts(filteredProducts) {
  flexProdContainer.innerHTML = '';
  filteredProducts.forEach(product => {
    const card = createProductCard(product);
    flexProdContainer.appendChild(card);
  });
}

function applyCategoryFilters() {
  // Obtener categorías seleccionadas
  const selectedCategories = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  // Filtrar productos
  const filteredProducts = selectedCategories.length > 0
    ? products.filter(p => selectedCategories.includes(p.category))
    : products; // Si nada está seleccionado, mostrar todos

  renderProducts(filteredProducts);
}

// Escucha  los checkboxes
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', applyCategoryFilters);
});

// Mostrar todos al inicio
renderProducts(products);










