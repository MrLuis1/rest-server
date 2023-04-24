const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT } = require('../middlewares/index');

const router = Router();

// ! Obtener todas las categorias - cualquier persona
router.get('/', (req, res) => {
  res.json({msg: 'todo bien - get'})
});

// ! Obtener categoria por id - cualquier persona
router.get('/:id', (req, res) => {
  res.json({msg: 'todo bien - get - id'})
});

// ! Crear categoria - cualquier persona con token valido
router.post('/', [ validarJWT ], (req, res) => {
  res.json({msg: 'todo bien - post'})
});

// ! Actualizar categoria - cualquier persona con token valido
router.put('/:id', (req, res) => {
  res.json({msg: 'todo bien - put'})
});

// ! Borrar una categoria - cualquier persona con token valido

router.delete('/:id', (req, res) => {
  res.json({msg: 'todo bien - delete'})
});

module.exports = router
