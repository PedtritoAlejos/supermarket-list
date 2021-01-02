const User = require("../models/user");
const {
    errorHandler
} = require("../helpers/dbErrorHandler");

// middlewares rest 

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                rc: -10,
                msg: "Usuario no encontrado",
                data: []
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
                rc: -10,
                msg: errorHandler(err),
                data: []
            });
        }
        res.json({
            rc: 0,
            msg: 'actualización realizada',
            data: [data.toJson()]
        });
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
            rc: 0,
            msg: 'Usuario eliminada',
            data: [data.toJson()]

        });
    });
};



/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;


    User.find()
        .select("")
        .sort([
            [sortBy, order]
        ])
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    rc:-10,
                    msg:'Usuario no encontrado',
                   data:[]
                });
            }
            res.json({rc:0,msg:'listado',data:[users]});
        });
};