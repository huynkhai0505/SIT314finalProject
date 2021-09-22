const mongoose = require('mongoose');

function connect() {
    try {
        mongoose.connect('mongodb+srv://huynhkhai0105:Quynhanh0505@cluster0.fant6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connect to MongoDB")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connect};