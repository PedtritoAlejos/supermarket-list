const Ticket = require("../models/ticket");



// middlewares rest

exports.ticketById = (req, res, next, id) => {
    Ticket.findById(id).exec((err, ticketDB) => {
        if (err || !ticketDB) {
            return res.status(404).json({
                error: "Ticket no existe."
            });
        }
        req.ticket = ticketDB;
        next();
    });
};

exports.create = (req, res) => {
    const ticket = new Ticket(req.body);
    ticket.save((err, ticket) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json( { rc:0,msg:'Ticket creado.',data:[ticket] });
    });
};

exports.read = (req, res) => {
    return res.json(req.ticket);
};

exports.update = (req, res) => {
    const ticket = req.ticket;

    ticket.name = req.body.name;
    ticket.description= req.body.description,
    ticket.products = req.body.products
    ticket.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            rc:0,
            msg:'Ticket actualizado',
            data:[data]
        });
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
            rc:0,
            msg: "Ticket eliminado",
            data:[data]
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