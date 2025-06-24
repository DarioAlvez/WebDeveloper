//codigo para el crud contra airtable
// token de  alta: patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804

const API_KEY = "patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804";
const BASE_ID = "appGL2RO8ExE8iOIz";
const TABLE_NAME = "productos";
const API_URL = `https://api.airtable.com/v0/appGL2RO8ExE8iOIz/productos`;

// edicion de productos ya cargados en airtable desde adminProd.html


//mensaje de error para reemplazar los alertas 

function mostrarMensaje(texto, tipo = "exito") {
  const mensaje = document.getElementById("mensaje-sistema");
  mensaje.textContent = texto;
  mensaje.style.display = "block";

  if (tipo === "exito") {
    mensaje.style.backgroundColor = "#d4edda";
    mensaje.style.color = "#155724";
    mensaje.style.border = "1px solid #c3e6cb";
  } else if (tipo === "error") {
    mensaje.style.backgroundColor = "#f8d7da";
    mensaje.style.color = "#721c24";
    mensaje.style.border = "1px solid #f5c6cb";
  }

  setTimeout(() => {
    mensaje.style.display = "none";
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("select-productos");
  const form = document.getElementById("form-editar-producto");

    //Limpiar formulario y resetearlo post operaciones
    function limpiarFormulario() {
    form.reset(); 
    form.style.display = "none"; 
    select.value = ""; 
    }

  async function llenarSelectDesdeAirtable() {
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      const data = await response.json();

      select.innerHTML = '<option value="">Seleccione un producto</option>';
      data.records.forEach(record => {
        const option = document.createElement("option");
        option.value = record.id;
        option.textContent = record.fields.Name;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Error al cargar productos en el select:", error);
    }
  }

  select.addEventListener("change", async (e) => {
    const productoId = e.target.value;
    if (!productoId) {
      form.style.display = "none";
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${productoId}`, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });
      const data = await res.json();
      const fields = data.fields;

// Mostrar en el formulario
      document.getElementById("producto-id").value = productoId;
      document.getElementById("name").value = fields.Name || "";
      document.getElementById("description").value = fields.description || "";
      document.getElementById("image").value = fields.image || "";
      document.getElementById("price").value = fields.price || "";
      document.getElementById("category").value = fields.category || "";

      form.style.display = "block";
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
    }
  });

// Submit del formulario para actualizar
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("producto-id").value;
    const actualizado = {
      fields: {
        Name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
        price: parseFloat(document.getElementById("price").value),
        category: document.getElementById("category").value,

      }
    };

    try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify(actualizado)
    });

    if (res.ok) {
      mostrarMensaje("Producto actualizado correctamente", "exito");
      llenarSelectDesdeAirtable(); // Recargar por si cambia el nombre
      limpiarFormulario();
    } else {
      mostrarMensaje("Error al actualizar el producto", "error");
    }
    } catch (error) {
    console.error("Error al hacer update:", error);
    mostrarMensaje("Error inesperado al actualizar", "error");
    }
    });

  //eliminar producto listado en airtable

const btnEliminar = document.getElementById("btn-eliminar");

btnEliminar.addEventListener("click", async () => {
  const id = document.getElementById("producto-id").value;
  if (!id) {
    mostrarMensaje("Seleccioná un producto para eliminar.", "error");
    return;
  }

  // Confirmación simple (podés usar confirm() tradicional o tu propia ventana modal)
  const confirmDelete = confirm("¿Estás seguro de eliminar este producto?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (res.ok) {
      mostrarMensaje("Producto eliminado correctamente", "exito");
      llenarSelectDesdeAirtable();
      limpiarFormulario();
      form.style.display = "none";
      select.value = ""; // resetear select
    } else {
      mostrarMensaje("Error al eliminar el producto", "error");
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    mostrarMensaje("Error inesperado al eliminar producto", "error");
  }

  llenarSelectDesdeAirtable();
  limpiarFormulario();
});

// Cargar productos al iniciar
llenarSelectDesdeAirtable();
limpiarFormulario(); // Limpiar al cargar la página
});