//npm i mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://riverdev:erEPhkShr2VkPUQj@cluster0.vsufc.mongodb.net/qlbanhoa', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;
var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully!');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully!');
});
conn.on('error', console.error.bind(console, 'connection error'));
module.exports = conn;