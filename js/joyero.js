//dejo el Joyero visible para que no me da;e la interfaz
var joyeroVisible = false;

//espero a ver si todos los elementos se cargaron seguir el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    //funcionalidad a los botones eliminar del joyero  - prueba ok
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemJoyero);
    }
    //funcionalidad al boton sumar cantidad - prueba ok
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }
     //funcionalidad al buton restar cantidad - prueba ok
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }
    //funcionalidad al boton Agregar al Joyero - prueba ok
    var botonesAgregarAlJoyero = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlJoyero.length;i++){
        var button = botonesAgregarAlJoyero[i];
        button.addEventListener('click', agregarAlJoyeroClicked);
    }

    //Agregamos funcionalidad al botón comprar - falta 
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}

//Eliminamos todos los elementos del Joyero pero no lo ocultamos, se necesita 

function pagarClicked(){
    if(document.getElementsByClassName('joyero-precio-total')[0].innerText == '$'+ 0){
    alert("Sabemos que somos tus preferidos... pero debes escoger alguna joya para ir la boton de pagos")
    }else{
    alert("Gracias por tu fina elección, ahora seras dirigído a la sección de pagos");    
    window.location.href = "http://localhost:4400";
    actualizarTotalJoyero();
    }
}

//Funcion controla el boton clickeado de agregar al Joyero - preuba ok
function agregarAlJoyeroClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    agregarItemAlJoyero(titulo, precio, imagenSrc);

    hacerVisibleJoyero();
}


//Funcion que hace visible el Joyero - ok
function hacerVisibleJoyero(){
    joyeroVisible = true;
    var joyero = document.getElementsByClassName('joyero')[0];
    joyero.style.marginRight = '0';
    joyero.style.opacity = '1';
    var items =document.getElementsByClassName('grilla-items')[0];
    items.style.width = '60%';
}

//agrega el espacio del item al Joyero - purba ok
function agregarItemAlJoyero(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsJoyero = document.getElementsByClassName('joyero-items')[0];

    //no deja ingresar el mismo dato al Joyero - prueba ok
    var nombresItemsJoyero = itemsJoyero.getElementsByClassName('joyero-item-titulo');   
    for(var i=0;i < nombresItemsJoyero.length;i++){
        if(nombresItemsJoyero[i].innerText==titulo){
            alert("Se lo mucho que lo deseas... pero este producto ya esta en tu joyero");
            return;
        }
    }


    var itemJoyeroContenido = `
        <div class="joyero-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="joyero-item-detalles">
                <span class="joyero-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="joyero-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="joyero-item-precio">${precio}</span>
                <span>Cada joya</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemJoyeroContenido;
    itemsJoyero.append(item);

    //funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemJoyero);

    //funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalJoyero();
}
exports.agregarItemAlJoyero = agregarItemAlJoyero;
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('joyero-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('joyero-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('joyero-item-cantidad')[0].value = cantidadActual;
    actualizarTotalJoyero();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('joyero-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('joyero-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('joyero-item-cantidad')[0].value = cantidadActual;
        actualizarTotalJoyero();
    }
}

//Elimino el item seleccionado del Joyero
function eliminarItemJoyero(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del Joyero
    actualizarTotalJoyero();

    //la siguiente funciòn controla si hay elementos en el Joyero
    //Si no hay elimino el Joyero
    ocultarJoyero();
}
//Funciòn que controla si hay elementos en el Joyero. Si no hay oculto el Joyero.
function ocultarJoyero(){
    var joyeroItems = document.getElementsByClassName('joyero-items')[0];
    if(joyeroItems.childElementCount==0){
        var joyero = document.getElementsByClassName('joyero')[0];
        joyero.style.marginRight = '-100%';
        joyero.style.opacity = '0';
        joyeroVisible = false;
    
        var items =document.getElementsByClassName('grilla-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Joyero
function actualizarTotalJoyero(){
    //seleccionamos el contenedor Joyero
    var joyeroContenedor = document.getElementsByClassName('joyero')[0];
    var joyeroItems = joyeroContenedor.getElementsByClassName('joyero-item');
    var total = 0;
    //recorremos cada elemento del Joyero para actualizar el total
    for(var i=0; i< joyeroItems.length;i++){
        var item = joyeroItems[i];
        var precioElemento = item.getElementsByClassName('joyero-item-precio')[0];
        var precio = parseFloat(precioElemento.innerText.replace('.','').replace('$',''));
        var cantidadItem = item.getElementsByClassName('joyero-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;
    document.getElementsByClassName('joyero-precio-total')[0].innerText = '$'+ total.toLocaleString("es");
}
