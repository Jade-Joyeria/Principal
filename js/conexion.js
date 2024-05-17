let mysql = require("mysql");

let conexion = mysql.createConnection({
    host: "localhost",
    database: "jadejoyeria",
    user: "root",
    password: "2374"
});

conexion.connect(function(err){
    if(err){
        throw error;
}else{
    console.log("Conectado a la base de datos");
}
});

conexion.end();