const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const haveRole = require('../middlewares/validar-roles');
const haveFile = require('./validarFiles');

module.exports = {
  ...validarJWT,
  ...haveRole,
  ...haveFile,
  ...validarCampos,
}