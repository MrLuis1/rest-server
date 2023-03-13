const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

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

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json(usuario);
}

const usuariosPut = (req, res = response) => { 
    const { id } = req.params;
    const { _id, password, google, correo, ...data } = req.body;

    if( password ) {
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt)
    }

    const usuario = Usuario.findByIdAndUpdate(id, data, {new: true});
    res.json(usuario);
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params

    // ! Borrado permanente de BD
    // const user = await Usuario.findByIdAndDelete( id );

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