const { request, response } = require("express")


const adminRole = (req = request, res = response, next) => {
    if( !req.user ) return res.status(500).json({msg: 'Se quiere verificar el role sin validar el token primero'});
    
    const { role, nombre } = req.user
    if( role !== 'ADMIN_ROLE' ) return res.status(401).json({msg: `El usuario ${nombre} no es administrador`})

    next();

}

module.exports = {
    adminRole
}