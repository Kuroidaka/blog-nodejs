const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8-shop');
        console.log('connect successfully');
    }
    catch{
        console.log('connect failure');
    }
}

module.exports = { connect }