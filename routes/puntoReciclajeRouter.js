const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

const puntoReciclajeRouter = express.Router();

var Authenticate = require('../authenticate')
var PuntoReciclaje = require('../models/puntoReciclaje');

puntoReciclajeRouter.use(bodyParser.json());

puntoReciclajeRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })


// .get(Authenticate.verifyUser, (req, res, next) => {
//         res.end('Este metodo retornara los puntos de recoleccion en la ciudad')
//     })

// .get((req,res,next) => {
//     res.end('Este metodo retornara los puntos de recoleccion en la ciudad');
// })
.get((req, res, next) => {
        PuntoReciclaje.find({})
            .populate('comments.author')
            .then((PuntosReciclaje) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(PuntosReciclaje);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        PuntoReciclaje.create(req.body)
            .then((PuntoReciclaje) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    id: PuntoReciclaje._id,
                    message: req.body.nombrePunto + ' Agregado Correctamente'
                });
            })
            .catch((err) => { next(err) })
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('el metodo PUT no es soportado en  /puntosRecoleccion');
    })
    .delete((req, res, next) => {
        res.end('Se han eliminado todos los puntos de la ciudad');
    });

puntoReciclajeRouter.route('/:lugarId')
    .get((req, res, next) => {
        PuntoReciclaje.findById(req.params.lugarId)
            .populate('comentarios.author')
            .then((PuntoReciclaje) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(PuntoReciclaje);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

puntoReciclajeRouter.route('/:lugarId/comments')
    .get((req, res, next) => {
        PuntoReciclaje.findById(req.params.lugarId)
            .populate('comentarios.author', 'username telcontacto')
            .then((PuntoReciclaje) => {
                if (PuntoReciclaje != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(PuntoReciclaje);
                } else {
                    err = new Error('Lo siento :(  ' + req.params.lugarId + ' NO existe');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

//Para la autenticaciòn, en la solicitud debe incluirse un header asi:
// Authorization   -> bearer + <token>  
.post(authenticate.verifyUser, (req, res, next) => {
    PuntoReciclaje.findById(req.params.lugarId)
        .then((PuntoReciclaje) => {
            if (PuntoReciclaje != null) {
                req.body.author = req.user._id;
                PuntoReciclaje.comentarios.push(req.body);
                PuntoReciclaje.save()
                    .then((PuntoReciclaje) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(PuntoReciclaje);
                    }, (err) => next(err));
            } else {
                err = new Error('Lo siento :( ' + req.params.lugarId + ' no existe');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})

puntoReciclajeRouter.route('/:lugarId/comments/:commentId')
    .get((req, res, next) => {
        PuntoReciclaje.findById(req.params.lugarId)
            .populate('comments.author')
            .then((PuntoReciclaje) => {
                if (PuntoReciclaje != null && PuntoReciclaje.comentarios.id(req.params.commentId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(PuntoReciclaje.comentarios.id(req.params.commentId));
                } else if (PuntoReciclaje == null) {
                    err = new Error('Lo siento :( este lugar  ' + req.params.lugarId + ' no existe');
                    err.status = 404;
                    return next(err);
                } else {
                    err = new Error('Lo siento :( no hay comentarios con id:  ' + req.params.commentId + ' ');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

puntoReciclajeRouter.route('/:puntoId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Punto de recolección: ' + req.params.puntoRecId);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('la operacion POST no es soportada en  /puntosRecoleccion/' + req.params.puntoRecId);
    })
    .put((req, res, next) => {
        res.write('Actualizando datos del  estudiante: ' + req.params.puntoRecId + '\n');
        res.end('Se actualizara al estudiante: ' + req.body.puntoRecName +
            ' con direccion: ' + req.body.puntoRecAddress);
    })
    .delete((req, res, next) => {
        res.end('Eliminando al estudiante: ' + req.params.puntoRecId);
    });

module.exports = puntoReciclajeRouter;