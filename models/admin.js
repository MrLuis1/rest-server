const { Schema, model } = require('mongoose');

const AdminSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'El rol es requerido'],
        enum: ['ADMIN_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
})

AdminSchema.methods.toJSON = function() {
    const { __v, google, password, ...admin } = this.toObject();
    return admin
}

module.exports = model('Admin', AdminSchema)
