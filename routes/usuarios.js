const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { RoleValidator, EmailValidator, idValidatorUsuario } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check("nombre", 'El nombre es obligatorio').not().isEmpty(),
    check("password", 'La password es obligatorio y mas de 6 letras').isLength({min: 6}),
    check("correo", 'El correo no es valido').isEmail(),
    check("correo").custom( EmailValidator ),
    check('role').custom( RoleValidator ),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idValidatorUsuario ), 
    validarCampos
], usuariosPut);

router.delete('/', usuariosDelete);  

module.exports = router