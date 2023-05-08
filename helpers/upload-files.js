const path = require('path');
const { v4: uuidv4 } = require('uuid');
const defaultExt = ['png','jpg','jpeg', 'gif']

const uploadHelperFile = ( files, validateExt = defaultExt, folder = '' ) => {

  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const fileExt = archivo.name.split('.');
    const ext = fileExt[ fileExt.length -1 ];

    // ! Validaciones de las extensiones
    if( !validateExt.includes(ext) ) return reject('La extension del archivo ingresado no es admitida');

    const temporalName = `${uuidv4()}.${ext}` ;
    const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

    archivo.mv(uploadPath, (err) => {
      if (err) reject(err);
      resolve(temporalName);
    });
  })

}

module.exports = {
  uploadHelperFile
}