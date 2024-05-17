//const { hash } = require("bcrypt");
const { connect } = require("../routes/login");
const bcrypt = require("bcrypt");

function login(req, res){
    if(req.session.loggedin != true){
        res.render('login/index');
    }else{
        res.redirect('/');
    }
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
                } else {
                    req.session.loggedin = true;
                    req.session.name = element.nombreUsuario;
                    res.redirect('/');
                }
                console.log(element.nombreUsuario);
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
    register,
    storeUser,
    auth,
    logout,
}