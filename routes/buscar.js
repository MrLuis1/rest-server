const { Router } = require('express');
const { check } = require('express-validator');
const { anyQuery } = require('../controllers/buscar');

const router = Router();

router.get('/:coleccion/:termino', anyQuery)

module.exports = router;