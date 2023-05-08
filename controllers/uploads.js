const { uploadHelperFile } = require('../helpers');

const uploadFile = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) return res.status(400).json({msj: 'No se cargo ningun archivo.'});

  const nameFile = await uploadHelperFile(req.files)
  res.status(200).json( {nameFile} )
}

module.exports = {
  uploadFile
}