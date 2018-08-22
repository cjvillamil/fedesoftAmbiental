var mongoose = require('mongoose');
var Esquema = mongoose.Schema;

var commentSchema = new Esquema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' /// Aqui debemos modificar por nuestro modelo de usuarios 
    }
}, {
    timestamps: true
});


var loc = new Esquema({
    longitud: {
        type: Number,
    },
    latitud: Number
});
var esquemaPuntoReciclaje = new Esquema({
    nombrePunto: {
        type: String,
        required: true
    },
    coordenadas: {
        type: loc,
        unique: true
    },
    tipoReciclaje: String,
    comentarios: [commentSchema]
});

module.exports = mongoose.model('PuntoReciclaje', esquemaPuntoReciclaje);