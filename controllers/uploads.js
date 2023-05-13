const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const { request, response } = require('express');
const { Usuario, Producto } = require('../models');
const { uploadHelperFile } = require('../helpers');


const uploadFile = async (req = request, res = response) => {
  try {

    const nameFile = await uploadHelperFile(req.files, 'imgs');
    return res.status(200).json( {nameFile} );

  } catch ( msg ) {
    return res.status( 400 ).json({ msg });
  }
}

const updateFile = async ( req = request, res = response ) => {
  const { id, coleccion } = req.params;
  let modelo;
  
  switch ( coleccion ) {
    case 'Usuario':
      modelo = await Usuario.findById( id );
      if( !modelo ) return res.status(400).json({msg: 'No se logro encontrar ningun usuario con el id ingresado'});
    break;

    case 'Producto':
      modelo = await Producto.findById( id );
      if( !modelo ) return res.status(400).json({msg: 'No se logro encontrar ningun producto con el id ingresado'});
    break;
  
    default:
      return res.status(500).json({msg: 'La coleccion ingresada no existe o no esta contemplada'});
  }
  
  if( modelo.img ) {
    // TODO limpieza de servidor
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [ public_id ] = nombre.split('.');

    await cloudinary.uploader.destroy( public_id )
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath )
  modelo.img = secure_url
  modelo.save();

  return res.status(200).json({ modelo });
}

const showImage = async ( req = request, res = response ) => {
  const { id, coleccion } = req.params;
  let modelo;
  
  switch ( coleccion ) {
    case 'Usuario':
      modelo = await Usuario.findById( id );
      if( !modelo ) return res.status(400).json({msg: 'No se logro encontrar ningun usuario con el id ingresado'});
    break;

    case 'Producto':
      modelo = await Producto.findById( id );
      if( !modelo ) return res.status(400).json({msg: 'No se logro encontrar ningun producto con el id ingresado'});
    break;
  
    default: return res.status(500).json({msg: 'La coleccion ingresada no existe o no esta contemplada'});
  }
  
  if( modelo.img ) {
    const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img);
    if( fs.existsSync( pathImg ) ) return res.sendFile(pathImg);
  }
  return res.status(200).json({ imageExist: false });
}

module.exports = {
  uploadFile,
  updateFile,
  showImage
}