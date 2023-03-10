const { response } = require('express');
const bcrypt = require('bcryptjs');

const Admin = require('../models/admin');


const adminGet = (req, res = response) => {
    const { page = 1, limit = 10 } = req.query;
    res.status(200).json({
        msg: 'get API admin',
        page,
        limit
    });
}

const adminPost = async (req, res = response) => {
    const { nombre, correo, password, role } = req.body;
    const admin = new Admin({ nombre, correo, password, role });

    const salt = bcrypt.genSaltSync();
    admin.password = bcrypt.hashSync(password, salt);
    
    await admin.save();

    res.status(201).json({
        msg: 'post API admin',
        admin
    });
}

const adminPut = async (req, res) => {

    // TODO hacer update

    const { id } = req.params;
    const { password, google, correo, ...data} = req.body

    if( password ) {
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt)
    }

    const admin = await Admin.findByIdAndUpdate(id, data, {new: true})

    res.json({
        msg: 'put API admin',
        admin
    });
}

const adminDelete = (req, res) => {
    res.json({
        msg: 'delete API admin'
    });
}

module.exports = {
    adminGet,
    adminPost,
    adminPut,
    adminDelete
}