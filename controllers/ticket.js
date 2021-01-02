const Ticket = require("../models/ticket");
const {
    errorHandler
} = require("../helpers/dbErrorHandler");


// middlewares rest

exports.ticketById = (req, res, next, id) => {
    Ticket.findById(id).exec((err, ticketDB) => {
        if (err || !ticketDB) {
            return res.status(404).json({
                rc: 0,
                msg: "Ticket no existe.",
                data: []
            });
        }
        req.ticket = ticketDB;
        next();
    });
};

exports.create = (req, res) => {
    const ticket = new Ticket(req.body);
    ticket.user = req.profile;
    ticket.save((err, ticket) => {
        if (err) {
            return res.status(400).json({
                rc: -10,
                msg: errorHandler(err),
                data: []
            });
        }
        res.json({
            rc: 0,
            msg: 'Ticket creado.',
            data: [ticket]
        });
    });
};

exports.read = (req, res) => {
    return res.json(req.ticket);
};

exports.update = (req, res) => {
    const ticket = req.ticket;

    ticket.user = req.profile;
    ticket.name = req.body.name;
    ticket.description = req.body.description,
        ticket.products = req.body.products
    ticket.save((err, data) => {
        if (err) {
            return res.status(400).json({
                rc: -10,
                msg: errorHandler(err),
                data: []
            });
        }
        res.json({
            rc: 0,
            msg: 'Ticket actualizado',
            data: [data]
        });
    });
};

exports.remove = (req, res) => {
    const ticket = req.ticket;
    ticket.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                rc: -10,
                msg: errorHandler(err),
                data: []
            });
        }
        res.json({
            rc: 0,
            msg: "Ticket eliminado",
            data: [data]
        });
    });
};

exports.list = (req, res) => {
    const filter = (req.profile.role == 0) ? {
        user: req.profile
    } : {};
    Ticket.find(filter)
        .populate("user")
        .exec((err, data) => {
            if (err) {
                return res.status.json({
                    rc: -10,
                    msg: errorHandler(err),
                    data: []
                });
            }
            res.json({
                rc: 0,
                msg: 'Listado ok',
                data: [data]
            });
        });
};