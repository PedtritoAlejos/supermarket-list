const Ticket = require("../models/ticket");



// middlewares rest

exports.ticketById = (req, res, next, id) => {
    Ticket.findById(id).exec((err, ticketDB) => {
        if (err || !ticketDB) {
            return res.status(404).json({
                error: "Categoría no existe."
            });
        }
        req.ticket = ticketDB;
        next();
    });
};

exports.create = (req, res) => {
    const ticket = new Ticket(req.body);
    ticket.save((err, ticketDB) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { ticketDB });
    });
};

exports.read = (req, res) => {
    return res.json(req.ticket);
};

exports.update = (req, res) => {
    const ticket = req.ticket;
    ticket.name = req.body.name;
    ticket.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const ticket = req.ticket;
    ticket.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Categoría eliminada",
            ticket:data
        });
    });
};

exports.list = (req, res) => {
    Ticket.find().exec((err, data) => {
        if (err) {
            return res.status.json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};