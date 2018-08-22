module.exports = {
    'secretKey': '1234-PEPE-ROSA-ilovescotchscotchyscotchscotch',
    //'mongoUrl': 'mongodb://localhost:27017/servidorAmbiental',
    'mongoUrl': process.env.MONGO_DEV
    || process.env.MONGO_MASTER
    ||'mongodb://localhost:27017/servidorAmbiental',
    'facebook': {
        clientId: '196479747893002',
        clientSecret: '8e945bf20f15eec219983e73fee1059c'
    }
}