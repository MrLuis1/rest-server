const { Router } = require('express');
const { uploadFile, updateFile, showImage } = require('../controllers/uploads');
const { check } = require('express-validator');
const { validarCampos, haveFile } = require('../middlewares/index');
const { verificarCategoria } = require('../helpers');


const router = new Router();

router.post('/', haveFile, uploadFile);

router.put('/:coleccion/:id', [
    check('id', 'el id ingresado no es un id mongo valido').isMongoId(),
    check('coleccion').custom( c => verificarCategoria( c, ['Usuario', 'Producto'] )),
    haveFile,
    validarCampos
], updateFile);

router.get('/:coleccion/:id', [
    check('id', 'el id ingresado no es un id mongo valido').isMongoId(),
    check('coleccion').custom( c => verificarCategoria( c, ['Usuario', 'Producto'] )),
    validarCampos
], showImage);

module.exports = router;