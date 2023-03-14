const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    // ! Validar si existe un token
    if( !token ) return res.status(401).json({msg: 'Token requerido'});

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
        const usuarioAuth = await Usuario.findById( uid );
        
        if( !usuarioAuth ) return res.status(401).json({msg: 'El registro no existe en DB'});
        if( !usuarioAuth.estado ) return res.status(401).json({msg: 'El registro ya se encuentra inactivo'});
        
        req.user = usuarioAuth
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({msg: 'El token no es valido'})
    }
}

module.exports = {
    validarJWT
}