const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const {
    errorHandler
} = require("../helpers/dbErrorHandler");


exports.registrarse = (req, res) => {

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                rc:-10,
                msg:errorHandler(err),
                data: []
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        
        res.json({
            rc:0,
            msg:'Registro exitoso',
            data:[user]
        });
    });
};
exports.login = (req, res) => {
    const {
        email,
        password
    } = req.body;
    User.findOne({
        email
    }, (error, userDB) => {
        if (error || !userDB) {
            return res.status(400).json({
                rc: -10,
                msg: "No existe un usuario con ese email. Por favor registrarse.",
                data: []
            });
        }
        if (!userDB.authenticate(password)) {
            return res.status(401).json({
                rc: -10,
                msg: "Contraseña o email inválido.",
                data: []
            });
        }
        const token = jwt.sign({
            _id: userDB.id
        }, process.env.JWT_SECRET, {
            expiresIn: 30 * 24 * 360
        });
        res.cookie("t", token, {
            expire: new Date() + 30 * 24 * 3600
        });

        const {
            _id,
            name,
            email
        } = userDB;

        return res.json({
            rc: 0,
            msg: 'Login exitoso',
            data:[{
                token: token,
                user: {
                    _id: _id,
                    name: name,
                    email: email
                }
            }]
        });


    });

};
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            rc: -10,
            msg: 'Acceso denegado',
            data: []

        });
    }
    next();
};
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.cerrarSesion = (req, res) => {
    res.clearCookie("t");
    res.json({
        message: "Cerrar Sesisón con éxito."
    });
};
exports.isToken = (err, req, res, next) => {

    if (err.name === 'UnauthorizedError') {
        return res.status(403).json({
            rc: -10,
            msg: 'Token invalido',
            data: []

        });
    }
    next();
}
exports.userPropertyToken = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            rc: -10,
            msg: "Acceso denegado,solo el admin tiene acceso a este recurso",
            data: []
        });
    }
    next();
};