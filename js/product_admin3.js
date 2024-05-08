document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formularioProducto");
    const tablaProductos = document.getElementById("tablaProductos");
    const mensaje = document.getElementById("mensaje");
    

    // Array para almacenar los productos
    let productos = [];

    // Función para renderizar la tabla de productos
    function renderizarProductos() {
        tablaProductos.innerHTML = ""; // Limpiamos la tabla antes de renderizarla nuevamente
        productos.forEach((producto, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.fecha}</td>
                <td>${producto.nombre}</td>
                <td>${producto.idVenta}</td>
                <td>${producto.valor}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.cantidad}</td>
                <td>
                    <button onclick="editarProducto(${index})">Editar</button>
                    <button onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            `;
            tablaProductos.appendChild(fila);
        });
    }

    // Función para agregar un nuevo producto
    function agregarProducto(fecha, nombre, idVenta, valor, descripcion, cantidad) {
        const nuevoProducto = {
            fecha: fecha,
            nombre: nombre,
            idVenta: idVenta,
            valor: valor,
            descripcion: descripcion,
            cantidad: cantidad
        };
        productos.push(nuevoProducto);
        renderizarProductos();
    }

    // Función para editar un producto
    function editarProducto(index) {
        const producto = productos[index];
        formulario.fecha.value = producto.fecha;
        formulario.nombre.value = producto.nombre;
        formulario.idventa.value = producto.idVenta;
        formulario.valor.value = producto.valor;
        formulario.descripcion.value = producto.descripcion;
        formulario.cantidad.value = producto.cantidad;

        // Eliminamos el producto antiguo
        productos.splice(index, 1);
        renderizarProductos();
    }

    // Función para eliminar un producto
    function eliminarProducto(index) {
        productos.splice(index, 1);
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
        const nombre = formulario.nombre.value;
        const idVenta = formulario.idventa.value;
        const valor = parseFloat(formulario.valor.value);
        const descripcion = formulario.descripcion.value;
        const cantidad = parseInt(formulario.cantidad.value);

        if (fecha && nombre && idVenta && valor && descripcion && cantidad) {
            agregarProducto(fecha, nombre, idVenta, valor, descripcion, cantidad);
            formulario.reset(); // Limpiamos el formulario después de agregar el producto
            mostrarMensaje("Producto insertado correctamente.");
        } else {
            mostrarMensaje("Por favor, complete todos los campos.", true);
        }
    });

    // Cargar productos preexistentes (si hay productos ya agregados )
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
function newFunction() {
    "markdown.preview.fontSize";
    13,
        "[markdown]"; {
        "editor.fontSize"; 14,
            "editor.wordWrap"; "on",
                "files.trimTrailingWhitespace"; false,
                    "editor.minimap.enabled"; false;
    }
}

