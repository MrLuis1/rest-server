const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { RoleValidator, EmailValidator, idValidatorAdmin } = require('../helpers/db-validators');

const { adminGet, 
        adminPost, 
        adminPut, 
        adminDelete } = require('../controllers/admin');

        const router = Router();


router.get('/', [
        check('limit', 'Ingrese un numero valido').not().isNumeric(),
        check('from', 'Ingrese un numero valido').not().isNumeric(),
        validarCampos
], adminGet);

router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('password', 'La contraseña es requerida, minimo 6 carácteres').isLength({min: 6}),
        check('correo', 'El correo es requerido').isEmail(),
        check("correo").custom( EmailValidator ),
        check('role').custom( RoleValidator ),
        validarCampos
], adminPost)        

router.put('/:id', [
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom( idValidatorAdmin ),
        validarCampos
], adminPut);

router.delete('/', adminDelete)  

module.exports = router