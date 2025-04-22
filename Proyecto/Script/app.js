
const products = [
    {
        name: "Cartabella Daily",
        description: "Cartabella Daily es un papel higiénico de 2 capas,\nsuave y resistente, ideal para el uso diario.",
        image: "img/prods/PH/cartabelladaily.png",
        price: 15
    },  
    {
        name: "Felpita 50 metros",
        description: "Felpita 50 metros, ideal para uso diario y de alta calidad.",
        image: "img/prods/PH/felpita50mts.png",
        price: 25
    },
    {
        name: "Felpita Blanquisimo 80 metros",
        description: "Felpita Blanquisimo 80 metros,\npapel higiénico de alta calidad y suavidad.",
        image: "img/prods/PH/felpita80mtsblanquisimo.png",
        price: 50
    },
    {
        name: "Felpita Blanquisimo",
        description: "Felpita Blanquisimo!\nUn papel higiénico suave y resistente, ideal para el uso diario.",
        image: "img/prods/PH/felpitablanquisimo.png",
        price: 10

    },
    {
        name: "Felpita Doble Hoja 30 metros",
        description: "-------",
        image: "img/prods/PH/felpitadoblehoja30mts.png",
        price: 10

    },
    {
        name: "Felpita Doble Hoja 30 metros Pack 6 unidades",
        description: "-------",
        image: "img/prods/PH/felpitadoblehoja30mtsx6.png",
        price: 10

    },
    {
        name: "Felpita Doble Hoja con Soft textura",
        description: "-------",
        image: "img/prods/PH/felpitadobletextura.png",
        price: 10

    },
    {
        name: "Felpita Pack Familiar",
        description: "-------",
        image: "img/prods/PH/felpitafamiliar.png",
        price: 10

    },
    {
        name: "Felpita Institucional 18 Grande",
        description: "-------",
        image: "img/prods/PH/felpitaindustrial8.png",
        price: 10

    },
    {
        name: "Felpita Infinity",
        description: "-------",
        image: "img/prods/PH/felpitainfinity.png",
        price: 10

    },
    {
        name: "Felpita Kids Decorado",
        description: "-------",
        image: "img/prods/PH/felpitakids.png",
        price: 10

    },
    {
        name: "Felpita Super Pack 24 unidades Familiar",
        description: "-------",
        image: "img/prods/PH/felpitasuperpack24.png",
        price: 10

    },
    {
        name: "Felpita Pack 12 unidades Familiar",
        description: "-------",
        image: "img/prods/PH/felpitax12 familiar.png",
        price: 10

    },
    {
        name: "Felpita Pack 6 unidades Familiar",
        description: "-------",
        image: "img/prods/PH/felpitax6familiar.png",
        price: 10

    },
    {
        name: "Floripel 4 unidades",
        description: "-------",
        image: "img/prods/PH/floripel.png",
        price: 10

    },
    {
        name: "Softpaper 4 unidades",
        description: "-------",
        image: "img/prods/PH/softpaper.png",
        price: 10

    }
    
];





function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');


    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const title = document.createElement('h3');
    title.classList.add('nombre-prod');
    title.textContent = product.name;

    const description = document.createElement('descripcion-prod');
    description.classList.add('descripcion-prod');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const button = document.createElement('button');
    button.textContent = 'Comprar';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(price);
    card.appendChild(button);

    return card;
};

function addProduct() {
    const newProduct = {
        name: "Nuevo Producto",
        description: "Descripción del nuevo producto",
        image: "./img/image-google.png",
        price: 20
    };

    const card = createProductCard(newProduct);
    flexProdContainer.appendChild(card);
}

const flexProdContainer = document.querySelector('.prod-container');

products.forEach( product => {
    const card = createProductCard(product);
    flexProdContainer.appendChild(card);
});

const grid = document.querySelector('.prod-container');

// const button = document.querySelector('#btn-add-products');
// button.addEventListener('click', addProduct);



