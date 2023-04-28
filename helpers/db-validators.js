
const { Categoria, Producto } = require('../models');
const Role = require('../models/role')
const Usuario = require('../models/usuario');

const RoleValidator = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol) throw new Error(`El rol ${role} que se ingreso no es valido o no existe en la BD`);
}

const EmailValidator = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) throw new Error(`El correo ${correo} que se ingreso ya existe en la BD`);
} 

const idValidatorUsuario = async ( id ) => {
    const existeId = await Usuario.findById(id);
    if(!existeId) throw new Error(`El id ${id} que se ingreso no existe en la BD`);
}

const idCategoriaExiste = async ( id ) => {
    const exist = await Categoria.findById(id);
    if(!exist) throw new Error(`El id ${id} que se ingreso no existe en la BD`);
}

const idProductoExiste = async ( id ) => {
    const exist = await Producto.findById(id);
    if(!exist) throw new Error(`El id ${id} que se ingreso no existe en la BD`);
}


module.exports = {
    RoleValidator,
    EmailValidator,
    idValidatorUsuario,
    idCategoriaExiste,
    idProductoExiste
}