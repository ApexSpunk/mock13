const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connect = () => {
    return mongoose.connect("mongodb+srv://ApexSpunk:masai6X@masai.21uwirt.mongodb.net/mock13?retryWrites=true&w=majority");
};

module.exports = connect;