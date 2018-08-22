var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Esquema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var validateTel = function(telefono) {
    var re = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    return re.test(telefono)
};

var UsuarioEsquema = new Esquema({
    username: {
        type: String,
        lowercase: true,
        maxlength: 20,
        trim: true,
        tags: { type: [String], index: true },
        required: [true, 'username es necesario'],
        unique: true
    },
    password: {
        type: String
        //required: [true, 'La contraseña es necesaria !!!']
    },
    nombre: {
        type: String,
        maxlength: 50,
        trim: true,
        lowercase: true,
    },
    primerapellido: {
        type: String,
        maxlength: 50,
        trim: true,
        lowercase: true,
        unique: true,
        tags: { type: [String], index: true },
    },
    segundoapellido: {
        type: String,
        maxlength: 50,
        trim: true,
        lowercase: true,
        unique: true,
        tags: { type: [String], index: true },
    },
    correo: {
        type: String,
        maxlength: 50,
        trim: true,
        lowercase: true,
        //unique: true,
        //required: [true, 'La dirección de Correo es necesaria !!'],
        //validate: [validateEmail, 'Por favor complete con una dirección de correo válida'],
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor complete con una dirección de correo válida'],
        //tags: { type: [String], index: true }
    },
    telcontacto: {
        type: String,
        maxlength: 50,
        trim: true,
        lowercase: true,
        unique: true,
        // validate: [validateTel, 'Por favor complete con un Nùmero de Telèfono vàlido'],
        // match: [/^[2-9]\d{2}[2-9]\d{2}\d{4}$/, 'Por favor complete con un Nùmero de Telèfono vàlido']
    },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    admin: {
        type: Boolean,
        default: false
    },
    facebookId: String
});
UsuarioEsquema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Usuario', UsuarioEsquema);