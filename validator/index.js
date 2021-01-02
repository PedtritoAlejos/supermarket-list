exports.validaRegistro = (req, res, next) => {
    req.check("name", "Nombre es requerido").notEmpty();
    req.check("email", "Email debe contener entre 3 a 32 caracteres")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password es requerida").notEmpty();
    req.check("password")
        .isLength({
            min: 6
        })
        .withMessage("Password debe tener un mínimo de 6 caracteres")
        .matches(/\d/)
        .withMessage("Password debe contener un número");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            rc: -10,
            msg: firstError,
            data: []
        });
    }
    next();
};

exports.validaLogin = (req, res, next) => {
    req.check("email", "Email es requerido").notEmpty();
    req.check("email", "Email debe contener entre 3 a 32 caracteres")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password es requerida").notEmpty();
    req.check("password")
        .isLength({
            min: 6
        })
        .withMessage("Password debe tener un mínimo de 6 caracteres")
        .matches(/\d/)
        .withMessage("Password debe contener un número");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            rc: -10,
            msg: firstError,
            data: []
        });
    }
    next();
};
exports.validaCategory = (req, res, next) => {
    req.check("name", "Nombre es requerido").notEmpty();
    req.check("name", "Nombre debe contener entre 3 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            rc: -10,
            msg: firstError,
            data: []
        });
    }
    next();
};
exports.validaCategory = (req, res, next) => {
    req.check("name", "Nombre es requerido").notEmpty();
    req.check("name", "Nombre debe contener entre 3 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            rc: -10,
            msg: firstError,
            data: []
        });
    }
    next();
};
exports.validaUserUpdate = (req, res, next) => {
    req.check("name", "Nombre es requerido").notEmpty();
    req.check("name", "Nombre debe contener entre 3 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("email", "Email es requerido").notEmpty();
    req.check("email", "Email debe contener entre 3 a 32 caracteres")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });

    req.check("avatar", "Avatar es requerido").notEmpty();
    req.check("avatar", "Avatar debe contener entre 3 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });

    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            rc: -10,
            msg: firstError,
            data: []
        });
    }
    next();
};
exports.validaTicket = (req, res, next) => {
    req.check("name", "Nombre es requerido").notEmpty();
    req.check("name", "Nombre debe contener entre 3 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });
   

    req.check("description", "Descripción es requerido").notEmpty();
    req.check("description", "Descripción debe contener entre 3 a 60 caracteres")
        .isLength({
            min: 3,
            max: 60
        });
    
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            rc: -10,
            msg: firstError,
            data: []
        });
    }
    next();
};
exports.validaProducto = (req, res, next) => {
    req.check("name", "Nombre es requerido").notEmpty();
    req.check("name", "Nombre debe contener entre 3 a 32 caracteres")
        .isLength({
            min: 4,
            max: 32
        });
   

    req.check("description", "Descripción es requerido").notEmpty();
    req.check("description", "Descripción debe contener entre 3 a 60 caracteres")
        .isLength({
            min: 3,
            max: 60
        });
    req.check("quantity", "Cantidad es requerido").notEmpty();
    req.check("format", "Formato es requerido").notEmpty();
    req.check("unit", "Unidad es requerido").notEmpty();
    req.check("category", "Categoría es requerido").notEmpty();
    req.check("format", "Formato debe contener  caracteres")
        .isLength({
            min: 1,
            max: 6
        });
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            rc: -10,
            msg: firstError,
            data: []
        });
    }
    next();
};
exports.isJsonValidRequest = (error, req, res, next) => {

    if (error instanceof SyntaxError) {
        return res.status(500).json({
            rc: -10,
            msg: error.message,
            data: [error]
        });
    }
    next();

}