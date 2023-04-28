const { request, response } = require("express");
const { Categoria } = require("../models/index");

const getAllCategorias = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { estado: true };

  const [ total, categorias ] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(from)
      .limit(limit)
  ])

  res.status(200).json({
    total,
    categorias
  })

}

const getCategoriaId = async ( req = request, res = response ) => {
  const { id } = req.params;
  const categoriaDB = await Categoria
    .findById( id )
    .populate('usuario', 'nombre');

  res.status(200).json(categoriaDB)
}

const crearCategoria = async ( req = request, res = response) => {

  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre })
  if( categoriaDB ) return res.status(400).json({ msj: `La categoria ${ nombre } ya existe, ingrese una nueva` });

  const data = {
    nombre,
    usuario: req.user._id
  }

  const categoria = new Categoria( data );
  await categoria.save();
  res.status(201).json( categoria )

}

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.user._id;
  const updateDB = await Categoria.findByIdAndUpdate(id, data, {new: true});
  
  res.status(201).json(updateDB)
}

const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const deleteCategoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
  res.status(201).json(deleteCategoria)
}

module.exports = {
  getAllCategorias,
  getCategoriaId,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria
}