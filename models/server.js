const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            categorias: '/api/categorias',
            anyQuery: '/api/any-query',
            upload: '/api/upload'
        }

        // ! Conectar a DB
        this.conectarDB();

        // ! Middlewares
        this.middlewares();

        // !Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    };

    middlewares() {

        // CORS
        this.app.use(cors());

        // Parseo a JSON
        this.app.use(express.json());
        
        // Directorio publico
        this.app.use(express.static('public'));

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
        
    };

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.usuarios , require('../routes/usuarios'));
        this.app.use(this.path.productos, require('../routes/productos'));
        this.app.use(this.path.categorias, require('../routes/categorias'));
        this.app.use(this.path.anyQuery, require('../routes/buscar'));
        this.app.use(this.path.upload, require('../routes/uploads'));
    };

    startServer() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        })
    };
}

module.exports = Server 