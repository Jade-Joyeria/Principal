document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formularioProducto");
    const tablaProductos = document.getElementById("tablaProductos");
    const mensaje = document.getElementById("mensaje");

    // Array para almacenar los productos
    let productos = [];

    // Función para renderizar la tabla de productos
    function renderizarProductos() {
        tablaProductos.innerHTML = ""; // Limpiamos la tabla antes de renderizarla nuevamente
        productos.forEach(producto => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.fecha}</td>
                <td>${producto.idVenta}</td>
                <td>${producto.valor}</td>
            `;
            tablaProductos.appendChild(fila);
        });
    }

    // Función para agregar un nuevo producto
    function agregarProducto(fecha, idVenta, valor) {
        const nuevoProducto = {
            fecha: fecha,
            idVenta: idVenta,
            valor: valor
        };
        productos.push(nuevoProducto);
        renderizarProductos();
    }

    // Función para mostrar un mensaje
    function mostrarMensaje(mensajeTexto, esError = false) {
        mensaje.textContent = mensajeTexto;
        mensaje.style.color = esError ? "red" : "green";
        setTimeout(() => {
            mensaje.textContent = "";
        }, 3000);
    }

    // Evento submit del formulario
    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitamos que se envíe el formulario por defecto

        const fecha = formulario.fecha.value;
        const idVenta = formulario.idventa.value;
        const valor = parseFloat(formulario.valor.value);

        if (fecha && idVenta && valor) {
            agregarProducto(fecha, idVenta, valor);
            formulario.reset(); // Limpiamos el formulario después de agregar el producto
            mostrarMensaje("Producto insertado correctamente.");
        } else {
            mostrarMensaje("Por favor, complete todos los campos.", true);
        }
    });

    // Cargar productos preexistentes (si los hubiera)
    function cargarProductosGuardados() {
        const productosGuardados = JSON.parse(localStorage.getItem("productos"));
        if (productosGuardados) {
            productos = productosGuardados;
            renderizarProductos();
        }
    }

    cargarProductosGuardados();

    // Guardar productos en el localStorage al cerrar la página
    window.addEventListener("beforeunload", function() {
        localStorage.setItem("productos", JSON.stringify(productos));
    });
});
