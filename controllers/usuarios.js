const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const { Usuario } = require('../models/index');

const usuariosGet = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(from)
            .limit(limit)
    ])

    res.status(200).json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const { empresa, nombre, correo, password, role } = req.body;
    const usuario = new Usuario({empresa, nombre, correo, password, role});

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        ok: true,
        results: [usuario]
    });
}

const usuariosPut = async (req, res = response) => { 
    const { id } = req.params;
    const { _id, password, google, correo, ...data } = req.body;

    if( password ) {
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true});
    res.json(usuario);
}

const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params

    const user = await Usuario.findByIdAndUpdate( id ,{estado: false} , {new: true})


    res.json({
        msg: 'El siguiente usuario fue borrado',
        user
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}