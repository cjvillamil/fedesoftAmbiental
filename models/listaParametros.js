var mongoose = require('mongoose');
var Esquema = mongoose.Schema;
var listaParametros = new Esquema({
    // _id:{
    //     type:Number,
    //     required:true,
    // },
    nombreLista: {
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:true
    },
    valor:{
        type: String,
        unique: true
    }
});
listaParametros.index({nombreLista:1, valor:1},{unique: true});

module.exports = mongoose.model('ListaParametros',listaParametros);