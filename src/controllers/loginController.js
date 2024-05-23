//const { hash } = require("bcrypt");
const { connect } = require("../routes/login");
const bcrypt = require("bcrypt");
const productos = {};
const clientes = {};
const administradores = {};

clientes.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes', (err, clientes) => {
            if (err) {
                res.json(err);
            }
            res.render('clientes', {
                data: clientes
                });
            });
        });
    }

administradores.list = (req, res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM administradores', (err, administradores) => {
                if (err) {
                    res.json(err);
                }
                res.render('administradores', {
                    data: administradores
                    });
                });
            });
        }
    
        
function guardarProductos(req, res){
    const data = req.body;
            req.getConnection((err, conn) => {
                conn.query('INSERT INTO productos set ?', [data], (err, productos) => {
                    res.redirect('/productos')
                    });
                });
            }
        
productos.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos', (err, productos) => {
            if (err) {
                res.json(err);
            }
            res.render('productos', {
                data: productos
                
                });
            });
        });
    }

productos.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    req.getConnection((err, conn) => {
    conn.query('DELETE FROM productos WHERE idproductos = ?', [id], (err, productos) => {
        res.redirect('/productos')
    });
});
}

productos.edit = (req, res) =>{
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos WHERE idproductos = ?', [id], (err, productos) => {
            console.log(productos)
            res.render('editarProductos', {
                data: productos[0]
                    
            });
        });
    });
}    

function update (req, res) {
    const id = req.params.id;
    const newProducto = req.body
    req.getConnection((err, conn) => {
        conn.query('UPDATE productos set ? WHERE idproductos = ?', [newProducto, id], (err, productos) => {
            
            res.redirect('/productos')   
        });
    });
}

    function loginAdmin(req, res){
        if(req.session.loggedin != true){
            res.render('login/indexAdmin');
        }else{
            res.redirect('/');
        }
    }


function login(req, res){
    if(req.session.loggedin != true){
        res.render('login/index');
    }else{
        res.redirect('/');
    }
}

function authAdmin(req, res){
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM administradores where user = ?', [data.user], (err,userdata) => {
            if(userdata.length > 0) {
                userdata.forEach(element => {
                        if(data.password == element.password){
                            req.session.loggedin = true;
                            req.session.name = 'Administrador';
                            res.redirect('/');
                        }else{
                            res.render('login/indexAdmin', {error: 'Pass Admin incorrecta '});        
                        }    
                });
            }else{
                res.render('login/indexAdmin', {error: 'Administrador no encontrado'});    
            }
        });
    });
}



function auth(req, res){
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes where user = ?', [data.user], (err,userdata) => {
            if(userdata.length > 0) {
                userdata.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) => {
                        if(!isMatch){
                            res.render('login/index', {error: 'Ayudamos a proteger tus compras... Contraseña incorreta'});
                        }else{
                            req.session.loggedin = true;
                            req.session.name = element.nombreUsuario;
                            res.redirect('/');        
                        }    
                    });
                });
            }else{
                res.render('login/index', {error: 'Usuario no encontrado'});    
            }
        });
    });
}

function register(req, res){
    if(req.session.loggedin != true){
        res.render('login/register');
    }else{
        res.redirect('/');
    }
}

function storeUser(req, res){
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes where user = ?', [data.user], (err,userdata) => {
            if(userdata.length > 0) {
                res.render('login/register', {error: 'Usuario ya estaba registrado como parte de la gente con estilo...'});
            }else{
                  bcrypt.hash(data.password, 8).then(hash => {
                  data.password = hash;
                  req.getConnection((err,conn) => {
                  conn.query('INSERT INTO clientes SET ?', [data], (err, rows) => {
                    req.session.loggedin = true;
                    req.session.name = data.name;
                  res.redirect('/');
                  });
                  });
               });
            }
        });
    });
}

function logout(req, res){
    if(req.session.loggedin == true){
        req.session.destroy();
    }else{
        res.redirect('/login');
    }
}
    
module.exports = {
    login,
    loginAdmin,
    register,
    storeUser,
    auth,
    authAdmin,
    logout,
    guardarProductos,
    update,
    productos,
    clientes,
    administradores
}