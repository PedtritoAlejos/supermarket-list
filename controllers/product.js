const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const {
    errorHandler
} = require("../helpers/dbErrorHandler");


// middlewares rest 

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    rc: -10,
                    msg: 'Producto no encontrado',
                    data: []
                });
            }
            req.product = product;
            next();
        });
};
exports.read = (req, res) => {
    return res.json(req.product);
};

exports.create = (req, res) => {
    const product = new Product(req.body);
    product.user = req.profile;
    product.save((err, productDB) => {
        if (err || !productDB) {
            return res.status(400).json({
                rc: -10,
                msg: errorHandler(err),
                data: []
            });
        }
        res.json({
            rc: 0,
            msg: "Producto creado",
            data: [productDB]
        });
    });

}
exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                rc: -10,
                msg: errorHandler(err),
                data: []
            });
        }
        res.json({
            rc: 0,
            msg: "Producto eliminado",
            data: [deletedProduct]
        });
    });
};

exports.update = (req, res) => {


    let product = req.product;
    product.name = req.body.name;
    product.description = req.body.description;
    product.quantity = req.body.quantity;
    product.format = req.body.format;
    product.unit = req.body.unit;
    product.category = req.body.category;

    product.save((err, result) => {
        if (err) {
            return res.status(400).json({
                rc: -10,
                msg: errorHandler(err),
                data: []
            });
        }

        res.json({
            rc: 0,
            msg: "Producto actualizado",
            data: [result]
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
    const filter = (req.profile.role == 0) ? {
        user: req.profile
    } : {};

    Product.find(filter)
        .select("")
        .populate("category")
        .sort([
            [sortBy, order]
        ])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    rc: -10,
                    msg: 'Producto no encontrado',
                    data: []
                });
            }
            res.json({
                rc: 0,
                msg: 'Listado ok',
                data: [products]
            });
        });
};