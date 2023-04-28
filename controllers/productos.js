const { request, response } = require("express");
const { Producto } = require('../models/index');

const getProduct = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.params;
  const query = {estado: true};

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
      .skip(from)
      .limit(limit)
  ])

  res.status(200).json({
    total,
    productos
  })
}

const getProductID = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Producto
    .findById( id )
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre')

  res.status(200).json( product )
}

const createProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body} = req.body;
  const { nombre } = body;

  const productExist = await Producto.findOne({ nombre });
  if(productExist) return res.status(400).json({msj: 'El producto que intenta crear ya existe en BD'});

  const data = {
    nombre: body.nombre.toUpperCase(),
    usuario: req.user._id,
    ...body
  }

  const productAdd = new Producto( data )
  await productAdd.save();
  res.status(201).json( productAdd )
}

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.user._id;

  console.log(data)

  const update = await Producto.findByIdAndUpdate(id, data, {new: true});
  res.status(201).json( update );
}

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params
  const productDelete = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})
  res.status(201).json( productDelete );
}

module.exports = {
  createProducto,
  getProduct,
  getProductID,
  updateProduct,
  deleteProduct
}