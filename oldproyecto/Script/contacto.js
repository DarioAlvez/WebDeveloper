const API_KEY = "pat5xjnbwgsImVOXg.bdf36f3447179b0d1a8acfd48a4cf53dce0172d4b8a10bb00874c9dd59201b7f";
const BASE_ID = "appGL2RO8ExE8iOIz";
const TABLE_NAME = "contacto";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

//mensaje de error para reemplazar los alertas 

function mostrarMensaje(texto, tipo = "exito") {
  const mensaje = document.getElementById("mensaje-sistema");
  mensaje.textContent = texto;
  mensaje.style.display = "block";

  if (tipo === "ok") {
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

document.querySelector("#form-contacto form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const mail = document.getElementById("mail").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const asunto = document.getElementById("asunto").value.trim();
  const mensajeTexto = document.getElementById("mensaje").value.trim();

  if (!nombre || !apellido || !mail || !telefono || !asunto || !mensajeTexto) {
    mostrarMensaje("Por favor complete todos los campos antes de enviar.", "error");
    return;
  }

  const data = {
    fields: {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      telefono: telefono,
      asunto: asunto,
      mensaje: mensajeTexto,
    },
  };

  console.log("Datos enviados a Airtable:", JSON.stringify(data, null, 2));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mostrarMensaje("Formulario enviado con éxito.", "ok");
      e.target.reset();
    } else {
      const errorData = await response.json();
      console.error("Error al enviar a Airtable:", errorData);
      mostrarMensaje("Error al enviar el formulario. Verifique los datos e intente nuevamente.", "error");
    }
  } catch (error) {
    console.error("Error de red:", error);
    mostrarMensaje("Error al enviar el formulario. Intente más tarde.", "error");
  }
});