const Category = require("../models/category");
const {
    errorHandler
} = require("../helpers/dbErrorHandler");

// middlewares rest

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(404).json({
                rc: -10,
                msg: "Categoría no existe.",
                data: []
            });
        }
        req.category = category;
        next();
    });
};

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                rc: -10,
                msg: errorHandler(err),
                data: []
            });
        }
        res.json({
            rc: 0,
            msg: 'Categoría creada',
            data: [data]
        });
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            rc: 0,
            msg: 'Categoría eliminada',
            data: []

        });
    });
};

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};