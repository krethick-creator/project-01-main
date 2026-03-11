const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/login-tut");

connect.then(() => {
    console.log('connected');
})
    .catch(() => {
        console.log(' not connected');
    });

const logschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model('login-tut', logschema);



module.exports = collection;
