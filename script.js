/**
 * SCRIPT PRINCIPAL - PRODUCTIX API
 *
 * Este archivo contiene toda la lógica JavaScript para la aplicación de gestión de productos.
 * Maneja operaciones CRUD (Create, Read, Update, Delete) mediante API REST,
 * funcionalidades de interfaz de usuario y navegación responsiva.
 *
 * API Endpoint: https://api.yumserver.com/16693/products
 *
 * FUNCIONALIDADES PRINCIPALES:
 * - Agregar productos (POST)
 * - Modificar productos (PATCH)
 * - Eliminar productos (DELETE)
 * - Visualizar productos (GET)
 * - Filtrar/buscar productos
 * - Menú móvil responsivo
 * - Copiar ID al portapapeles
 */

// ========== EVENT LISTENERS PRINCIPALES ==========

/**
 * VISUALIZAR PRODUCTOS
 */
let visualizar = document.getElementById("visualizar");
visualizar.addEventListener("click", Visualizar());

/**
 * FORMULARIO AGREGAR PRODUCTO
 * Maneja la creación de nuevos productos via POST a la API
 */
let agregar = document.getElementById("agregar");
agregar.addEventListener("submit", function (formAgregar) {
  // Prevenir el comportamiento por defecto del formulario
  formAgregar.preventDefault();

  // Obtener valores de los campos del formulario
  let titulo = document.getElementById("titulo").value;
  let precioPeso = document.getElementById("precioPeso").value;
  let precioDolar = document.getElementById("precioDolar").value;
  let fecha = document.getElementById("fecha").value;

  // Petición POST a la API para crear nuevo producto
  fetch("https://api.yumserver.com/16693/products", {
    method: "POST",
    body: JSON.stringify({
      titulo: titulo,
      precioPeso: precioPeso,
      precioDolar: precioDolar,
      fecha: fecha,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        return response.json();
      }
      throw new Error(
        "Error " +
          response.status +
          " al comunicarse al API: " +
          response.statusText
      );
    })
    .then((data) => {
      console.log(data); // Log de la respuesta exitosa
    })
    .catch((error) => {
      console.error(error); // Log de errores
    });

  // Notificar al usuario y limpiar formulario
  alert("Los datos fueron ingresados con éxito");
  agregar.reset();
});

/**
 * FORMULARIO MODIFICAR PRODUCTO
 * Maneja la actualización de productos existentes via PATCH a la API
 */
let modificar = document.getElementById("modificar");
modificar.addEventListener("submit", function (formModificar) {
  // Prevenir el comportamiento por defecto del formulario
  formModificar.preventDefault();

  // Obtener valores de los campos del formulario de modificación
  let idcod = document.getElementById("idcod").value;
  let tituloNuevo = document.getElementById("tituloNuevo").value;
  let precioPesoNuevo = document.getElementById("precioPesoNuevo").value;
  let precioDolarNuevo = document.getElementById("precioDolarNuevo").value;
  let fechaNueva = document.getElementById("fechaNueva").value;

  // Petición PATCH a la API para actualizar producto existente
  fetch("https://api.yumserver.com/16693/products", {
    method: "PATCH",
    body: JSON.stringify({
      idcod: idcod,
      titulo: tituloNuevo,
      precioPeso: precioPesoNuevo,
      precioDolar: precioDolarNuevo,
      fecha: fechaNueva,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data); // Log de la respuesta exitosa
    })
    .catch((error) => {
      console.error(error); // Log de errores
    });

  // Notificar al usuario y limpiar formulario
  alert("Los datos fueron modificados con éxito");
  modificar.reset();
});

/**
 * FORMULARIO ELIMINAR PRODUCTO
 * Maneja la eliminación de productos via DELETE a la API
 * Incluye confirmación del usuario antes de proceder
 */
let eliminar = document.getElementById("eliminar");
eliminar.addEventListener("submit", function (formEliminar) {
  // Prevenir el comportamiento por defecto del formulario
  formEliminar.preventDefault();

  // Obtener ID del producto a eliminar
  let id = document.getElementById("id").value;

  // Confirmación del usuario antes de eliminar
  if (confirm("¿Seguro desea eliminar este producto?")) {
    // Petición DELETE a la API para eliminar producto
    fetch("https://api.yumserver.com/16693/products", {
      method: "DELETE",
      body: JSON.stringify({
        idcod: id, // Mapeo del ID local al campo idcod de la API
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data); // Log de la respuesta exitosa
      })
      .catch((error) => {
        console.error(error); // Log de errores
      });

    // Notificar al usuario y limpiar formulario
    alert("Los datos fueron eliminados con éxito");
    eliminar.reset();
  } else {
    alert("Solicitud cancelada "); // Notificar cancelación
  }
});

// ========== FUNCIONES AUXILIARES ==========

/**
 * FUNCIÓN VISUALIZAR
 * Obtiene todos los productos de la API y los muestra en una tabla
 * Se ejecuta en la página verTabla.html
 */
function Visualizar() {
  // Petición GET para obtener todos los productos
  fetch("https://api.yumserver.com/16693/products")
    .then((response) => response.json())
    .then((data) => {
      // Obtener referencia al cuerpo de la tabla
      const tableBody = document.getElementById("tabla-body");
      tableBody.innerHTML = ""; // Limpiar contenido existente

      // Iterar sobre cada producto y crear filas de tabla
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML += `
                    <td><button class="botonCopiar" onclick="CopiarID('${item.idcod}')">Copiar ID</button></td>
                    <td>${item.idcod}</td>
                    <td>${item.titulo}</td>
                    <td>${item.precioPeso}</td>
                    <td>${item.precioDolar}</td>
                    <td>${item.fecha}</td>
                `;
        tableBody.appendChild(row); // Agregar fila a la tabla
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

/**
 * FUNCIÓN COPIAR ID
 * Copia el ID de un producto al portapapeles del usuario
 * @param {string} idcod - ID del producto a copiar
 */
function CopiarID(idcod) {
  // Usar la API del navegador para copiar al portapapeles
  navigator.clipboard
    .writeText(idcod)
    .then(() => {
      alert("ID copiado al portapapeles"); // Notificar éxito
    })
    .catch((err) => {
      console.error("Error al copiar ID al portapapeles:", err);
      alert("Error al copiar ID al portapapeles"); // Notificar error
    });
}

/**
 * FUNCIÓN FILTRAR
 * Filtra las filas de la tabla basándose en el texto del buscador
 * Busca coincidencias en todas las celdas de cada fila
 */
function Filtrar() {
  // Obtener valor del campo de búsqueda
  let buscador = document.getElementById("buscador");
  let filtrar = buscador.value.toUpperCase(); // Convertir a mayúsculas para búsqueda insensible a mayúsculas
  let filas = document.getElementById("tabla").getElementsByTagName("tr");

  // Iterar sobre todas las filas de la tabla
  for (let i = 0; i < filas.length; i++) {
    let celdas = filas[i].getElementsByTagName("td");
    let existe = false;

    // Buscar en todas las celdas de la fila actual
    for (let j = 0; j < celdas.length; j++) {
      let valorCeldas = celdas[j].textContent || celdas[j].innerText;
      if (valorCeldas.toUpperCase().indexOf(filtrar) > -1) {
        existe = true;
        break; // Si encuentra coincidencia, no necesita seguir buscando en esta fila
      }
    }

    // Mostrar u ocultar fila según si existe coincidencia
    if (existe) {
      filas[i].style.display = "";
    } else {
      filas[i].style.display = "none";
    }
  }
}

/**
 * FUNCIÓN MENÚ MÓVIL
 * Maneja la apertura y cierre del menú de navegación en dispositivos móviles
 * Utiliza toggle de clases CSS para mostrar/ocultar el menú
 */
function MenuMobile() {
  // Obtener referencias a elementos del menú móvil
  const menuMobile = document.querySelector(".menuMobile");
  const btnClose = document.querySelector(".cerrarMobile");

  // Alternar clase 'abrir' para mostrar/ocultar menú
  menuMobile.classList.toggle("abrir");

  // Agregar evento al botón de cerrar
  btnClose.addEventListener("click", function () {
    menuMobile.classList.remove("abrir"); // Cerrar menú
  });
}
