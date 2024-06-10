const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const P = require("pino");

function hasData(req, res, next) {
    if (req.body.data) {
        return next();
    }
    next({
        status: 400, 
        message: "Data missing from table."
    })
}

async function create(req, res, next) {
    const newTable = await service.create(req.body.data);
    res.status(201).json({ data: newTable })
}

module.exports = {
    create: asyncErrorBoundary(create),
}