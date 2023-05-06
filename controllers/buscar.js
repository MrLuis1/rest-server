const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models/index")

const coleccionesPermitidas = [
  'categorias',
  'productos',
  'usuarios',
]

const buscarUsuarios = async ( termino, res = response ) => {
  const isMongoID = ObjectId.isValid( termino );

  if( isMongoID ) {
    const usuario = await Usuario.findById( termino );
    if( !usuario ) {
        return res.status(400).json({
        ok: false,
        msj: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      ok: true,
      results: [usuario]
    })
  }

  const regex = new RegExp( termino, 'i' )

  const usuario = await Usuario.find({
    $or: [{nombre: regex}, {correo: regex}],
    $and: [{estado: true}]
  });

  res.status(200).json({
    ok: true,
    results: usuario
  })
}

const buscarCategorias = async (termino, res = response) => {
  const isMongoID = ObjectId.isValid( termino );

  if( isMongoID ) {
    const categoria = await Categoria.findById( termino );
    return res.status(200).json({
      results: (categoria) ? [categoria] : []
    });
  };

  const regex = new RegExp( termino, 'i' );
  const categoria = await Categoria.find({nombre: regex, estado: true})

  res.status(200).json({
    results: [categoria]
  })
}

const buscarProductos = async (termino, res = response) => {
  const isMongoID = ObjectId.isValid( termino );

  if( isMongoID ) {
    const producto = await Producto
      .findById( termino )
      .populate('categoria', 'nombre');
    return res.status(200).json({
      results: (producto) ? [ producto ] : []
   })
  }

  const regex = new RegExp(termino, 'i');
  const producto = await Producto
    .find({nombre: regex, estado: true})
    .populate('categoria', 'nombre');
  res.status(200).json({
    results: [producto]
  })
}

const anyQuery = (req = request, res = response) => {

  const { coleccion, termino } = req.params;
  
  if( !coleccionesPermitidas.includes( coleccion ) ) {
    return res.status(400).json({
      msj: 'Las colecciones permitidas son:', 
      coleccionesPermitidas
    })
  }

  switch (coleccion) {
    case 'categorias':
      buscarCategorias(termino, res);
    break;
    case 'productos':
      buscarProductos(termino, res);
    break;
    case 'usuarios':
      buscarUsuarios(termino, res);
    break;
    default:
      res.status(500).json({
        msj: 'La busqueda no funciona, indicar al backend'
      })
  }
}

module.exports = {
  anyQuery
}