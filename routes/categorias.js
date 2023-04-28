const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT,
        adminRole} = require('../middlewares/index');
        
const { crearCategoria,
        getCategoriaId,
        actualizarCategoria,
        borrarCategoria,
        getAllCategorias } = require('../controllers/categorias');

const { idCategoriaExiste } = require('../helpers/db-validators');

const router = Router();

// ! Obtener todas las categorias - cualquier persona
router.get('/', [
  check('limit', 'El Limite ingresado no es numerico').not().isNumeric(),
  check('from', 'El From ingresado no es numerico').not().isNumeric(),
], getAllCategorias);

// ! Obtener categoria por id - cualquier persona
router.get('/:id', [ 
  check('id', 'El id ingresado no es valido').isMongoId(),
  check('id').custom( idCategoriaExiste ),
  validarCampos
], getCategoriaId);

// ! Crear categoria - cualquier persona con token valido
router.post('/', [ 
  validarJWT,
  check('nombre', 'El nombre es un campo requerido').not().isEmpty(),
  validarCampos
], crearCategoria);

// ! Actualizar categoria - cualquier persona con token valido
router.put('/:id',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id').custom( idCategoriaExiste )  ,
  validarCampos
], actualizarCategoria);

// ! Borrar una categoria - cualquier persona con token valido

router.delete('/:id',[
  validarJWT,
  adminRole,
  check('id', 'El id ingresado no es valido').isMongoId(),
  check('id').custom( idCategoriaExiste )  ,
  validarCampos
], borrarCategoria);

module.exports = router
