# Autenticación de usuario con passport

## instalar passport 

```
npm install passport passport-local passport-local-mongoose --save
```
```javascript
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});
User.plugin(passportLocalMongoose);
```


en un nuevo archivo llamado `authenticate.js`
```javascript
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

# Modificar las rutas 
Ahora en la carpeta routes y el archivo users.js
```javascript 
. . .

var passport = require('passport');

. . .


router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'});
});

. . .

```

# App.js
ahora modificamos el archivo `app.js`

```javascript 
. . .

var passport = require('passport');
var authenticate = require('./authenticate');

. . .

app.use(passport.initialize());
app.use(passport.session());

. . .

function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');                          
      err.status = 401;
      next(err);
    }
    else {
          next();
    }
}

. . .
``` 
ahora podemos hacer un commit con el mensaje "passport"
# Objetivos y resultados 
En este ejercicio, aprenderá cómo puede hacer referencia a un documento desde otro en MongoDB. Además, utilizará population de mongoose para completar la información en un documento a partir de un documento al que se hace referencia. 

Aprenderemos a
utilizar  la population de mongoose para hacer una referencia cruzada de usuarios  

Completar con la información de los usuarios al realizar la consulta 


Usar mongoose 

Abra user.js y actualice el código para el esquema de la siguiente manera:

``` javascript 
var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

```

En  otro modelo agregaremos un atrivuto comnetarios, este sera un arreglo de comentarios, para esto debemos crear un nuevo esquema 


```javascript
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

```