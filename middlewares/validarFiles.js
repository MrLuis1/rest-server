const { request, response } = require("express");


const haveFile = ( req = request, res = response, next ) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) return res.status(400).json({msj: 'No se cargo ningun archivo.'});
    
    next();
}

module.exports = {
    haveFile
}