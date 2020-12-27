const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest 

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Usuario no encontrado"
            });
        }
        req.profile = user;
        next();
    });
};
exports.read = (req, res) => {
    return res.json(req.profile.toJson());
};
exports.update = (req, res) => {
    const user = req.profile;
    user.name = req.body.name;
    user.email = req.body.email;
    user.avatar = req.body.avatar;
    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data.toJson());
    });
};
exports.remove = (req, res) => {
    const user = req.profile;
    user.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            rc:0,
            msg:'Usuario eliminada',
            data:[data.toJson()]
           
        });
    });
};



