const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Conectado a la BBDD')

    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar con la BBDD')
    }

}

module.exports = {
    dbConnection
}