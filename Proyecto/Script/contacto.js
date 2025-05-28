const API_KEY = "pat5xjnbwgsImVOXg.bdf36f3447179b0d1a8acfd48a4cf53dce0172d4b8a10bb00874c9dd59201b7f";
const BASE_ID = "appGL2RO8ExE8iOIz";
const TABLE_NAME = "contacto";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

document.querySelector("#form-contacto form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const mail = document.getElementById("mail").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const asunto = document.getElementById("asunto").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !apellido || !mail || !telefono || !asunto || !mensaje) {
    alert("Por favor complete todos los campos antes de enviar.");
    return;
  }

  const data = {
    fields: {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      telefono: telefono,
      asunto: asunto,
      mensaje: mensaje,
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
      alert("Formulario enviado con éxito.");
      e.target.reset();
    } else {
      const errorData = await response.json();
      console.error("Error al enviar a Airtable:", errorData);
      alert("Error al enviar el formulario. Verifique los datos e intente nuevamente.");
    }
  } catch (error) {
    console.error("Error de red:", error);
    alert("Error al enviar el formulario. Intente más tarde.");
  }
});
