const { response } = require('express');

const userGet = (req, res = response) => {
    const {id, pais} = req.query
    res.json({
        msg: 'get API - controller',
        id,
        pais
    })
}

const postUser = (req, res) => {
    const body = req.body;
    res.status(201).json({
        user: body
    })
}

const putUser = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - controller',
        id
    })
}

const deleteUser = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    })
}

module.exports = {
    userGet,
    postUser,
    putUser,
    deleteUser
}