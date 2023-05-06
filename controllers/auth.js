const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
    const { correo, password } = req.body
    try {
        // ! Verificar si el email exite
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json({msg: 'El correo ingresado no es valido'});
        } 

        // ! Verificar si el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({msg: 'El usuario que intenta ingresar ya no esta activo'});
        }

        // ! Verificar la contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status(400).json({msg: 'La contraseña ingresada no es valida'});
        }

        // TODO: Generar JWT
        const token = await generateJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({msg: "Error en el controlador"});

    }

}

module.exports = {
    login
}