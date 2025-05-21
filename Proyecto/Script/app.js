const API_KEY = "patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804";
const API_URL = `https://api.airtable.com/v0/appGL2RO8ExE8iOIz/productos`;

let products = [];

const flexProdContainer = document.querySelector('.prod-container');
const searchInput = document.getElementById('busqueda-prod');
const checkboxes = document.querySelectorAll('.chkbox-familia input[type="checkbox"]');

function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('card-product'); 

    const img = document.createElement('img');
    
    if (product.image && Array.isArray(product.image)) {
        img.src = product.image[0].url || '';
    } else {
        img.src = product.image || '';
    }
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
            image: record.fields.image || '', // probablemente es un array
            price: record.fields.price || 0,
            category: record.fields.category || ''
        }));

        filterProducts();  
    } catch (error) {
        console.error("Error al cargar productos: ", error);
    }
}

fetchProductsFromAirtable();






