const { agregarItemAlJoyero, hacerVisibleJoyero } = require("./joyero");

//Funcion controla el boton clickeado de agregar al Joyero - preuba ok
function agregarAlJoyeroClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    agregarItemAlJoyero(titulo, precio, imagenSrc);

    let mysql = require("mysql");

    let conexion = mysql.createConnection({
        host: "localhost",
        database: "jadejoyeria",
        user: "root",
        password: "2374"
    });

    conexion.connect(function (err) {
        if (err) {
            throw error;
        } else {
            console.log("Conectado a la base de datos");
        }
    });

    conexion.query('INSERT INTO tmpventas (', cantidad, ', ', precio, ', ', titulo, ') values (', 1, ', ', 5000, ',', ADRIANA, ')');
    hacerVisibleJoyero();
}
exports.agregarAlJoyeroClicked = agregarAlJoyeroClicked;
