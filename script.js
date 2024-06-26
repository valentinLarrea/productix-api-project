let visualizar = document.getElementById('visualizar');
visualizar.addEventListener("click", Visualizar());

let agregar = document.getElementById('agregar')
agregar.addEventListener('submit', function (formAgregar) {
	formAgregar.preventDefault();

	let titulo = document.getElementById('titulo').value;
	let precioPeso = document.getElementById('precioPeso').value;
	let precioDolar = document.getElementById('precioDolar').value;
	let fecha = document.getElementById('fecha').value;

	fetch("https://api.yumserver.com/16693/products", {
		method: 'POST',
		body: JSON.stringify({
			titulo: titulo,
			precioPeso: precioPeso,
			precioDolar: precioDolar,
			fecha: fecha
		}),
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Error " + response.status + " al comunicarse al API: " + response.statusText);
		})
		.then(data => {
			console.log(data)
		})
		.catch(error => {
			console.error(error)
		})
	alert("Los datos fueron ingresados con éxito");
	agregar.reset();
})

let modificar = document.getElementById('modificar')
modificar.addEventListener('submit', function (formModificar) {
	formModificar.preventDefault()

	let idcod = document.getElementById('idcod').value;
	let tituloNuevo = document.getElementById('tituloNuevo').value;
	let precioPesoNuevo = document.getElementById('precioPesoNuevo').value;
	let precioDolarNuevo = document.getElementById('precioDolarNuevo').value;
	let fechaNueva = document.getElementById('fechaNueva').value;

	fetch("https://api.yumserver.com/16693/products", {
		method: 'PATCH',
		body: JSON.stringify({
			idcod: idcod,
			titulo: tituloNuevo,
			precioPeso: precioPesoNuevo,
			precioDolar: precioDolarNuevo,
			fecha: fechaNueva
		}),
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.then(data => {
			console.log(data)
		})
		.catch(error => {
			console.error(error)
		})
	alert("Los datos fueron modificados con éxito");
	modificar.reset();
})

let eliminar = document.getElementById('eliminar')
eliminar.addEventListener('submit', function (formEliminar) {
	formEliminar.preventDefault()

	let id = document.getElementById('id').value;


	if (confirm('¿Seguro desea eliminar este producto?')) {
		fetch("https://api.yumserver.com/16693/products", {
			method: 'DELETE',
			body: JSON.stringify({
				idcod: id
			}),
			headers: {
				"Content-Type": "application/json; charset=UTF-8"
			}
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then(data => {
				console.log(data)
			})
			.catch(error => {
				console.error(error)
			})
		alert("Los datos fueron eliminados con éxito");
		eliminar.reset();
	}
	else { alert("Solicitud cancelada "); }

});

function Visualizar() {
	fetch('https://api.yumserver.com/16693/products')
		.then(response => response.json())
		.then(data => {
			const tableBody = document.getElementById('tabla-body');
			tableBody.innerHTML = '';
			data.forEach(item => {
				const row = document.createElement('tr');
				row.innerHTML += `
					<td><button class="botonCopiar" onclick="CopiarID('${item.idcod}')">Copiar ID</button></td>
                    <td>${item.idcod}</td>
                    <td>${item.titulo}</td>
                    <td>${item.precioPeso}</td>
					<td>${item.precioDolar}</td>
					<td>${item.fecha}</td>
                `;
				tableBody.appendChild(row);
			});
		})
		.catch(error => {
			console.error('Error al obtener los datos:', error);
		});
}

function CopiarID(idcod) {
	navigator.clipboard.writeText(idcod)
		.then(() => {
			alert('ID copiado al portapapeles');
		})
		.catch(err => {
			console.error('Error al copiar ID al portapapeles:', err);
			alert('Error al copiar ID al portapapeles');
		});
}

function Filtrar() {
	let buscador = document.getElementById('buscador');
	let filtrar = buscador.value.toUpperCase();
	let filas = document.getElementById('tabla').getElementsByTagName('tr');

	for (let i = 0; i < filas.length; i++) {
		let celdas = filas[i].getElementsByTagName('td');
		let existe = false;
		for (let j = 0; j < celdas.length; j++) {
			let valorCeldas = celdas[j].textContent || celdas[j].innerText;
			if (valorCeldas.toUpperCase().indexOf(filtrar) > -1) {
				existe = true;
				break;
			}
		}
		if (existe) {
			filas[i].style.display = '';
		} else {
			filas[i].style.display = 'none';
		}
	}
}

function MenuMobile() {
	const menuMobile = document.querySelector('.menuMobile');
	const btnClose = document.querySelector('.cerrarMobile');

	menuMobile.classList.toggle('abrir');

	btnClose.addEventListener('click', function () {
		menuMobile.classList.remove('abrir');
	});
}















