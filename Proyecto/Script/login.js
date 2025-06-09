const API_KEY = "patbN4kC1WyOaJoSL.b274316324f2af1cfce8b7683e64dcac07fe432e05d3ceee9a9808c78bdc7804";
const BASE_ID = "appGL2RO8ExE8iOIz";
const TABLE_NAME = "usuarios";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

//traigo tabla usuarios.

document.getElementById("inputs-login").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("user").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    const data = await response.json();

    const usuarioValido = data.records.find(record =>
      record.fields.nombreusuario === username &&
      record.fields.password === password
    );

    if (usuarioValido) {
      //  Redireccionar a adminprod.html si es válido
      window.location.href = "adminProd.html";
    } else {
      alert(" Usuario o contraseña incorrectos");
    }

  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    alert("Error de conexion.");
  }
});