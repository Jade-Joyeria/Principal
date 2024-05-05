document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formularioProducto");
    const tablaProductos = document.getElementById("tablaProductos");

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

    // Evento submit del formulario
    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitamos que se envíe el formulario por defecto

        const fecha = formulario.fecha.value;
        const idVenta = formulario.idventa.value;
        const valor = parseFloat(formulario.valor.value);

        if (fecha && idVenta && valor) {
            agregarProducto(fecha, idVenta, valor);
            formulario.reset(); // Limpiamos el formulario después de agregar el producto
            document.getElementById("mensaje").textContent = "Producto insertado correctamente.";
        } else {
            document.getElementById("mensaje").textContent = "Por favor, complete todos los campos.";
        }
    });
});
