const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, haveRole } = require('../middlewares/index');

const { RoleValidator, EmailValidator, idValidatorUsuario } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/',[
    check('limit', 'Ingrese un numero valido').not().isNumeric(),
    check('from', 'Ingrese un numero valido').not().isNumeric(),
], usuariosGet);

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
    check('role').custom( RoleValidator ),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    validarJWT,
    // adminRole,
    haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idValidatorUsuario ), 
    validarCampos
], usuariosDelete);  

module.exports = router