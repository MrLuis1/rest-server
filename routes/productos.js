const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT,
        adminRole} = require('../middlewares/index');

const { idProductoExiste } = require('../helpers/db-validators');
const { createProducto, getProduct, getProductID, updateProduct, deleteProduct } = require('../controllers/productos');

const router = Router();

// ! Obtener todas las categorias - cualquier persona
router.get('/', getProduct);

// ! Obtener categoria por id - cualquier persona
router.get('/:id', [
  check('id', 'El ID ingresado no es valido').isMongoId(),
  check('id').custom( idProductoExiste ),
  validarCampos
], getProductID);

// ! Crear categoria - cualquier persona con token valido
router.post('/', [
  validarJWT,
  adminRole,
  check('nombre', 'El nombre es un campo obligatorio').not().isEmpty(),
  check('precio', 'El precio debe ser un numero').isNumeric(),
  check('categoria', 'La categoria es requerida').not().isEmpty(),
  validarCampos
], createProducto);

// ! Actualizar categoria - cualquier persona con token valido
router.put('/:id', [
  validarJWT,
  adminRole,
  check('id', 'El ID ingresado no es valido').isMongoId(),
  check('id').custom( idProductoExiste ),
  validarCampos
], updateProduct);

// ! Borrar una categoria - cualquier persona con token valido
router.delete('/:id', [
  validarJWT,
  adminRole,
  check('id', 'El ID ingresado no es valido').isMongoId(),
  check('id').custom( idProductoExiste ),
  validarCampos
], deleteProduct);

module.exports = router



