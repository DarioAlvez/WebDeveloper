//codigo para el crud contra airtable
// token de  alta: patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804

const API_KEY = "patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804";
const BASE_ID = "appGL2RO8ExE8iOIz";
const TABLE_NAME = "productos";
const API_URL = `https://api.airtable.com/v0/appGL2RO8ExE8iOIz/productos`;
// edicion de productos ya cargados en airtable desde adminProd.html

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("select-productos");
  const form = document.getElementById("form-editar-producto");

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
        alert("Producto actualizado correctamente");
        llenarSelectDesdeAirtable(); // Recargar por si cambia el nombre
      } else {
        alert("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error al hacer update:", error);
    }
  });

  llenarSelectDesdeAirtable();
});

//eliminar producto listado en airtable

const btnEliminar = document.getElementById("btn-eliminar");
btnEliminar.addEventListener("click", async () => {
    const id = document.getElementById("producto-id").value;
    if (!id) {
      alert("Seleccioná un producto para eliminar.");
      return;
    }

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
        alert("Producto eliminado correctamente");
        llenarSelectDesdeAirtable();
        form.style.display = "none";
        select.value = ""; // resetear select
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
      llenarSelectDesdeAirtable();
  });



