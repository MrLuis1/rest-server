const { request, response } = require("express")


const adminRole = (req = request, res = response, next) => {
    if( !req.user ) return res.status(500).json({msg: 'Se quiere verificar el role sin validar el token primero'});
    
    const { role, nombre } = req.user
    if( role !== 'ADMIN_ROLE' ) return res.status(401).json({msg: `El usuario ${nombre} no es administrador`})

    next();

}

const haveRole = ( ...roles ) => {
    return (req, res = response, next) => {
        console.log(roles);
        console.log(req.user.role)

        if( !req.user ) return res.status(500).json({msg: 'Se quiere verificar el role sin validar el token primero'});
        if( !roles.includes( req.user.role ) )  return res.status(401).json({msg: `El servicio requiere uno de los siguientes roles ${ roles }`})

        next();
    }
}

module.exports = {
    adminRole,
    haveRole
}